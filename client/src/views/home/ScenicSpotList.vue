<!-- Note: " ^ .... ^ " means end of section -->

<template>
  <div class="home-page">
    <div class="navgator">
      <div class="title-section position-retive">

        <!-- Main page title -->
        <h3>Toon Tours n' Travel</h3>
         <!-- ^ Main page title ^ -->

        <!-- Link to retrieve past order -->
        <router-link to="/query" class="queryBtn">
          <p>Check Order</p>
        </router-link>
        <!-- ^ Link to retrieve past order ^ -->

      </div>
    </div>

    <!-- List of Picture carousel -->
    <div class="scenic-list">

      <!-- Individual Picture carousel -->
      <!-- Loop through data in store/scenic_list.js to present the information in Picture Carousel using a single source code-->
      <!-- Built with Bootstrap v5.1 -->
      <div
        v-bind:id="scenic.scenic_id"
        class="card carousel slide main-carousel"
        style=""
        v-for="(scenic, i) in scenic_lists"
        :key="i"
      >

      <!-- Buttons located at the bottom of image -->
        <div class="carousel-indicators">
          <button
            type="button"
            v-bind:data-bs-target="'#' + scenic.scenic_id"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            v-bind:data-bs-target="'#' + scenic.scenic_id"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            v-bind:data-bs-target="'#' + scenic.scenic_id"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <!-- ^ Buttons located at the bottom of image ^ -->

        <!-- Clickable image to take user to image when they click on the castle -->
        <div @click="gotoDetail(scenic)">

          <!-- Castle name displayed on the center of image -->
          <div class="carousel-title">
            {{ scenic.scenic_name }}
          </div>
          <!-- ^ Castle name displayed on the center of image ^ -->

          <!-- Castle images -->
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                :src="scenic.scenic_url"
                alt=""
                class="card-img-top castle-pic-main w-100"
              />
            </div>
            <div class="carousel-item">
              <img
                :src="scenic.scenic_url2"
                alt=""
                class="card-img-top castle-pic-main w-100"
              />
            </div>
            <div class="carousel-item">
              <img
                :src="scenic.scenic_url3"
                alt=""
                class="card-img-top castle-pic-main w-100"
              />
            </div>
          </div>
          <!-- ^ Castle images ^ -->

        </div>
        <!-- ^ Clickable image to take user to image when they click on the castle ^ -->
      
      </div>
      <!-- ^ Individual Picture carousel ^ -->

    </div>
    <!-- ^ List of Picture carousel ^ -->

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ScenicList",
  data() {
    return {
      querySvg: require("@/assets/folder.svg"),
    };
  },
  created() {
    //   this.getScenicLists();
  },
  mounted() {},
  methods: {
    getScenicLists() {
      this.axios.post().then();
    },

    gotoDetail(scenic) {
      // Render the respective data from back-end to the respective castle
      const item = this.scenic_lists.filter((ele) => {
        return ele.scenic_id == scenic.scenic_id;
      })[0];
      // Add to repository
      this.$store.commit("setScenic", item);
      // Change page
      this.$router.push({
        path: "/detail",
        query: {
          id: scenic.scenic_id,
        },
      });
    },
  },
  computed: {
    ...mapState(["scenic_lists"]),
  },
};
</script>

<style scoped>

/* making image responsive after 800px */
@media (min-width: 800px) {

  /* title-section class */
  /* Adjust page title font size */
  h3{
    font-size: 6vh;
  }
  /* ^ Adjust page title font size ^ */

  /* Adjust position of Check Order button */
  .queryBtn {
    position: absolute;
    right: 2rem;
    top: 1.5rem;
  }
  /* ^ Adjust position of Check Order button ^ */
  /* ^ title-section class ^ */

  /* scenic-list class */
  /* Adjust spacing between each carousel card */
  .card {
    margin: 1.5rem 1rem !important;
  }
  /* ^ Adjust spacing between each carousel card ^ */

  /* Adjust carousel-title(in middle of picture) font size */
  .carousel-title{
    font-size: 5vh !important;
  }
  /* ^ Adjust carousel-title(in middle of picture) font size ^ */
   
  /* Adjust carousel picture size */
  .card-img-top {
    height: 30vw !important;
  }
  /* ^ Adjust carousel picture size ^ */
  /* ^ scenic-list class ^ */
}
/* ^ making image responsive after 800px ^ */

.navgator {
  padding: 1.2rem;
  width: 100%;
}
.title-section {
  line-height: 1.8rem;
  height: 2rem;
  text-align: center;
}

/* For picture carousel */
.card {
  margin: 1rem 0.5rem;
  border-style: none !important;
}

.carousel-title{
  position: absolute;
  z-index: 12;
  top: 42%;
  left: 10%;
  width: 80%;
  text-align: center;
  color: aliceblue;
  font-weight: bold;
  font-size: 1.5rem;
}

.card-img-top {
  height: 11rem;
  border-radius: 1rem;
  filter: brightness(0.8);
}

/* ^ For picture carousel ^ */

</style>

