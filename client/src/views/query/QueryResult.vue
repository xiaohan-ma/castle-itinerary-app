<template>
  <!-- order detail -->
  <div class="checkout-order-page">
    <div class="navgator">
      <!-- Back icon to return to OrderQuery page -->
      <div class="back-icon" @click="back">
        <i
          class="bi bi-chevron-left"
          style="font-size: 1.2rem; color: #000"
        ></i>
      </div>
      <!-- ^ Back icon to return to OrderQuery page ^ -->
      <!-- Page title -->
      <div class="title">
        <h3>Query Result</h3>
      </div>
      <!-- ^ Page title ^ -->
    </div>
    <div class="checkout-order">
      <div class="infos">
        <!-- Reference number section -->
        <div class="order-info">
          <div>Reference number</div>
          <!-- Return Reference number from back-end -->
          <div>{{ getOrderQueryInfo.orderDetails.OrderID }}</div>
          <!-- ^ Return Reference number from back-end ^ -->
        </div>
        <!-- ^ Reference number section ^ -->

        <div class="part-line"></div>

        <!-- Contact information section -->
        <div class="title-info">Contact Information</div>
        <div class="order-info">
          <div>Customer Name</div>
          <!-- Return customer name from back-end -->
          <div>{{ getOrderQueryInfo.orderDetails.Name }}</div>
          <!-- ^ Return customer name from back-end ^ -->
        </div>
        <div class="order-info">
          <div>Email</div>
          <!-- Return customer Email from back-end -->
          <div>{{ getOrderQueryInfo.orderDetails.CustomerEmail }}</div>
          <!-- ^ Return customer Email from back-end ^ -->
        </div>
        <!-- Contact information section -->
      </div>

      <div class="part-line"></div>

      <div class="infos">
        <!-- Order information section -->
        <div class="title-info">Order Information</div>
        <div class="order-info">
          <div>Castle name</div>
          <div>
            <!-- Return Castle Name from back-end -->
            {{ formatName(getOrderQueryInfo.orderDetails["CastleName"]) }}
            <!-- ^ Return customer Email from back-end ^ -->
          </div>
        </div>
        <div class="order-info">
          <div>Travel date</div>
          <div>
            <!-- Return Travel Date from back-end -->
            {{ formatDate(getOrderQueryInfo.orderDetails.ItineraryDate) }}
            <!-- ^ Return Travel Date from back-end ^ -->
          </div>
        </div>
      </div>
      <!-- order page -->
      <div class="text-start choose-ticket">
        <h5 class="">outbound</h5>
        <div
          class="outbound card"
          v-if="
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Alnwick Castle' ||
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Auckland Castle'
          "
        >
          <div class="row order-item">
            <div class="col-3">
              <div class="left">
                <span>{{ getOrderQueryInfo.outbound.RouteName }}</span>
              </div>
            </div>
            <div class="col-8">
              <div class="orderInfo">
                <div class="time">
                  {{ getOrderQueryInfo.outbound.DepartureTime }}-----{{
                    getOrderQueryInfo.outbound.ArrivalTime
                  }}
                </div>
                <div class="target">
                  {{ getOrderQueryInfo.outbound.DepartureStation }}-----{{
                    getOrderQueryInfo.outbound.Destination
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="row order-item"></div>
        </div>
        <div
          class="outbound card"
          v-if="
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Bamburgh Castle' ||
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Barnard Castle'
          "
        >
          <div class="row order-item">
            <div class="col-3">
              <div class="left">
                <span>{{ getOrderQueryInfo.outbound.RouteName }}</span>
                <span>{{ getOrderQueryInfo.outbound.RouteName2 }}</span>
              </div>
            </div>
            <div class="col-8">
              <div class="orderInfo">
                <div class="time">
                  {{ getOrderQueryInfo.outbound.DepartureTime }}----{{
                    getOrderQueryInfo.outbound.ArrivalTime
                  }}
                </div>
                <div class="target">
                  {{ getOrderQueryInfo.outbound.DepartureStation }}-----{{
                    getOrderQueryInfo.outbound["Exchange Station"]
                  }}
                </div>
              </div>
              <div class="orderInfo">
                <div class="target1">
                  {{ getOrderQueryInfo.outbound["Exchange Station"] }}-----{{
                    getOrderQueryInfo.outbound["Final Destination"]
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h5 class="text-start">return</h5>
        <div
          class="return card"
          v-if="
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Alnwick Castle' ||
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Auckland Castle'
          "
        >
          <div class="row order-item">
            <div class="col-3">
              <div class="left">
                <span>{{ getOrderQueryInfo.return.RouteName }}</span>
              </div>
            </div>
            <div class="col-8">
              <div class="orderInfo">
                <div class="time">
                  {{ getOrderQueryInfo.return.DepartureTime }} -----{{
                    getOrderQueryInfo.return.ArrivalTime
                  }}
                </div>
                <div class="target">
                  {{ getOrderQueryInfo.return.DepartureStation }}-----{{
                    getOrderQueryInfo.return.Destination
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="row order-item">
            <div class="col-3"></div>
          </div>
        </div>
        <div
          class="return card"
          v-if="
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Bamburgh Castle' ||
            this.$store.getters.getOrderQueryInfo.orderDetails.CastleName ==
              'Barnard Castle'
          "
        >
          <div class="row order-item">
            <div class="col-3">
              <div class="left">
                <span>{{ getOrderQueryInfo.return.RouteName }}</span>
                <span>{{ getOrderQueryInfo.return.RouteName2 }}</span>
              </div>
            </div>
            <div class="col-8">
              <div class="orderInfo">
                <div class="time">
                  {{ getOrderQueryInfo.return.DepartureTime }}----{{
                    getOrderQueryInfo.return.ArrivalTime
                  }}
                </div>
                <div class="target">
                  {{ getOrderQueryInfo.return.DepartureStation }}-----{{
                    getOrderQueryInfo.return["Exchange Station"]
                  }}
                </div>
              </div>
              <div class="orderInfo">
                <div class="target1">
                  {{ getOrderQueryInfo.return["Exchange Station"] }}-----{{
                    getOrderQueryInfo.return["Final Destination"]
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ^ Order information section  ^-->
      <!-- Order info -->
      <div class="order-info">
        <div>Quantity</div>
        <div>{{ getOrderQueryInfo.orderDetails.quantity }}</div>
      </div>
      <div class="part-line"></div>
    </div>

    <div class="total d-flex justify-content-around">
      <span>Total: </span>
      <span>{{ getOrderQueryInfo.orderDetails.TotalCost }}</span>
    </div>

    <div class="confirm">
      <!-- <button type="button" class="btn btn-primary submit" @click="confirmOrder">
        Checkout
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutOrder",
  methods: {
    confirmOrder() {
      this.$router.push({
        path: "/order_res",
      });
    },
    back() {
      this.$router.go(-1);
    },
    //Formats date to yyyy-mm-dd format
    formatDate(date) {
      let d = date.split("T")[0];
      return d;
    },
    //Capitalises each word in a name/sentence/phrase
    formatName(name) {
      let word = name.split(" ");
      for (let i = 0; i < word.length; i++) {
        word[i] = word[i][0].toUpperCase() + word[i].substr(1);
      }
      return word.join(" ");
    },
  },
  computed: {
    getOrderQueryInfo() {
      return this.$store.getters.getOrderQueryInfo;
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
.checkout-order {
  padding: 1rem;
  text-align: left;
  line-height: 2.3rem;
}
.order-info {
  flex: 0 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.orderInfo {
  flex: 0 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.part-line {
  width: 100%;
  height: 1px;
  background-color: #bbb;
}
.total {
  text-align: right;
  padding: 1rem;
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
.outbound,
.return {
  background: #efefef;
}
</style>
