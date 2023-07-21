<template>
  <div>
    <div class="round-trip-toolbar">
      <button v-for="button in buttons" :key="button.label" class="toolbar-button"
          :disabled="button.isDisabled" :style="{ color: button.textColor}" 
          @click="toggleToolbarButton(button.label)">
          {{ button.label }}
        </button>
    </div>
    <div class="search-toolbar">
      <div>
        <div class="airport-buttons">
        <h4>{{ departureAirport.code }}</h4>
      </div>
      <v-menu offset-y v-if="showDepAreas">
        <template v-slot:activator="{ on }">
          <v-btn elevation="0" color="white" v-on="on">
            <b v-if="!departureAirport">출발지</b>
            <b v-if="departureAirport">{{ departureAirport.name }}</b>
            <v-icon>mdi-triangle-small-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(area, index) in areas" :key="index" @click="selectDepArea(area)">
            <v-list-item-title>{{ area.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y v-if="showDepAirports">
        <template v-slot:activator="{ on }">
          <v-btn elevation="0" color="white" v-on="on">
            <b>공항</b>
            <v-icon>mdi-triangle-small-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(airport, index) in departureArea.airports" :key="index" @click="selectDepAirport(airport)">
            <v-list-item-title>{{ airport.name }}, {{ airport.country }}, {{ airport.airport }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="airport-buttons">
      <v-icon style="margin-top: -6px; margin-bottom: 10px; font-size: 36px;">mdi-airplane</v-icon> <br>
      <v-btn @click="switchArrDep"><v-icon>mdi-autorenew</v-icon></v-btn>
    </div>

    <div>
        <div class="airport-buttons">
        <h4>{{ arrivalAirport.code }}</h4>
      </div>
      <v-menu offset-y v-if="showArrAreas">
        <template v-slot:activator="{ on }">
          <v-btn elevation="0" color="white" v-on="on">
            <b v-if="!arrivalAirport">출발지</b>
            <b v-if="arrivalAirport">{{ arrivalAirport.name }}</b>
            <v-icon>mdi-triangle-small-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(area, index) in areas" :key="index" @click="selectArrArea(area)">
            <v-list-item-title>{{ area.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y v-if="showArrAirports" style="width: auto">
        <template v-slot:activator="{ on }">
          <v-btn elevation="0" color="white" v-on="on">
            <b>공항</b>
            <v-icon>mdi-triangle-small-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(airport, index) in arrivalArea.airports" :key="index" @click="selectArrAirport(airport)">
            <v-list-item-title>{{ airport.name }}, {{ airport.country }}, {{ airport.airport }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div>
    </div>
      <div class="date-container">
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="departureDate"
            label="가는 날"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="departureDate"
          no-title
          scrollable
        >
        </v-date-picker>
      </v-menu>
      </div>
      <div v-if="roundTrip" class="date-container">
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="returnDate"
            label="오는 날"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="returnDate"
          no-title
          scrollable
        >
        </v-date-picker>
      </v-menu>
      </div>
      <div>
        <div v-if="!showPassengerSelect" style="margin-top: 32px;">
          <v-btn @click="showPassengerSelect = !showPassengerSelect">
            인원수: ({{ passengerLabel }})
          </v-btn>
        </div>
        <div v-if="showPassengerSelect" class="passenger-select">
          <div>
            <v-btn @click="showPassengerSelect = !showPassengerSelect">
              인원수: ({{ passengerLabel }})
            </v-btn> <br>
            <span>성인: </span>
            <button class="passenger-button" @click="incrementPassenger('adult')">+</button>
            <span>{{ passengers.adult }}</span>
            <button class="passenger-button" @click="decrementPassenger('adult')">-</button>
          </div>
          <div>
            <span>소인: </span>
            <button class="passenger-button" @click="incrementPassenger('child')">+</button>
            <span>{{ passengers.child }}</span>
            <button class="passenger-button" @click="decrementPassenger('child')">-</button>
          </div>
          <div>
            <span>유아: </span>
            <button class="passenger-button" @click="incrementPassenger('infant')">+</button>
            <span>{{ passengers.infant }}</span>
            <button class="passenger-button" @click="decrementPassenger('infant')">-</button>
          </div>
        </div>
      </div>
      <div class="checkbox-container">
        <span class="checkbox-label">직항만</span>
        <v-checkbox color="secondary" v-model="oneWayOnly"></v-checkbox>
      </div>
      <v-btn class="search-button" @click="searchFlights">항공권 검색</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const flightModule = 'flightModule'

export default {
  data() {
    return {
        departureArea: null,
        departureAirport: { code: 'ICN', name: '인천' },
        arrivalArea: null,
        arrivalAirport: { code: 'KIX', name: '오사카' },
        areas: [
          { name: '국내', airports: [
            { code: 'ICN', name: '인천', airport: '인천국제공항', country: '대한민국' },
            { code: 'GMP', name: '김포', airport: '김포국제공항', country: '대한민국' },
            { code: 'CJU', name: '제주', airport: '제주국제공항', country: '대한민국' },
            { code: 'PUS', name: '부산', airport: '김해국제공항', country: '대한민국' },
            { code: 'KWJ', name: '광주', airport: '광주공항', country: '대한민국' },
            { code: 'MWX', name: '무안', airport: '무안국제공항', country: '대한민국' },
            { code: 'KUV', name: '군산', airport: '군산공항', country: '대한민국' },
            { code: 'TAE', name: '대구', airport: '대구국제공항', country: '대한민국' },
            { code: 'HIN', name: '사천', airport: '사천공항', country: '대한민국' },
            { code: 'RSU', name: '여수', airport: '여수공항', country: '대한민국' },
            { code: 'USN', name: '울산', airport: '울산공항', country: '대한민국' },
            { code: 'WJU', name: '원주', airport: '원주공항', country: '대한민국' },
            { code: 'CJJ', name: '청주', airport: '청주국제공항', country: '대한민국' },
            { code: 'KPO', name: '포항', airport: '포항국제공항', country: '대한민국' },
            { code: 'YNY', name: '양양', airport: '양양국제공항', country: '대한민국' },
          ]},
          { name: '일본', airports: [
            { code: 'KIX', name: '오사카', airport: '간사이국제공항', country: '일본' },
            { code: 'NRT', name: '도쿄', airport: '나리타국제공항', country: '일본' },
            { code: 'HND', name: '도쿄', airport: '하네다국제공항', country: '일본' },
            { code: 'FUK', name: '후쿠오카', airport: '후쿠오카공항', country: '일본' },
            { code: 'OKA', name: '오키나와', airport: '나하공항', country: '일본' },
            { code: 'CTS', name: '삿포로', airport: '치토세공항', country: '일본' },
            { code: 'NGO', name: '나고야', airport: '주부국제공항', country: '일본' },
          ]},
          { name: '중국', airports: [
            { code: 'PVG', name: '상하이', airport: '푸동국제공항', country: '중국' },
            { code: 'CAN', name: '광저우', airport: '광저우바이원국제공항', country: '중국' },
            { code: 'PEK', name: '베이징', airport: '베이징캐피탈국제공항', country: '중국' },
            { code: 'TAO', name: '청도', airport: '청도교동국제공항', country: '중국' },
            { code: 'SZX', name: '심천', airport: '심천공항', country: '중국' },
            { code: 'YNJ', name: '연길', airport: '연길공항', country: '중국' },
            { code: 'HGH', name: '항주', airport: '항주공항', country: '중국' },
            { code: 'SHA', name: '상하이', airport: '훙차오국제공항', country: '중국' },
            { code: 'SHE', name: '심양', airport: '타오셴국제공항', country: '중국' },
            { code: 'DLC', name: '대련', airport: '대련국제공항', country: '중국' },
          ]},
          { name: '동남아', airports: [
            { code: 'BBK', name: '방콕', airport: '수완나품국제공항', country: '태국' },
            { code: 'DAD', name: '다낭', airport: '다낭국제공항', country: '베트남' },
            { code: 'SGN', name: '호치민시', airport: '탄손누트국제공항', country: '베트남' },
            { code: 'HKG', name: '홍콩', airport: '홍콩국제공항', country: '홍콩' },
            { code: 'TPE', name: '타이베이', airport: '타이완타오위안국제공항', country: '대만' },
            { code: 'MNL', name: '마닐라', airport: '니노이아키노국제공항', country: '필리핀' },
            { code: 'HAN', name: '하노이', airport: '노이바이국제공항', country: '베트남' },
            { code: 'SIN', name: '싱가포르', airport: '창이국제공항', country: '싱가포르' },
            { code: 'CEB', name: '세부', airport: '막탄세부국제공항', country: '필리핀' },
            { code: 'CRK', name: '클라크필드', airport: '클라크필드공항', country: '필리핀' },
            { code: 'BKI', name: '코타키나발루', airport: '코타키나발루공항', country: '말레이시아' },
            { code: 'MFM', name: '마카오', airport: '마카오국제공항', country: '마카오' },
            { code: 'CXR', name: '나트랑', airport: '캠란공항', country: '베트남' },
            { code: 'KUL', name: '쿠알라룸푸르', airport: '쿠알라룸푸르국제공항', country: '말레이시아' },
            { code: 'HKT', name: '푸켓', airport: '푸켓국제공항', country: '태국' },
            { code: 'DPS', name: '덴파사르', airport: '응우라이국제공항', country: '인도네시아' },
          ]},
          { name: '유럽', airports: [
            { code: 'CDG', name: '파리', airport: '샤를드골국제공항', country: '프랑스' },
            { code: 'LHR', name: '런던', airport: '히드로공항', country: '영국' },
            { code: 'BCN', name: '바르셀로나', airport: '바르셀로나공항', country: '스페인' },
            { code: 'FRA', name: '프랑크푸르트', airport: '프랑크푸르트국제공항', country: '독일' },
            { code: 'FCO', name: '로마', airport: '레오나르도다빈치공항', country: '이탈리아' },
            { code: 'PRG', name: '프라하', airport: '바츨라프하벨공항', country: '체코' },
            { code: 'IST', name: '이스탄불', airport: '이스탄불국제공항', country: '튀르키예' },
            { code: 'MUC', name: '뮌헨', airport: '뮌헨국제공항', country: '독일' },
            { code: 'MAD', name: '마드리드', airport: '바라하스국제공항', country: '스페인' },
            { code: 'VVO', name: '블라디보스토크', airport: '블라디보스톡국제공항', country: '러시아' },
            { code: 'SVO', name: '모스크바', airport: '셰레메티예보국제공항', country: '러시아' },
            { code: 'VIE', name: '비엔나', airport: '비엔나국제공항', country: '오스트리아' },
            { code: 'VCE', name: '베니스', airport: '마르코폴로공항', country: '이탈리아' },
            { code: 'ZRH', name: '취리히', airport: '취리히공항', country: '스위스' },
            { code: 'AMS', name: '암스테르담', airport: '스히폴공항', country: '네델란드' },
            { code: 'MXP', name: '밀라노', airport: '말펜사공항', country: '이탈리아' },
            { code: 'WAW', name: '바르샤바', airport: '바르샤바공항', country: '폴란드' },
            { code: 'ZAG', name: '자그레브', airport: '자그레브공항', country: '크로아티아' },
          ]},
          { name: '미주', airports: [
            { code: 'LAX', name: '로스앤젤레스', airport: '로스앤젤레스국제공항', country: '미국' },
            { code: 'HNL', name: '호놀룰루', airport: '호놀룰루국제공항', country: '미국' },
            { code: 'JFK', name: '뉴욕', airport: '존에프케네디국제공항', country: '미국' },
            { code: 'YVR', name: '밴쿠버', airport: '밴쿠버국제공항', country: '캐나다' },
            { code: 'SFO', name: '샌프란시스코', airport: '샌프란시스코국제공항', country: '미국' },
            { code: 'YYZ', name: '토론토', airport: '토론토국제공항', country: '캐나다' },
            { code: 'LAS', name: '라스베가스', airport: '해리리드국제공항', country: '미국' },
            { code: 'ATL', name: '아틀란타', airport: '하츠필드잭슨애틀랜타국제공항', country: '미국' },
            { code: 'DFW', name: '달라스', airport: '달라스포트워스국제공항', country: '미국' },
            { code: 'ORD', name: '시카고', airport: '오헤어국제공항', country: '미국' },
            { code: 'SEA', name: '시애틀', airport: '시애틀터코마국제공항', country: '미국' },
            { code: 'IAD', name: '워싱턴', airport: '워싱턴델레스국제공항', country: '미국' },
          ]},
          { name: '대양주', airports: [
            { code: 'GUM', name: '괌', airport: '앤토니오B.원팻국제공항', country: '괌' },
            { code: 'SYD', name: '시드니', airport: '시드니공항', country: '호주' },
            { code: 'SPN', name: '사이판', airport: '사이판국제공항', country: '사이판' },
            { code: 'AKL', name: '오클랜드', airport: '오클랜드공항', country: '뉴질랜드' },
            { code: 'BNE', name: '브리즈번', airport: '브리즈번공항', country: '호주' },
            { code: 'MEL', name: '멜버른', airport: '툴라마린공항', country: '호주' },
            { code: 'CHC', name: '크라이스트처치', airport: '크라이스트처치국제공항', country: '뉴질랜드' },
            { code: 'CNS', name: '케언즈', airport: '케언즈공항', country: '호주' },
            { code: 'ZQN', name: '퀸스타운', airport: '퀸스타운공항', country: '뉴질랜드' },
            { code: 'PER', name: '퍼스', airport: '퍼스공항', country: '호주' },
            { code: 'ROR', name: '코로르', airport: '아리아이공항', country: '팔라우' },
          ]},
          { name: '남미', airports: [
            { code: 'GRU', name: '상파울루', airport: '과를호스공항', country: '브라질' },
            { code: 'GIG', name: '리오 데 자네이로', airport: '리오데자네이로공항', country: '브라질' },
            { code: 'LIM', name: '리마', airport: '호르헤차베스국제공항', country: '페루' },
            { code: 'MEX', name: '멕시코 시티', airport: '베니토후아레스국제공항', country: '멕시코' },
            { code: 'CUN', name: '칸쿤', airport: '칸쿤국제공항', country: '멕시코' },
            { code: 'EZE', name: '부에노스 아이레스', airport: '미니스트로피스타리니국제공항', country: '아르헨티나' },
            { code: 'SCL', name: '산티아고', airport: '산티아고국제공항', country: '칠레' },
            { code: 'BOG', name: '보고타', airport: '엘도라도국제공항', country: '콜롬비아' },
            { code: 'HAV', name: '하바나', airport: '호세마르티국제공항', country: '쿠바' },
            { code: 'UIO', name: '키토', airport: '키토국제공항', country: '이콰도르' },
          ]},
          { name: '아시아', airports: [
            { code: 'KTM', name: '카트만두', airport: '카트만두공항', country: '네팔' },
            { code: 'DEL', name: '델리', airport: '인디라간디국제공항', country: '인도' },
            { code: 'MAA', name: '첸나이', airport: '첸나이공항', country: '인도' },
            { code: 'BOM', name: '뭄바이', airport: '차트라파티시바지국제공항', country: '인도' },
            { code: 'BLR', name: '방갈로', airport: '방갈로르공항', country: '인도' },
            { code: 'CCU', name: '콜카타', airport: '네타지수바스찬드라보스국제공항', country: '인도' },
            { code: 'ULN', name: '울란바토르', airport: '울란바토르공항', country: '몽골' },
            { code: 'MLE', name: '말레', airport: '말레국제공항', country: '몰디브' },
            { code: 'CMB', name: '콜롬보', airport: '반다라나이케국제공항', country: '스리랑카' },
            { code: 'TAS', name: '타쉬켄트', airport: '타쉬켄트국제공항', country: '우즈베키스탄' },
          ]},
          { name: '중동', airports: [
            { code: 'DXB', name: '두바이', airport: '두바이국제공항', country: '아랍에미리트' },
            { code: 'AUH', name: '아부 다비', airport: '아부다디국제공항', country: '아랍에미리트' },
            { code: 'TLV', name: '텔아비브', airport: '벤구리온국제공항', country: '이스라엘' },
            { code: 'IKA', name: '테헤란', airport: '이맘호메이니국제공항', country: '이란' },
            { code: 'DOH', name: '도하', airport: '하마드국제공항', country: '카타르' },
            { code: 'AMM', name: '암만', airport: '퀸알리아국제공항', country: '요르단' },
            { code: 'KWI', name: '쿠웨이트', airport: '쿠웨이트국제공항', country: '쿠웨이트' },
            { code: 'DMM', name: '담맘', airport: '킹파드공항', country: '사우디아라비아' },
            { code: 'JED', name: '젯다', airport: '젯다공항', country: '사우디아라비아' },
            { code: 'RUH', name: '리야드', airport: '킹할리드국제공항', country: '사우디아라비아' },
          ]},
          { name: '아프리카', airports: [
            { code: 'CAI', name: '카이로', airport: '카이로국제공항', country: '이집트' },
            { code: 'JNB', name: '요하네스버그', airport: '오알탐보국제공항', country: '남아프리카공화국' },
            { code: 'CPT', name: '케이프타운', airport: '케이프타운국제공항', country: '남아프리카공화국' },
            { code: 'NBO', name: '나이로비', airport: '조모케냐타국제공항', country: '케냐' },
            { code: 'ALG', name: '알제', airport: '우아리부메디엔공항', country: '알제리' },
            { code: 'CMN', name: '카사블랑카', airport: '모하메드V국제공항', country: '모로코' },
            { code: 'LOS', name: '라고스', airport: '무르탈라무하마드공항', country: '나이지리아' },
            { code: 'ACC', name: '아크라', airport: '코토카국제공항', country: '가나' },
            { code: 'DAR', name: '다르에스살람', airport: '줄리어스니에레레국제공항', country: '탄자니아' },
            { code: 'TUN', name: '튀니즈', airport: '튀니즈카르타고공항', country: '튜니지아' },
          ]},
        ],
        showDepAreas: true,
        showDepAirports: false,
        showArrAreas: true,
        showArrAirports: false,
        passengers: {
          adult: 1,
          child: 0,
          infant: 0,
        },
        showPassengerSelect: false,
        departureDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        returnDate: '',
        oneWayOnly: false,
        buttons: [
          { label: "왕복", isDisabled: true, textColor: "#CCCCCC"},
          { label: "편도", isDisabled: false, textColor: "white"},
        ],
        roundTrip: true,
    }
  },
  methods: {
    ...mapActions(flightModule, ['requestFlightProductsToFastAPI']),
    toggleAreaSelection() {
      this.showAreas = !this.showAreas;
      if (!this.showAreas) {
        this.selectedArea = null;
        this.selectedAirport = null;
        this.showAirports = false;
      }
    },
    toggleAirportSelection() {
      this.showAirports = !this.showAirports;
      if (!this.showAirports) {
        this.selectedAirport = null;
      }
    },
    selectDepArea(area) {
      this.departureArea = area;
      this.showDepAreas = false;
      this.showDepAirports = true;
    },
    selectDepAirport(airport) {
      this.departureAirport = airport;
      this.showDepAirports = false;
      this.showDepAreas = true
    },
    selectArrArea(area) {
      this.arrivalArea = area;
      this.showArrAreas = false;
      this.showArrAirports = true;
    },
    selectArrAirport(airport) {
      this.arrivalAirport = airport;
      this.showArrAirports = false;
      this.showArrAreas = true;
    },
    searchFlights() {
      this.showResults = true;
    },
    incrementPassenger(type) {
    this.passengers[type]++;
    },
    decrementPassenger(type) {
      if (this.passengers[type] > 0) {
        this.passengers[type]--;
      }
    },
    switchArrDep() {
      const tmpDepAirport = this.departureAirport
      this.departureAirport = this.arrivalAirport
      this.arrivalAirport = tmpDepAirport
    },
    toggleToolbarButton(label) {
      if (label === "왕복") {
        this.buttons = [
          { label: "왕복", isDisabled: true, textColor: "#CCCCCC"},
          { label: "편도", isDisabled: false, textColor: "white"},
        ]
        this.roundTrip = true
      } else { 
        this.buttons = [
          { label: "왕복", isDisabled: false, textColor: "white"},
          { label: "편도", isDisabled: true, textColor: "#CCCCCC"},
        ]
        this.roundTrip = false
        this.returnDate = ''
      }
    },
    async searchFlights() {
      const originLocationCode = this.departureAirport.code
      const destinationLocationCode = this.arrivalAirport.code
      const departureDate = this.departureDate
      const returnDate = this.returnDate
      const nonStop = this.oneWayOnly
      const adults = this.passengers.adult
      const children = this.passengers.child
      const infants = this.passengers.infant
      console.log(originLocationCode, destinationLocationCode, departureDate, returnDate, nonStop, adults, children, infants)
      await this.requestFlightProductsToFastAPI({ originLocationCode, destinationLocationCode, departureDate, returnDate, nonStop, adults, children, infants })
      // await this.$router.push({ name: 'FlightProductListPage' })
    }
  },
  computed: {
    totalPassengers() {
      return this.passengers.adult + this.passengers.child + this.passengers.infant;
    },
    passengerLabel() {
      const adultCount = this.passengers.adult;
      const childCount = this.passengers.child;
      const infantCount = this.passengers.infant;

      if (adultCount > 0 && childCount === 0 && infantCount === 0) {
        return `성인: ${adultCount}명`;
      } else if (adultCount === 0 && childCount > 0 && infantCount === 0) {
        return `소아: ${childCount}명`;
      } else if (adultCount === 0 && childCount === 0 && infantCount > 0) {
        return `유아: ${infantCount}명`;
      } else if (adultCount > 0 && (childCount > 0 || infantCount > 0)) {
        return `승객: ${this.totalPassengers}명`;
      } else {
        return `승객: ${this.totalPassengers}명`;
      }
    },
  },
}
</script>

<style>
div {
  font-family: Arial, sans-serif;
}
.search-toolbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border-bottom: 1px solid #ccc;
}
.search-toolbar input[type="date"] {
  padding: 5px;
}
.search-button {
  padding: 5px 10px;
  margin-top: 32px;
  background-color: #0070c9 !important;
  color: white !important;
  border: none;
}
.search-results {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
.airport-buttons {
  text-align: center; 
  padding: 15px;
}
.passenger-select {
  text-align: center;
}
.passenger-button{
  padding: 5px 10px;
  background-color: white;
  color: black;
  cursor: pointer;
}

.date-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 13px;
}

.checkbox-container{
  display: flex;
  align-items: center;
}

.round-trip-toolbar{
  background-color: black; 
  height: 50px;
  width: 100%;
  border-radius: 10px 10px 0 0;
}
.toolbar-button {
  margin-left: 45px;
  font-size: 18px;
  background-color: transparent;
  border: none;
  margin-top: 12px;
}
</style>