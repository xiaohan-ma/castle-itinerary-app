<template>
  <div class="order-res-page">
    <div class="navgator">

      <!-- Page title -->
      <div class="title">
        <h3>Order Result</h3>
      </div>
      <!-- ^ Page title ^ -->

    </div>
    <div class="order-res">
      <!-- Circle tick icon -->
      <div class="res-icon">
        <i class="bi bi-check2-circle" style="font-size: 6rem; color: #000"></i>
      </div>
      <!-- ^ Circle tick icon ^ -->

      <div class="res-detail">
        <div class="display-6">Your reference number is</div>
        <!-- Reference number, data from back-end -->
        <div class="h5" style="color: #02a7f0">
          {{ this.$store.getters.getOrderNumber.referenceNum[0].OrderID }}
        </div>
        <!-- ^ Reference number, data from back-end ^ -->
        <div class="text-start">
          We are pleased to inform you that your reservation has been received
          and confirmed. We will be emailing your e-tickets to your email
          shortly.
        </div>
      </div>
    </div>

    <!-- Confirm button -->
    <div class="confirm">
      <button type="button" class="btn btn-primary submit" @click="backToHome">
        BACK TO HOMEPAGE
      </button>
    </div>
    <!-- ^ Confirm button ^ -->

  </div>
</template>

<script>
export default {
  name: "OrderResult",
  methods: {
    backToHome() {
      this.$router.go(-6);
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

/* Div containing circle tick, reference number and message */
.order-res {
  padding: 1rem;
}
/* ^ Div containing circle tick, reference number and message ^ */

/* Div containing reference number and message */
.res-detail {
  display: flex;
  flex-direction: column;
  height: 14rem;
  justify-content: space-between;
  align-content: space-between;
}
/* ^ Div containing reference number and message ^ */

/* Div containing BACK TO HOMEPAGE button */
.confirm {
  margin-top: 1rem;
  width: 100%;
}
/* ^ Div containing BACK TO HOMEPAGE button ^ */

/* BACK TO HOMEPAGE button */
.submit {
  width: 90%;
  height: 3rem;
  border-radius: 0.6rem;
}
/* ^ BACK TO HOMEPAGE button ^ */
</style>
