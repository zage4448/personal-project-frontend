<template>
  <div>
    <div class="flightBackground"></div>
    <div class="flightReserveDivider">
      <div class="flightReserveForm">
        <FlightReserveForm/>
      </div>
    </div>
    <div class="boardTitleBackground">
      <div class="boardTitleCard">
        <div class="boardTitleMainText">Travel With Knowledge</div>
        <div class="boardTitleSubText">
          <p>Actual tips from people</p>
          <p>Who have been there</p>
        </div>
      </div>
    </div>
    <div class="boardListDivider">
      <div class="boardListForm">
        <MainBoardListForm/>
      </div>
    </div>
  </div>
  
</template>

<script>
import MainBoardListForm from '@/components/board/MainBoardListForm.vue'
import FlightReserveForm from '@/components/flight/FlightReserveForm.vue'

export default {
  components: {
    MainBoardListForm,
    FlightReserveForm
  }
}

</script>

<style>
.boardTitleBackground{
  position: absolute;
  margin:0;
  margin-top: 1200px;
  background-image: url("@/assets/images/city_square_for_board.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 1000px;
}
.boardTitleCard{
  background-color: #f5f5f5;
  height: 500px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;

}
.boardTitleMainText {
  text-align: center;
  padding-top: 5rem;
  font-size: 80px;
  font-style: bold;
}
.boardTitleSubText {
  text-align: center;
  padding-top: 8rem;
  font-size: 36px;
  font-style: bold;
  line-height: 0.7;
}
.boardListDivider {
  margin-top: 2160px; 
  position: absolute;
  width: 100%;
  padding-bottom: 50px;
}
.boardListForm {
  padding-left: 60px;
  padding-right: 60px;
}

.flightBackground{
  position: absolute;
  margin:0;
  background-image: url("@/assets/images/flight_background.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 1000px;
}
.flightReserveDivider{
  position: absolute;
  margin-top: 960px;
  width: 100%;
}
.flightReserveForm{
  padding-left: 60px;
  padding-right: 60px;
}
</style>
