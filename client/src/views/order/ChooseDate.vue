<template>
  <!-- Choose date -->
  <div class="choose-date-page">
    <div class="navgator">
      <!-- Back icon to return to ScenicSpotDetail page -->
      <div class="back-icon" @click="back">
        <i
          class="bi bi-chevron-left"
          style="font-size: 1.2rem; color: #000"
        ></i>
      </div>
      <!-- ^ Back icon to return to ScenicSpotDetail page ^ -->

      <div class="title">
        <h3>Choose Travel Date</h3>
      </div>
    </div>

    <div class="choose-date">
      <form>

        <!-- Travel date input -->
        <div class="mb-3">
          <label for="traveldate" class="form-label">Travel Date</label>
          <div class="input-group">
            <input
              v-model="sendInfo.date"
              :min="minDate"
              type="date"
              class="form-control"
              id="traveldate"
              placeholder="please choose date"
            />
            <div class="input-group-text" id="btnGroupAddon">
              <i class="bi bi-calendar2-range"></i>
            </div>
          </div>
        </div>
        <!-- ^ Travel date input ^ -->

        <!-- Outbound time input -->
        <div class="mb-3">
          <label for="outbound" class="form-label">Outbound</label>
          <div class="input-group">
            <input
              min=""
              v-model="sendInfo.time"
              type="time"
              class="form-control"
              id="outbound"
              placeholder="please choose date"
            />
            <div class="input-group-text" id="btnGroupAddon">
              <i class="bi bi-calendar2-range"></i>
            </div>
          </div>
        </div>
        <!-- ^ Outbound time input ^ -->

      </form>
    </div>

    <!-- Counter -->
    <div class="set-user-count">
      <div>Student</div>
      <div class="counter">
        <div class="input-group">

          <!-- Minus button -->
          <span class="input-group-btn">
            <button @click="sub" class="btn btn-light" type="button">-</button>
          </span>
          <!-- ^ Minus button ^ -->

          <!-- Counter number -->
          <input
            v-model="sendInfo.num"
            type="number"
            style="text-align: center; border: none"
            class="form-control"
            :disabled ="validated ? disable :''"
          />
          <!-- ^ Counter number ^ -->

          <!-- Plus button -->
          <span class="input-group-btn">
            <button
              @click="plus"
              class="btn btn-light"
              type="button"
            >
              +
            </button>
          </span>
          <!-- ^ Plus button ^ -->

        </div>
      </div>
    </div>
    <!-- ^ Counter ^ -->

    <!-- Confirm button -->
    <div class="confirm">
      <button type="button" class="btn btn-primary submit" @click="confirmDate">
        Confirm
      </button>
    </div>
    <!-- ^ Confirm button ^ -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChooseDate",
  data() {
    return {
      sendInfo: {
        num: 1,
        date: "",
        time: "",
      },
    };
  },
  methods: {
    // Counter
    sub() {
      if (this.sendInfo.num == 1) return;
      this.sendInfo.num -= 1;
    },
    plus() {
      if (this.sendInfo.num == 5) return;
      this.sendInfo.num += 1;
    },
    // ^ Counter ^
    confirmDate() {
      //Axios http request to /api/timetable
      //Post request for bus timetable
      //According to the selected day, time, and castle
      axios
        .post("http://localhost:3001/api/timetable", {
          day: this.sendInfo.date,
          time: this.sendInfo.time,
          castle: this.$store.getters.getScenicInfo.scenic_name,
        })
        .then((response) => {
          this.$store.commit("setBusQueryInfo", response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Alert message if Travel Date is left blank
      if (this.sendInfo.date == "") {
        return alert("Travel date cannot be blank")
      }
      // ^ Alert message if Travel Date is left blank ^
      // Alert message if Outbound is left blank
      if (this.sendInfo.time == "") {
        return alert("Travel time cannot be empty")
      }
      // ^ Alert message if Outbound is left blank ^

      // Transfer data to store folder
      this.$store.commit("setTimeInfo", this.sendInfo);
      this.$router.push({
        path: "/choose_ticket",
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    minDate() {
      let da = new Date();
      // Determine if month is less than or equal to 9 or more than 9
      let month =
        da.getMonth() + 1 <= 9 ? "0" + (da.getMonth() + 1) : da.getMonth() + 1;
      return `${da.getFullYear()}-${month}-${da.getDate()}`;
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
.choose-date {
  margin: 2rem 1rem 1rem 1rem;
  text-align: left;
}

.set-user-count {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.counter {
  width: 10rem;
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
