<template>
  <div class="checkout-order-page">
    <div class="navgator">
      <!-- Back icon to return to FillContact page -->
      <div class="back-icon" @click="back">
        <i
          class="bi bi-chevron-left"
          style="font-size: 1.2rem; color: #000"
        ></i>
      </div>
      <!-- ^ Back icon to return to FillContact page ^ -->

      <!-- Page title -->
      <div class="title">
        <h3>Checkout Order</h3>
      </div>
      <!-- ^ Page title ^ -->
    </div>

    <div class="checkout-order">
      <!-- Customer information -->
      <div class="infos">
        <div class="title-info">Contact Information</div>
        <div class="order-info">
          <div>Customer Name</div>
          <!-- Return customer name from back-end -->
          <div>{{ this.$store.getters.getUserInfo.name }}</div>
          <!-- ^ Return customer name from back-end ^ -->
        </div>
        <div class="order-info">
          <div>Email</div>
          <!-- Return customer email from back-end -->
          <div>{{ this.$store.getters.getUserInfo.email }}</div>
          <!-- Return customer email from back-end -->
        </div>
      </div>
      <!-- ^ Customer information ^ -->

      <div class="part-line"></div>

      <!-- Order Information -->
      <div class="infos">
        <div class="title-info">Order Information</div>
        <div class="order-info">
          <div>Castle name</div>
          <!-- Return chosen castle name from back-end -->
          <div>{{ this.$store.getters.getScenicInfo.scenic_name }}</div>
          <!-- ^ Return chosen castle name from back-end ^ -->
        </div>
        <div class="order-info">
          <div>Travel date</div>
          <!-- Return chosen travel date from back-end -->
          <div>{{ this.$store.getters.getTimeInfo.date }}</div>
          <!-- ^ Return chosen travel date from back-end ^ -->
        </div>
        <div class="order-info">
          <div>Entrance fee</div>
          <!-- Return castle entrance fee from back-end -->
          <div>£ {{ this.$store.getters.getScenicInfo.entrance }}</div>
          <!-- ^ Return castle entrance fee from back-end ^ -->
        </div>
      </div>
      <!-- ^ Order Information ^ -->

      <!-- The ticket information -->
      <div class="text-start choose-ticket">
        <h5 class="">outbound</h5>
        <!-- Return the chosen DEPARTURE bus journey for Alnwick and Auckland Castle from back-end -->
        <!-- Note: Bamburgh and Barnard Castle have different return methods  -->
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
              <div class="busInfo">
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

        <!-- Return the chosen DEPARTURE bus journey for Bamburgh and Barnard Castle from back-end -->
        <!-- Note: Alnwick and Auckland Castle have different return methods  -->
        <div
          class="outbound card"
          v-if="
            this.$store.getters.getScenicInfo.scenic_name ==
              'Bamburgh Castle' ||
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
              <div class="busInfo">
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
                      busTime.TYPE,
                      busTime.BusFare1,
                      busTime.BusFare2,
                      busTime.Operator1,
                      busTime.Operator2
                    )
                  }}
                </div>
              </div>
              <div class="busInfo">
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

        <!-- Return the chosen RETURN bus journey for Alnwick and Auckland Castle from back-end -->
        <!-- Note: Bamburgh and Barnard Castle have different return methods  -->
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
              <div class="busInfo">
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
        <!-- ^ Return the chosen RETURN bus journey for Alnwick and Auckland Castle from back-end ^ -->

        <!-- Return the chosen RETURN bus journey for Bamburgh and Barnard Castle from back-end -->
        <!-- Note: Alnwick and Auckland Castle Castle have different return methods  -->
        <div
          class="return card"
          v-if="
            this.$store.getters.getScenicInfo.scenic_name ==
              'Bamburgh Castle' ||
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
              <div class="busInfo">
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
                      busTime.TYPE,
                      busTime.BusFare1,
                      busTime.BusFare2,
                      busTime.Operator1,
                      busTime.Operator2
                    )
                  }}
                </div>
              </div>
              <div class="busInfo">
                <div class="target1">
                  {{ busTime["Exchange Station"] }}-----{{
                    busTime["Final Destination"]
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Return the chosen RETURN bus journey for Bamburgh and Barnard Castle from back-end -->
      </div>

      <!-- Quantity -->
      <div class="order-info">
        <div>Quantity</div>
        <!-- Return number of pax chosen from back-end -->
        <div>{{ this.$store.getters.getTimeInfo.num }}</div>
        <!-- ^ Return number of pax chosen from back-end ^ -->
      </div>
      <!-- ^ Quantity ^ -->

      <div class="part-line"></div>
    </div>

    <!-- Total price of the order -->
    <div class="total d-flex justify-content-around">
      <span>Total: </span>
      <!-- Return the total calculated price from back-end -->
      <span>£ {{ this.product.price }}</span>
      <!-- ^ Return the total calculated price from back-end ^ -->
    </div>
    <!-- ^ Total price of the order ^ -->

    <div class="confirm">
      <h4>Checkout:</h4>

      <!-- PayPal Button-->
      <div ref="paypal" class="btn submit"></div>
      <!-- ^ PayPal Button ^ -->

      <!-- Test button in case of PayPal server error -->
      <button
        type="button"
        class="btn btn-outline-secondary submit"
        @click="confirmOrder"
      >
        Other payment
      </button>
      <!-- ^ Test button in case of PayPal server error ^ -->
    </div>
  </div>
</template>

<script>
import { tsMethodSignature, tsParenthesizedType } from "@babel/types";
import store from "../../store";
import axios from "axios";

export default {
  name: "CheckoutOrder",
  // PayPal pop-up page
  data: function () {
    return {
      loaded: false,
      busJourney: {
        outboundPrice: "",
        returnPrice: "",
      },
      product: {
        price: "",
        // description: "Total itinerary",
        // price: "£" + this.product.price,
        description:
          this.$store.getters.getScenicInfo.scenic_name +
          "tickets for " +
          this.$store.getters.getTimeInfo.num +
          " students",
      },
    };
  },
  // ^ PayPal pop-up page ^

  mounted: function () {
    //Calculate total price of itinerary
    //Total price = quantity of people * (return bus journey cost + castle entrance fee)
    let quantity = this.$store.getters.getTimeInfo.num;
    let busTotal;
    //If statement to get the total price of entire intinerary depending on castle
    //As Bamburgh and Barnard Castles require exchanges during the journey
    if (
      this.$store.getters.getScenicInfo.scenic_name == "Alnwick Castle" ||
      this.$store.getters.getScenicInfo.scenic_name == "Auckland Castle"
    ) {
      busTotal = this.getOutboundData[0].LineFare;
    } else {
      if (this.busJourney.outboundPrice >= this.busJourney.returnPrice) {
        busTotal = this.busJourney.outboundPrice;
      } else {
        busTotal = this.busJourney.returnPrice;
      }
    }
    let castleFee = this.$store.getters.getScenicInfo.entrance;
    this.product.price =
      Math.round(quantity * (busTotal + castleFee) * 100) / 100;

    //Paypal:
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ASD-aWnsaiJ28s1bOLxOMucrRlqYzg58JrOBFeE1BlfV1kTRH0K_kycB4J7NoTb7evDGY1LqTc0lnMqW&currency=GBP&disable-funding=card";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  //^ Calculate total price of itinerary ^
  methods: {
    //Ensure bus price is adjusted depending on journey operator
    getBusPrice(type, fare1, fare2, operator1, operator2) {
      let cost;
      if (operator1 == operator2) {
        cost = fare1;
      } else {
        cost = fare1 + fare2;
      }

      if (type == "Journey") {
        this.busJourney.outboundPrice = cost;
      } else {
        this.busJourney.returnPrice = cost;
      }
      return cost;
    },
    // For Other payment button to simulate a successful transaction should PayPal server fails
    confirmOrder() {
      let outboundInfo = JSON.stringify(this.getOutboundData[0]);
      let returnInfo = JSON.stringify(this.getReturnData[0]);
      axios
        .post("http://localhost:3001/api/addOrder", {
          email: this.$store.getters.getUserInfo.email,
          itineraryDate: this.$store.getters.getTimeInfo.date,
          totalCost: this.product.price,
          journeyInfo: outboundInfo,
          returnInfo: returnInfo,
          castleName: this.$store.getters.getScenicInfo.scenic_name,
          quantity: this.$store.getters.getTimeInfo.num,
        })
        .then((response) => {
          this.$store.commit("setOrderNumber", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push({
        path: "/order_res",
      });
    },
    // ^ For Other payment button to simulate a successful transaction should PayPal server fails ^
    back() {
      this.$router.go(-1);
    },
    // PayPal script
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "GBP",
                    value: this.product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            let outboundInfo = JSON.stringify(this.getOutboundData[0]);
            let returnInfo = JSON.stringify(this.getReturnData[0]);
            axios
              .post("http://localhost:3001/api/addOrder", {
                email: this.$store.getters.getUserInfo.email,
                itineraryDate: this.$store.getters.getTimeInfo.date,
                totalCost: this.product.price,
                journeyInfo: outboundInfo,
                returnInfo: returnInfo,
                castleName: this.$store.getters.getScenicInfo.scenic_name,
                quantity: this.$store.getters.getTimeInfo.num,
              })
              .then((response) => {
                this.$store.commit("setOrderNumber", response.data);
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
            const order = await actions.order.capture();
            console.log(order);
            this.$router.push({
              path: "/order_res",
            });
          },
          onError: (err) => {
            console.log(err);
            alert("Payment unsuccessful");
          },
        })
        .render(this.$refs.paypal);
    },
    // ^ PayPal script ^
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
/* Bus information section */
.col-8 {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.busInfo {
  flex: 0 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* ^ Bus information section ^ */
/* Page title */
.title {
  line-height: 1.8rem;
  height: 2rem;
  text-align: center;
}
/* ^ Page title ^ */
/* Contact and Order Information title */
.title-info {
  font-weight: bold;
  font-size: larger;
}
/* ^ Contact and Order Information title ^ */
/* Styling for the entire page */
.checkout-order,
.confirm {
  padding: 1rem;
  text-align: left;
  line-height: 2.3rem;
}
/* ^ Styling for the entire page ^ */
/* Individual rows of information i.e. Customer name, Castle name and etc */
.order-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
/* ^ Individual rows of information i.e. Customer name, Castle name and etc ^ */
/* Partition line between each information section */
.part-line {
  width: 100%;
  height: 1px;
  background-color: #bbb;
}
/* ^ Partition line between each information section ^ */
/* Section containing total price */
.total {
  text-align: right;
  padding: 1rem;
  font-weight: bold;
  font-size: x-large;
}
/* ^ Section containing total price ^ */
/* Section containing the checkout buttons */
.confirm {
  margin-top: 1rem;
  width: 100%;
}
/* ^ Section containing the checkout buttons ^ */
/* Checkout title */
h4 {
  margin: 1rem 0 2rem 0;
}
/* ^ Checkout title ^ */
/* Both PayPal and Other payment buttons */
.submit {
  margin-top: 1rem;
  height: 2.5rem;
  border-radius: 0.6rem;
}
/* ^ Both Paypal and Other payment buttons ^ */
.outbound,
.return {
  background: #efefef;
}
</style>
