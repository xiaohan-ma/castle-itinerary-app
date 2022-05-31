<template>
  <div class="choose-ticket-page">
    <div class="navgator">
      <!-- Back icon to return to ChooseDate page -->
      <div class="back-icon" @click="back">
        <i
          class="bi bi-chevron-left"
          style="font-size: 1.2rem; color: #000"
        ></i>
      </div>
      <!-- ^ Back icon to return to ChooseDate page ^ -->

      <!-- Page title -->
      <div class="title">
        <h3>Choose Ticket</h3>
      </div>
      <!-- ! Page title ! -->
    </div>
    <div class="text-start choose-ticket">
      <h5 class="">outbound</h5>
      <!-- Return the chosen DEPARTURE bus journey for Alnwick and Auckland Castle from back-end
        Note: Bamburgh and Barnard Castle have different return methods -->
      <div
        class="outbound card"
        v-if="
          this.$store.getters.getScenicInfo.scenic_name == 'Alnwick Castle' ||
          this.$store.getters.getScenicInfo.scenic_name == 'Auckland Castle'
        "
      >
        <div
          class="row order-item"
          v-for="busTime in getOutboundData"
          :key="busTime.ScheduleID"
        >
          <div class="col-3">
            <div class="left">
              <span>{{ busTime.RouteName }}</span>
            </div>
          </div>
          <div class="col-8">
            <div class="orderInfo">
              <div class="time">
                {{ busTime.DepartureTime }}----{{ busTime.ArrivalTime }}
              </div>
              <div class="target">
                {{ busTime.DepartureStation }}-----{{ busTime.Destination }}
              </div>
              <div class="money">£ {{ busTime.LineFare }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- ^ Return the chosen DEPARTURE bus journey for Alnwick and Auckland Castle from back-end ^ -->

      <!-- Return the chosen DEPARTURE bus journey for Bamburgh and Barnard Castle from back-end
        Note: Alnwick and Auckland Castle have different return methods -->
      <div
        class="outbound card"
        v-if="
          this.$store.getters.getScenicInfo.scenic_name == 'Bamburgh Castle' ||
          this.$store.getters.getScenicInfo.scenic_name == 'Barnard Castle'
        "
      >
        <div
          class="row order-item"
          v-for="busTime in getOutboundData"
          :key="busTime.ScheduleID"
        >
          <div class="col-3">
            <div class="left">
              <span>{{ busTime.RouteName }}</span>
              <span>{{ busTime.RouteName2 }}</span>
            </div>
          </div>
          <div class="col-8">
            <div class="orderInfo">
              <div class="time">
                {{ busTime.DepartureTime }}----{{ busTime.ArrivalTime }}
              </div>
              <div class="target">
                {{ busTime.DepartureStation }}-----{{
                  busTime["Exchange Station"]
                }}
              </div>
              <div class="money">
                £
                {{
                  getBusPrice(
                    busTime.BusFare1,
                    busTime.BusFare2,
                    busTime.Operator1,
                    busTime.Operator2
                  )
                }}
              </div>
            </div>
            <div class="orderInfo">
              <div class="target1">
                {{ busTime["Exchange Station"] }}-----{{
                  busTime["Final Destination"]
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ^ Return the chosen DEPARTURE bus journey for Bamburgh and Barnard Castle from back-end ^ -->

      <!-- Return the chosen RETURN bus journey for Alnwick and Auckland Castle from back-end
        Note: Bamburgh and Barnard Castle have different return methods -->
      <h5 class="text-start">return</h5>
      <div
        class="return card"
        v-if="
          this.$store.getters.getScenicInfo.scenic_name == 'Alnwick Castle' ||
          this.$store.getters.getScenicInfo.scenic_name == 'Auckland Castle'
        "
      >
        <div
          class="row order-item"
          v-for="busTime in getReturnData"
          :key="busTime.ScheduleID"
        >
          <div class="col-3">
            <div class="left">
              <span>{{ busTime.RouteName }}</span>
            </div>
          </div>
          <div class="col-8">
            <div class="orderInfo">
              <div class="time">
                {{ busTime.DepartureTime }}----{{ busTime.ArrivalTime }}
              </div>
              <div class="target">
                {{ busTime.DepartureStation }}-----{{ busTime.Destination }}
              </div>
              <div class="money">£ {{ busTime.LineFare }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Return the chosen RETURN bus journey for Alnwick and Auckland Castle from back-end -->

      <!-- Return the chosen RETURN bus journey for Bamburgh and Barnard Castle from back-end
        Note: Alnwick and Auckland Castle have different return methods -->
      <div
        class="return card"
        v-if="
          this.$store.getters.getScenicInfo.scenic_name == 'Bamburgh Castle' ||
          this.$store.getters.getScenicInfo.scenic_name == 'Barnard Castle'
        "
      >
        <div
          class="row order-item"
          v-for="busTime in getReturnData"
          :key="busTime.ScheduleID"
        >
          <div class="col-3">
            <div class="left">
              <span>{{ busTime.RouteName }}</span>
              <span>{{ busTime.RouteName2 }}</span>
            </div>
          </div>
          <div class="col-8">
            <div class="orderInfo">
              <div class="time">
                {{ busTime.DepartureTime }}----{{ busTime.ArrivalTime }}
              </div>
              <div class="target">
                {{ busTime.DepartureStation }}-----{{
                  busTime["Exchange Station"]
                }}
              </div>
              <div class="money">
                £
                {{
                  getBusPrice(
                    busTime.BusFare1,
                    busTime.BusFare2,
                    busTime.Operator1,
                    busTime.Operator2
                  )
                }}
              </div>
            </div>
            <div class="orderInfo">
              <div class="target1">
                {{ busTime["Exchange Station"] }}-----{{
                  busTime["Final Destination"]
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ^ Return the chosen RETURN bus journey for Bamburgh and Barnard Castle from back-end ^ -->
    </div>
    <div class="confirm">
      <button
        type="button"
        class="btn btn-primary submit"
        @click="confirmTicket"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChooseTicket",
  methods: {
    confirmTicket() {
      this.$router.push({
        path: "/fill_contact",
      });
    },
    back() {
      this.$router.go(-1);
    },
    getBusPrice(fare1, fare2, operator1, operator2) {
      let price;
      if (operator1 == operator2) {
        price = fare1;
      } else {
        price = fare1 + fare2;
      }
      return price;
    },
  },
  computed: {
    getOutboundData() {
      return this.$store.getters.getBusQueryInfo.busOutboundJSON;
    },
    getReturnData() {
      return this.$store.getters.getBusQueryInfo.busReturnJSON;
    },
  },
};
</script>

<style scoped>
.back-icon {
  position: absolute;
  top: 0.8rem;
  left: 1rem;
  line-height: 1.8rem;
}
.navgator {
  padding: 0.8rem;
  width: 100%;
}
.title {
  line-height: 1.8rem;
  height: 2rem;
  text-align: center;
}
.choose-ticket {
  padding: 1rem;
}
.outbound,
.return {
  background: #efefef;
}
.outbound {
  margin-bottom: 1rem;
}
.col-8 {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.orderInfo {
  flex: 0 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.confirm {
  margin-top: 1rem;
  width: 100%;
}
.submit {
  width: 90%;
  height: 3rem;
  border-radius: 0.6rem;
}
</style>
