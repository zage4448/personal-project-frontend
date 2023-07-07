<template>
  <div>
    <v-app-bar flat color=black >
      <div class="toolbar_buttons">
        <button v-for="button in buttons" :key="button.label" class="board_button"
          :disabled="button.isDisabled" :style="{ color: button.textColor}" 
          @click="disableButton(button.label)">
          {{ button.label }}
        </button>
      </div>
      <div class="toolbar_search">
        <input type="text" placeholder="  Search" class="search_input"/>
          <button>
            <v-icon style="color: white; font-size:40px">mdi-magnify</v-icon>
          </button>
      </div>
    </v-app-bar>
    <div class="board-list-form">
      <BoardListForm/>
    </div>
  </div>
</template>
  
<script>
import BoardListForm from "@/components/board/BoardListForm.vue"

export default {
  components: {
    BoardListForm
  },
  data() {
    return {
      buttons: [
        { label: "Places", isDisabled: true, textColor: "#CCCCCC"},
        { label: "Interests", isDisabled: false, textColor: "white"},
        { label: "New Posts", isDisabled: false, textColor: "white"}
      ]
    };
  },
  methods: {
    disableButton(label) {
      this.buttons = this.buttons.map(button => {
        if (button.label === label) {
          return { ...button, isDisabled: true, textColor: "#CCCCCC" };
        } else {
          return { ...button, isDisabled: false, textColor: "white" };
        }
      });
    }
  }
};
</script>
  
<style>
.toolbar_buttons {
  display: flex;
  align-items: center;
}

.board_button {
  margin-left: 45px;
  font-size: 18px;
  background-color: transparent;
  border: none;
}

.toolbar_search {
  margin-left: auto;
  margin-right: 15px;

}

.search_input {
  background-color: transparent;
  border-color: white;
  border-style: solid;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  margin-right: 12px;
}

.search-icon {
  top: 50%;
  right: 10px;
  color: white;
}

.board-list-form {
  background-color: white;
  border: 1px solid black;
}
</style>
