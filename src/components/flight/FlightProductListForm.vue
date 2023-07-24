<template>
  <div>
    <div>
      <v-data-table
        class="flights_table"
        :headers="headers"
        :items="flightProducts"
        item-key="flight_id"
        item-value="flight_id"
        >
          <template v-slot:item.flight_id="{ item }">
            <div class="airline_name">
              <span v-html="getMergedAirlineName(item)"></span>
            </div>
          </template>
          <template v-slot:item.outbound_flights="{ item }">
            <div v-if="!item.inbound_flights || (Array.isArray(item.inbound_flights) && item.inbound_flights.length === 0)">
              <div align="center">
                <v-data-table
                  class="centered-cell"
                  :headers="flightHeader"
                  :items="combineFlights(item.outbound_flights)"
                  hide-default-header
                  hide-default-footer
                >
                  <template v-slot:item.origin="{ item }">
                    <div class="centered-cell">
                      {{ formatDate(item.departure_time) }}
                      {{ item.origin }} 
                      <v-icon>mdi-airplane</v-icon>
                      {{ item.destination }}
                      {{ formatDate(item.arrival_time) }}
                    </div>
                  </template>
                  <template v-slot:item.stops="{ item }">
                    <div :style="{ width: '100px' }">
                      {{ item.stops }}
                    </div>
                  </template>
                </v-data-table>
              </div>
            </div>
            <div v-else>
              <div align="center">
                <v-data-table
                  class="centered-cell"
                  :headers="flightHeader"
                  :items="getCombinedFlights(item.outbound_flights, item.inbound_flights)"
                  hide-default-header
                  hide-default-footer
                >
                  <template v-slot:item.origin="{ item }">
                    <div class="centered-cell">
                      {{ formatDate(item.departure_time) }}
                      {{ item.origin }} 
                      <v-icon>mdi-airplane</v-icon>
                      {{ item.destination }}
                      {{ formatDate(item.arrival_time) }}
                    </div>
                  </template>
                  <template v-slot:item.stops="{ item }">
                    <div :style="{ width: '100px' }">
                      {{ item.stops }}
                    </div>
                  </template>
                </v-data-table>
              </div>
            </div>
          </template>
          <template v-slot:item.price="{ item }">
            <div>
              <span>{{ item.price }}원~</span> <br>
              <span>남은 자리: {{ item.seats_left }}</span>
            </div>
          </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FlightProductListLoadingForm from "@/components/flight/FlightProductListLoadingForm.vue"
import FlightReserveForm from './FlightReserveForm.vue';

const flightModule = 'flightModule'


export default {
  components: {
    FlightProductListLoadingForm,
    FlightReserveForm
},
  data() {
    return{
      flightHeader: [
        {
          align: 'center',
          value: 'origin',
        },
        {
          align: 'center',
          value: 'stops',
        },
      ],
      headers: [
        {
          align: 'start',
          value: 'flight_id',
          width: '18%'
        },
        {
          align: 'center',
          value: 'outbound_flights'
        },
        {
          align: 'end',
          value: 'price'
        }
      ],
    }
  },
  methods: {
    getMergedAirlineName(item) {
      const airlineNames = new Set();

      if (item.outbound_flights && Array.isArray(item.outbound_flights)) {
        item.outbound_flights.forEach((flight) => {
          airlineNames.add(flight.airline);
        });
      }

      if (item.inbound_flights && Array.isArray(item.inbound_flights)) {
        item.inbound_flights.forEach((flight) => {
          airlineNames.add(flight.airline);
        });
      }

      const uniqueAirlineNames = Array.from(airlineNames);

      return uniqueAirlineNames.join('<br>');
    },

    getCombinedFlights(outboundFlights, inboundFlights) {
      const combinedFlights = [];
      const firstOutbound = outboundFlights[0];
      const lastOutbound = outboundFlights[outboundFlights.length - 1];
      const firstInbound = inboundFlights[0];
      const lastInbound = inboundFlights[inboundFlights.length - 1];

      combinedFlights.push({
        origin: firstOutbound.origin,
        destination: lastOutbound.destination,
        stops: this.calculateStops(outboundFlights),
        departure_time: firstOutbound.departure_time,
        arrival_time: lastOutbound.arrival_time
      });

      combinedFlights.push({
        origin: firstInbound.origin,
        destination: lastInbound.destination,
        stops: this.calculateStops(inboundFlights),
        departure_time: firstInbound.departure_time,
        arrival_time: lastInbound.arrival_time
      });

      return combinedFlights;
    },

    combineFlights(outboundFlights) {
      const combinedFlights = [];

      if (outboundFlights.length > 1) {
        const firstOutbound = outboundFlights[0];
        const lastOutbound = outboundFlights[outboundFlights.length - 1];

        combinedFlights.push({
          origin: firstOutbound.origin,
          destination: lastOutbound.destination,
          stops: this.calculateStops(outboundFlights),
          departure_time: firstOutbound.departure_time,
          arrival_time: lastOutbound.arrival_time
        });
      } else {
        // Handle the case when there's only one flight
        const singleFlight = outboundFlights[0];

        combinedFlights.push({
          origin: singleFlight.origin,
          destination: singleFlight.destination,
          stops: this.calculateStops(outboundFlights),
          departure_time: singleFlight.departure_time,
          arrival_time: singleFlight.arrival_time
        });
      } 
      return combinedFlights;
    },

    calculateStops(flights) {
      const stops = []
      if (flights.length > 1 && Array.isArray(flights)) {
        for (let i = 0; i < flights.length -1; i++) {
          stops.push(flights[i].destination) 
        }
        return "경유 " + (flights.length - 1) + "회" + " (" + stops.join(', ') + ")";
      } else {
        return "직항";
      }
    },
    formatDate(dateString) {
      const options = { hour: '2-digit', minute: '2-digit' };
      const formattedDate = new Date(dateString).toLocaleString('ko-KR', options);
      return formattedDate.replace(',', '');
    }
  },
  computed: {
    ...mapState( flightModule, ['flightProducts'])
  }

}
    


</script>

<style>
.airline_name {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.airline_name span {
  margin: 5px;
  line-height: 3;
}   
</style>