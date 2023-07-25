<template>
  <div>
    <div class="flightBackground"></div>
    <div class="flightReserveDivider">
      <div class="flightReserveForm">
        <FlightReserveForm @submit="searchFlights"
          :departureAirport="departureAirport"
          :arrivalAirport="arrivalAirport"
          :passengers="passengers"
          :departureDate="departureDate"
          :returnDate="returnDate"
          :oneWayOnly="oneWayOnly"
          :roundTrip="roundTrip"/>
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
import { mapActions } from 'vuex'

const flightModule = 'flightModule'

export default {
  data() {
    return{
      departureAirport: { code: 'ICN', name: '인천' },
      arrivalAirport: { code: 'KIX', name: '오사카' },
      passengers: {
          adult: 1,
          child: 0,
          infant: 0,
        },
        departureDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        returnDate: '',
        oneWayOnly: true,
        roundTrip: true,
    }
  },
  components: {
    MainBoardListForm,
    FlightReserveForm
  },
  methods: {
    ...mapActions(flightModule, ['requestFlightProductsToFastAPI', 'saveFlightSearchElement']),
    
    async searchFlights(payload) {
      const originLocationCode = payload.departureAirport.code
      const destinationLocationCode = payload.arrivalAirport.code
      const departureDate = payload.departureDate
      const returnDate = payload.returnDate
      const nonStop = payload.oneWayOnly
      const adults = payload.passengers.adult
      const children = payload.passengers.child
      const infants = payload.passengers.infant
      const departureAirport = payload.departureAirport
      const arrivalAirport = payload.arrivalAirport
      const passengers = payload.passengers
      const roundTrip = payload.roundTrip
      
      await this.saveFlightSearchElement({
        departureAirport,
        arrivalAirport,
        departureDate,
        returnDate,
        nonStop,
        passengers,
        roundTrip
      })

      await this.$router.push('/flight-product-list-page')
      const targetElement = document.getElementById('loading-section');
      if (targetElement) {
        targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
      

      await this.requestFlightProductsToFastAPI({
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        nonStop,
        adults,
        children,
        infants
      })
    },
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
