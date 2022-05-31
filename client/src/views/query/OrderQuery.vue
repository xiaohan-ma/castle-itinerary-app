<template>
  <div class="fill-contact-page">
    <div class="navgator">
      <div class="back-icon" @click="back">
        <i
          class="bi bi-chevron-left"
          style="font-size: 1.2rem; color: #000"
        ></i>
      </div>
      <div class="title">
        <h3>Order Query</h3>
      </div>
    </div>
    <div class="fill-contact">
      <form @submit.prevent="confirmContact">
        <div class="mb-3">
          <label for="orderNumber" class="form-label"
            >Please input the reference number to query the order.</label
          >
          <input
            v-model="orderNumber"
            type="text"
            class="form-control"
            id="orderNumber"
            required
            placeholder="please input the reference number"
          />
        </div>

        <div class="mb-4">
          <label for="Email" class="form-label"
            >Please input the email to query the order.</label
          >
          <input
            v-model="email"
            type="text"
            class="form-control"
            id="email"
            required
            placeholder="Please input the email to query the order."
          />
        </div>
        <div class="confirm">
          <button type="submit" class="btn btn-primary d-block submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderQuery",
  data() {
    return {
      orderNumber: "",
      email: "",
    };
  },
  methods: {
    confirmContact() {
      //Axios http request to /api/orderquery
      //Post request for customer order details based on reference num.
      axios
        .post("http://localhost:3001/api/orderquery", {
          referenceNo: this.orderNumber,
          email: this.email,
        })
        .then((response) => {
          this.$store.commit("setOrderDetailInfo", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setOrderNumber", this.orderNumber);
      this.$router.push({
        path: "/queryResult",
      });
    },
    back() {
      this.$router.go(-1);
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
.fill-contact {
  margin: 2rem 1rem 1rem 1rem;
  text-align: left;
}
.confirm {
  margin-top: 2rem;
  width: 100%;
}
.submit {
  width: 100%;
  height: 3rem;
  border-radius: 0.6rem;
}
</style>
