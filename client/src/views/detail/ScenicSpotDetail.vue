<template>
  <div class="detail-page">
    <div class="navgator">
      <!-- Back icon to return to ScenicSpotList page -->
      <div class="back-icon" @click="back">
        <i
          class="bi bi-chevron-left"
          style="font-size: 1.2rem; color: #000"
        ></i>
      </div>
      <!-- ^ Back icon to return to ScenicSpotList page ^ -->

      <!-- Castle name at the top of the page -->
      <div class="title">
        <h3>{{ scenic.scenic_name }}</h3>
      </div>
      <!-- ^ Castle name at the top of the page ^ -->

    </div>

    <div class="scenic-detail">
      <!-- Picture carousel -->
      <div
        id="castle-photos"
        class="scenic-cover carousel slide"
        data-bs-interval="false"
      >
        <!-- Picture carousel - Bottom 3 buttons -->
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#castle-photos"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#castle-photos"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#castle-photos"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <!-- ^ Picture carousel - Bottom 3 buttons ^ -->

        <!-- Picture carousel - Pictures  -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img :src="scenic.scenic_url" alt="" class="castle-pic w-100" />
          </div>
          <div class="carousel-item">
            <img :src="scenic.scenic_url2" alt="" class="castle-pic w-100" />
          </div>
          <div class="carousel-item">
            <img :src="scenic.scenic_url3" alt="" class="castle-pic w-100" />
          </div>
        </div>
        <!-- ^ Picture carousel - Pictures ^ -->

        <!--  Picture carousel - Left-right button  -->
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#castle-photos"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#castle-photos"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <!-- ^ Picture carousel - Left-right button ^ -->
      </div>
      <!-- ^ Picture carousel ^ -->

      <!-- Castle key details -->
      <div class="scenic-opentime">
        <h5>{{ scenic.scenic_name }}</h5>
        <h6>Opening hours: {{ scenic.openingHours }}</h6>
        <h6>Student Entrance: £{{ scenic.entrance }}</h6>
      </div>
      <!-- ^ Castle key details ^ -->

      <!-- Navbar -->
      <div class="scenic-info">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="intro-tab"
              data-bs-toggle="tab"
              data-bs-target="#intro"
              type="button"
              role="tab"
              aria-controls="intro"
              aria-selected="true"
            >
              INTRODUCTION
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="trans-tab"
              data-bs-toggle="tab"
              data-bs-target="#trans"
              type="button"
              role="tab"
              aria-controls="trans"
              aria-selected="false"
            >
              TRANSPORT
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="map-tab"
              data-bs-toggle="tab"
              data-bs-target="#map"
              type="button"
              role="tab"
              aria-controls="map"
              aria-selected="false"
            >
              MAP
            </button>
          </li>
        </ul>
        <div class="tab-content">
          <!-- Introduction tab -->
          <div
            class="tab-pane fade show active"
            id="intro"
            role="tabpanel"
            aria-labelledby="intro-tab"
          >
            <!-- Castle description -->
            <p>
              {{ scenic.intro }} <br />
              <a :href="scenic.introSource">Source: Wikipedia</a>
            </p>
            <!-- ^ Castle description ^ -->
            <!--  Youtube video  -->
            <iframe
              id="video"
              :src="scenic.video"
              width="340"
              height="250"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <!-- ^ Youtube video ^ -->
          </div>
          <!-- ^ Introduction tab ^ -->

          <!-- Transport tab -->
          <div
            class="tab-pane fade"
            id="trans"
            role="tabpanel"
            aria-labelledby="trans-tab"
          >
            <!-- Departure -->
            <div class="box">
              <div class="title d-flex justify-content-between">
                <span class="font-weight-bold">Departure Route</span>
                <span class="cr1">{{
                  scenic.mapList.outbound.change == "" ? "Direct" : "Change"
                }}</span>
              </div>
              <div
                v-for="(ele, index) in scenic.mapList.outbound"
                :key="index"
                class="bus"
              >
                <div class="d-flex">
                  <div class="col-4">
                    <div class="num">{{ ele.bus }}</div>
                  </div>
                  <div class="col-8 mx-3">
                    <div class="target-item">
                      <div class="target-name target-start">
                        {{ ele.start }}
                      </div>
                      <div
                        v-if="ele.change == '' ? true : false"
                        class="ms-3 cr1"
                      >
                        Direct
                      </div>
                      <div class="target-name target-end">
                        {{ ele.end }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Determine if the bus journey is a direct journey or require a change of buses -->
                <div
                  v-if="
                    ele.change != '' &&
                    index != scenic.mapList.outbound.length - 1
                      ? true
                      : false
                  "
                  class="change"
                >
                  1 change
                </div>
                <!-- ^ Determine if the bus journey is a direct journey or require a change of buses ^ -->
              </div>
            </div>
            <!-- departure -->
            <div class="box">
              <div class="title d-flex justify-content-between">
                <span class="font-weight-bold">Return Route</span>
                <span class="cr1">{{
                  scenic.mapList.outbound.change == "" ? "Direct" : "Change"
                }}</span>
              </div>
              <div
                v-for="(ele, index) in scenic.mapList.back"
                :key="index"
                class="bus"
              >
                <div class="d-flex">
                  <div class="col-4">
                    <div class="num">{{ ele.bus }}</div>
                  </div>
                  <div class="col-8 mx-3">
                    <div class="target-item">
                      <div class="target-name target-start">
                        {{ ele.start }}
                      </div>
                      <div class="target-name target-end">
                        {{ ele.end }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- ^ Determine if the bus journey is a direct journey or require a change of buses ^ -->
                <div
                  v-if="
                    ele.change != '' &&
                    index != scenic.mapList.outbound.length - 1
                      ? true
                      : false
                  "
                  class="change"
                >
                  1 change
                </div>
              </div>
            </div>
          </div>
          <!-- ^ Transport tab ^ -->

          <!-- Map tab -->
          <div
            class="tab-pane fade"
            id="map"
            role="tabpanel"
            aria-labelledby="map-tab"
          >
            <h5>Location on Map:</h5>
            <iframe
              :src="scenic.location"
              width="340"
              height="300"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <!-- ^ Map tab ^ -->
        </div>
      </div>
      <!-- ^ Navbar ^ -->

      <div style="height: 4rem"></div>
    </div>

    <!-- Bottom purchase bar -->
    <div class="scenic-buy">
      <div class="price">
        Price from:
        <span class="font-weight-bold lead">£{{ scenic.entrance }}</span>
      </div>
      <div class="buy">
        <button type="button" class="btn btn-primary" @click="gotoBuy">
          Purchase
        </button>
      </div>
    </div>
    <!-- ^ Bottom purchase bar ^ -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ScenicDetail",
  data() {
    return {
      detailHeight: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    gotoBuy() {
      this.$router.push({
        path: "/choose_date",
        query: {
          name: this.$route.query.name,
        },
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapState(["scenic_lists"]),
    scenic() {
      const item = this.scenic_lists.filter((ele) => {
        return ele.scenic_id == this.$route.query.id;
      })[0];
      return item;
    
    },
  },
};
</script>

<style scoped>
@media (min-width: 800px) {
  /* Adjust page title font size */  
  h3{
    font-size: 6vh;
  }
  /* ^ Adjust page title font size ^ */

  /* Adjust video/map size */
  iframe {
    width: 70vw;
    height: 70vh;
  }
  /* ^ Adjust video/map size ^ */

  /* For picture carousel */
  /* Adjust div containing picture */
  .scenic-cover {
    height: 35vw !important;
  }
  /* ^ Adjust div containing picture ^ */

  /* Adjust picture */
  .scenic-cover img {
    height: 35vw !important;
    width: 100%;
  }
  /* ^ Adjust picture ^ */
  /* ^ For picture carousel ^ */

  /* Bottom purchase bar */
  .price{
    margin-left: 20vw;
  }

  .buy{
    margin-right: 20vw;
  }
  /* ^ Bottom purchase bar ^ */
}

iframe {
  margin-top: 1rem;
}

p {
  text-align: justify;
}

/* Area above carousel picture */
.navgator {
  padding: 1.2rem;
  width: 100%;
}
.back-icon {
  position: absolute;
  top: 0.8rem;
  left: 1rem;
  line-height: 1.8rem;
}

/* Page title */
.title{
  text-align: center;
}
/* ^ Page title ^ */
/* ^ Area above carousel picture ^ */

/* Picture carousel */
/* div containing carousel picture */
.scenic-cover {
  height: 16rem;
}
/* ^ div containing carousel picture ^ */

/* picture */
.scenic-cover img {
  height: 16rem;
  width: 100%;
}
/* ^ picture ^ */
/* ^ Picture carousel ^ */

/* Castle key details */
.scenic-opentime {
  padding: 1rem;
  text-align: left;
}
/* ^ Castle key details ^ */

/* Navbar */
.nav-link {
  color: #999;
}
.tab-content {
  padding: 1rem;
}
.bus-stops {
  padding: 1rem;
  text-align: left;
}

/* Transport tab */
.cr1 {
  color: #797979;
}
.box .bus {
  margin-top: 1rem;
}
.box .num {
  color: #fff;
  font-weight: bold;
  background: #36a9ce;
  line-height: 3rem;
  padding: 0.133rem;
}

.target-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 2px solid #5697cb;
  height: 5rem;
  text-align: left;
}
.target-item .target-name {
  position: relative;
  padding-left: 1rem;
}
.target-item .target-name::after {
  content: "";
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #36a9ce;
  left: -4%;
}
.target-item .target-end::after {
  bottom: 0;
}
/* ^ Transport tab ^ */

/* ^ Navbar ^ */

/* Bottom purchase bar */
.scenic-buy {
  position: fixed;
  width: 100%;
  bottom: 0rem;
  left: 0;
  height: 4rem;
  padding: 1rem;

  z-index: 999;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
}
.buy {
  width: 8rem;
}
.buy .btn {
  border-radius: 0.5rem;
}
/* ^ Bottom purchase bar ^ */

</style>