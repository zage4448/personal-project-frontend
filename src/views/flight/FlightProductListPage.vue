<template>
  <div>
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