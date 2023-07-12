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
        </v-btn>
        <v-card-text>{{ category }}</v-card-text>
      </v-card-actions>
      <transition name="fade">
      <v-card
        v-if="reveal"
        style="height: 100%;"
      >
      <v-radio-group v-model="category" @change="closeCategory()" required style="padding: 20px;">
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
    <v-text-field style="padding: 20px;" label="제목" v-model="title"></v-text-field>
    <v-textarea style="padding: 20px;" 
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
      else {
        const { userToken, title, content, category } = this
        const convertedContent = content.replace(/\n/g, '<br>');
        this.$emit('submit', { userToken, title, content: convertedContent, category })
      }
    },
    closeCategory() {
      this.reveal = false
      console.log(this.category)
    }
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