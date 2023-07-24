<template>
  <div>
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
</template>

<script>
import FlightProductListForm from "@/components/flight/FlightProductListForm.vue"
import FlightReserveForm from "@/components/flight/FlightReserveForm.vue"
import { mapActions, mapState } from "vuex"

const flightModule = 'flightModule'

export default {
  components: {
    FlightProductListForm,
    FlightReserveForm
  },
  methods: {
    ...mapActions(flightModule, ['requestFlightProductsToFastAPI']),

    async searchFlights(payload) {
      const {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        returnDate,
        nonStop,
        adults,
        children,
        infants
      } = payload
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
    }
  },
  computed: {
    ...mapState(flightModule, ['flightSearch'])
  },
  mounted() {
    console.log(this.searchedDepartureAirport)
  }
}

</script>

<style>
    
</style>