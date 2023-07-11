<template>
    <div>
      <div class="category_banner" :style="{ backgroundImage: `url(${backgroundImage})`}"></div>
      <div>
        <div class="board">
          <div class="board_title">
            {{ board.title }}
          </div>
          <div class="board_category_title">
            in {{ board.boardCategory }}
          </div>
          <div class="board_right">
            <div class="board_buttons">
              <button class="save_button">Save</button>
            </div>
            <div class="views_and_comments">
              <v-icon>mdi-eye</v-icon>
              {{ board.views }} views <br>
              <v-icon>mdi-message</v-icon>
              {{ board.commentCount }} comments <br>
              <v-icon>mdi-thumb-up-outline</v-icon> 
              {{ board.likeCount }} likes
            </div>
            <div class="similar_posts">
              <h4 style="line-height: 3;">Similar Posts</h4>
              test <br>
              test 
            </div>
          </div>
          <div class="board_left">
            <div class="board_info">
              {{ board.writer }}<br> 
              <div>작성일자: {{ new Date(board.createDate).toLocaleDateString('en-US') }}</div>
              <div v-if="board.updateDate && board.updateDate != board.createDate">
                수정일자: {{ new Date(board.updateDate).toLocaleDateString('en-US') }}
              </div>
            </div>
            <div class="board_content">
              {{ board.content }}
            </div>
            <div class="board_like">
              <button><v-icon>mdi-thumb-up-outline</v-icon> Like</button>
            </div>
            <v-divider class="board_divider"></v-divider>
            <div class="board_comments">
              <h4 style="line-height: 3;">Comments</h4>
              <v-textarea 
                label="comment" 
                clearable
                outlined
                auto-grow
                rows="2"
                row-height="15"
                v-model="comment">
              </v-textarea>
            </div>
            <div class="buttons_for_comment">
              <v-btn style="text-transform: none;">댓글 달기</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      backgroundImage: '',
      comment: '',
    }
  },
  props: {
    board: {
      type: Object,
      required: true
    }
  },
  beforeUpdate() {
    if (this.board.boardCategory == "Asia") {
      this.backgroundImage = require("@/assets/images/asia_banner.jpg")
    }
    else if (this.board.boardCategory == "Europe") {
      this.backgroundImage = require("@/assets/images/europe_banner.jpg")
    }
    else if (this.board.boardCategory == "North_America") {
      this.backgroundImage = require("@/assets/images/north_america_banner.jpg")
    }
    else if (this.board.boardCategory == "South_America") {
      this.backgroundImage = require("@/assets/images/south_america_banner.jpg")
    }
    else if (this.board.boardCategory == "Africa") {
      this.backgroundImage = require("@/assets/images/africa_banner.jpg")
    }
    else if (this.board.boardCategory == "Australia") {
      this.backgroundImage = require("@/assets/images/australia_banner.jpg")
    }
  }
}
</script>

<style>
.category_banner {
  height: 500px;
  width: 100%; 
  background-position: center;
  background-size: cover;
  position: absolute;
}   
.category_title{
  color: white;
  font-size: 42px;
  text-align: center;
  text-shadow: 2px 2px 4px #000;
  padding-top: 20px;
}
.board{
  width: 85%;
  background-color: white;
  margin-left: 7rem;
  margin-right: 7rem;
  margin-top: 450px;
  position:absolute;
  height: auto;
}
.board_left{
  width: 70%;
  float: left;
  box-sizing: border-box;
}
.board_right{
  width: 20%;
  float: right;
  box-sizing: border-box;
}
.board_title{
  background-color: black;
  height: auto;
  font-size: 36px;
  color: white;
  padding-left: 10px;
  padding-top: 4px;
}
.board_category_title{
  background-color: #000;
  height: auto;
  font-size: 22px;
  color: white;
  padding-left: 18px;
  padding-bottom: 4px;
}
.board_info{
  height: auto;
  font-size: 18px;
  padding-left: 18px;
  padding-top: 15px;
}
.board_content{
  background-color: white;
  padding-left: 18px;
  padding-top: 30px;
}
.board_buttons{
  padding-top: 15px;
}
.views_and_comments{
  margin-top: 18px;
  border: dotted 1px black;
  width: 170px;
  text-align: left;
  line-height: 3;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 18px
}
.similar_posts{
  margin-top: 18px;
  border: dotted 1px black;
  width: 170px;
  text-align: left;
  line-height: 2;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 18px;
}
.board_like{
  padding-left: 18px;
  padding-top: 25px;
  font-size: 22px;
}
.board_comments{
  padding-top: 18px;
  padding-left: 18px;
}
.buttons_for_comment{
  text-align: end;
}

.comment_button{
  background-color: rgba(0, 0, 0, 0.507);
  color: white;
  width: 170px;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
}
.save_button{
  background-color: white;
  width: 170px;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
  border: black solid 1px;
  margin-top: 18px
}
.board_divider{
  margin-left: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
