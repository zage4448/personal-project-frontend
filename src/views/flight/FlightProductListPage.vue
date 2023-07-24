<template>
  <div>
    <div v-if="!flightProducts || (Array.isArray(flightProducts) && flightProducts.length === 0)">
      <FlightProductListLoadingForm ref="loadingForm"/>
    </div>
    <div v-else>
      <div class="flight_list_background"></div>
      <div class="flight_list_divider">
        <div style="width: 90%; margin-left: auto; margin-right: auto;">
          <div>
            <FlightReserveForm @submit="searchFlights"
                :departureAirport="flightSearch.departureAirport"
                :arrivalAirport="flightSearch.arrivalAirport"
                :passengers="flightSearch.passengers"
                :departureDate="flightSearch.departureDate"
                :returnDate="flightSearch.returnDate"
                :oneWayOnly="flightSearch.nonStop"
                :roundTrip="flightSearch.roundTrip"/>
          </div>
          <div>
            <FlightProductListForm/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlightProductListForm from "@/components/flight/FlightProductListForm.vue"
import FlightReserveForm from "@/components/flight/FlightReserveForm.vue"
import FlightProductListLoadingForm from "@/components/flight/FlightProductListLoadingForm.vue"
import { mapActions, mapState } from "vuex"

const flightModule = 'flightModule'

export default {
  components: {
    FlightProductListForm,
    FlightReserveForm,
    FlightProductListLoadingForm
  },
  methods: {
    ...mapActions(flightModule, ['requestFlightProductsToFastAPI']),

    async searchFlights(payload) {
      const originLocationCode = payload.departureAirport.code
      const destinationLocationCode = payload.arrivalAirport.code
      const departureDate = payload.departureDate
      const returnDate = payload.returnDate
      const nonStop = payload.oneWayOnly
      const adults = payload.passengers.adult
      const children = payload.passengers.child
      const infants = payload.passengers.infant

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
  },
  computed: {
    ...mapState(flightModule, ['flightSearch', 'flightProducts'])
  },
}

</script>

<style>
.flight_list_background{
  position: absolute;
  margin:0;
  background-image: url("@/assets/images/flight_list_background.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 1500px;
} 
.flight_list_divider{
  position: absolute;
  margin-top: 100px;
  width: 100%;
  padding-bottom: 100px
}
</style>