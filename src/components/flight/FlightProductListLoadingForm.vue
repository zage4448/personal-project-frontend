<template>
    <div>
      <div class="flight_loading_background"></div>
      <div class="loading-bar-container">
        <div class="loading-bar" :class="{ 'complete': isLoadingComplete }"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoadingComplete: false,
      };
    },
    mounted() {
      setTimeout(() => {
        this.isLoadingComplete = true;
      }, 10000); // 10초 후에 isLoadingComplete 값을 true로 변경
    },
  };
  </script>
  
  <style>
  .loading-bar-container {
    width: 100%;
    height: 20px;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    border-radius: 4px;
    overflow: hidden;
    position: absolute;
    margin-top: 100px;
  }
  
  .loading-bar {
    height: 100%;
    background-color: #4CAF50;
    animation: moveBar 10s linear;
  }
  .flight_loading_background{
    position: absolute;
    margin:0;
    background-image: url("@/assets/images/flight_loading_background.jpg");
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 1000px;
  }
  
  .complete {
    animation: none;
  }
  
  @keyframes moveBar {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  </style>
  