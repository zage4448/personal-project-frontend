<template>
  <v-container>
    <v-form @submit.prevent="register">
    <v-card style="padding-bottom: 20px;">
      <v-card-actions>
        <v-btn
          text
          color="primary accent-4"
          @click="reveal = !reveal"
        >
          Category 
          <v-icon v-if="reveal == false">mdi-menu-down</v-icon>
          <v-icon v-if="reveal == true">mdi-menu-up</v-icon>
        </v-btn>
        <v-card-text>{{ category }}</v-card-text>
      </v-card-actions>
      <transition name="fade">
      <v-card
        v-if="reveal"
        style="height: 100%;"
      >
      <v-radio-group v-model="category" @change="closeCategory()" required style="padding: 40px;">
        <v-radio
          v-for="category in categories"
          :key="category.value"
          :label="category.label"
          :value="category.value"
        ></v-radio>
      </v-radio-group>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="primary accent-4"
            @click="closeCategory()"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </transition>
    <v-text-field style="padding: 30px;" label="제목" v-model="title"></v-text-field>
    <div style="padding: 20px">
      <v-row style="height: 150px;">
        <v-col cols="4">
          <v-file-input
            label="썸네일"
            prepend-icon="mdi-star"
            chips
            ref="mainFile"
            type="file" 
            @change="handleMainFileUpload()">
          </v-file-input>
        </v-col>
        <v-col cols="8">
          <v-img :src="mainFilePreview" style="margin-left:200px; max-width: 150px; max-height: 150px;"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-file-input
          style="padding: 20px;"
          label="사진"
          prepend-icon="mdi-camera"
          multiple
          ref="additionalFile"
          type="file" 
          @change="handleAdditionalFilesUpload()"
          @click:append="clearAdditionalFiles">
        </v-file-input>
      </v-row>
      <v-row>
        <v-col v-for="(previewURL, index) in additionalFilePreviews" :key="index" cols="3">
          <v-img :src="previewURL" v-if="previewURL" style="max-width: 100%; max-height: 100%;">
            <v-icon
              class="file-input__action-icon"
              style="color= white;"
              @click="removeFile(index)"
            >
              mdi-close
            </v-icon>
          </v-img>
          <span>{{ additionalFileNames[index] }}</span>
        </v-col>
      </v-row>
    </div>
    <v-textarea style="padding: 30px;" 
                label="본 글" 
                v-model="content"
                clearable
                rows="6"
                row-height="20"
                required>
    </v-textarea>
    <div style="text-align: end; padding-right: 20px;">
      <v-btn type="submit">작성하기</v-btn>
    </div>
    </v-card>
  </v-form>
  </v-container>
</template>

<script>
import AWS from 'aws-sdk'
import env from '@/env'

export default {
  data () {
    return{
      userToken: localStorage.getItem('userToken'),
      reveal: false,
      category: '',
      categories: [
        { label: 'Asia', value: 'Asia' },
        { label: 'Europe', value: 'Europe' },
        { label: 'North America', value: 'North_America' },
        { label: 'South America', value: 'South_America' },
        { label: 'Africa', value: 'Africa' },
        { label: 'Australia', value: 'Australia' }
      ],
      title: '',
      content: '',

      s3: null,
      awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
      awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
      awsIdentityPoolId: env.api.MAIN_AWS_BUCKET_IDENTITY_POOL_ID,

      file: null,
      thumbNailName: '',
      imageNameList:[],
      selectedFiles: [],

      mainFilePreview: '',
      additionalFilePreviews: [],
      additionalFileNames: []
    }
  },
  created() {
    if (this.userToken == null) {
      alert("로그인 후 이용할 수 있습니다")
      this.$router.push({name: 'home'})
    }
  },
  methods: {
    register() {
      if (!this.title) {
        alert("제목을 작성하세요")
      }
      else if (!this.content) {
        alert("본문이 없습니다")
      }
      else if (!this.category) {
        alert("카테고리를 정하세요")
      }
      else if (!this.file) {
        alert("메인 사진을 등록해 주세요")
      }
      else {
        const { userToken, title, content, category, thumbNailName, imageNameList } = this
        const convertedContent = content.replace(/\n/g, '<br>');
        this.$emit('submit', { userToken, title, content: convertedContent, category, thumbNailName, imageNameList })
      }
    },
    closeCategory() {
      this.reveal = false
      console.log(this.category)
    },
    handleMainFileUpload() {
      const inputElement = this.$refs.mainFile.$el.querySelector('input[type="file"]');
      if (inputElement.files && inputElement.files.length > 0) {
        this.file = inputElement.files[0];
        console.log("main Image upload: " + this.file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
          this.mainFilePreview = event.target.result;
        };
        reader.readAsDataURL(this.file);
      }
    },
    handleAdditionalFilesUpload() {
      const inputElement = this.$refs.additionalFile.$el.querySelector('input[type="file"]');
      if (inputElement.files && inputElement.files.length > 0) {
        this.additionalFilePreviews = []; 
        this.additionalFileNames = []; 
        this.selectedFiles = []; 

        this.readFilesSequentially(inputElement.files, 0);
      }
    },
    readFilesSequentially(files, index) {
      const file = files[index];
      const reader = new FileReader();
      const vm = this;
      this.selectedFiles.push(file);

      reader.onload = (event) => {
        vm.additionalFilePreviews.push(event.target.result);
        vm.additionalFileNames.push(file.name);

        if (index + 1 < files.length) {
          vm.readFilesSequentially(files, index + 1);
        }
      };
      reader.readAsDataURL(file);
    },
    removeFile(index) {
      this.selectedFiles.splice(index, 1);
      this.additionalFilePreviews.splice(index, 1);
      this.additionalFileNames.splice(index, 1);
    },
    clearAdditionalFiles() {
      this.selectedFiles = [];
      this.additionalFilePreviews = [];
      this.additionalFileNames = [];
    },
    awsS3Config () {
      AWS.config.update({
          region: this.awsBucketRegion,
          credentials: new AWS.CognitoIdentityCredentials({
              IdentityPoolId: this.awsIdentityPoolId
          })
      })

      this.s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: {
              Bucket: this.awsBucketName
          }
      })
    },
    uploadAwsS3 () {    
        this.awsS3Config()
        this.thumbNailName = this.createUniqueName() + this.file.name

        this.s3.upload({
            Key: this.thumbNailName,
            Body: this.file,
            ACL: 'public-read',
        }, (err, data) => {
            if (err) {
                console.log(err)
                return alert("메인 이미지 업로드 중 문제 발생", err.message)
            }
            console.log('메인 이미지 업로드 성공!')
        })
        
        this.selectedFiles.forEach((file) => {
            const imageName = this.createUniqueName() + file.name
            this.imageNameList.push(imageName)
            this.s3.upload({
                Key: imageName,
                Body: file,
                ACL: 'public-read',
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    return alert("상세 이미지 업로드 중 문제 발생", err.message)
                }
                console.log(`파일 ${file.name} 업로드 성공!`)
            });
        });
    },
    createUniqueName() {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomUUID = '';
        for (let i = 0; i < 12; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomUUID += characters[randomIndex];
        }
        return randomUUID
    },
  },
}
    


</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}  
</style>