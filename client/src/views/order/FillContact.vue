<template>
  <div class="fill-contact-page">
    <div class="navgator">
      <!-- Back icon to return to ChooseTicket page -->
      <div class="back-icon" @click="back">
        <i class="bi bi-chevron-left" style="font-size: 1.2rem; color: #000"></i>
      </div>
      <!-- ^ Back icon to return to ChooseTicket page ^ -->

      <!-- Page title -->
      <div class="title">
        <h3>Fill Contact</h3>
      </div>
      <!-- ^ Page title ^ -->

    </div>
    <div class="fill-contact">
      <form @submit.prevent="confirmContact">

        <!-- Enter name -->
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input v-model="userInfo.name" type="text" class="form-control" id="name" required placeholder="please input name" />
        </div>
        <!-- ^ Enter name ^ -->

        <!-- Enter email -->
        <div class="mb-3">
          <label for="Email" class="form-label">Email</label>
          <div>
            <input v-model="userInfo.email" type="email" class="form-control" id="Email" required placeholder="please input email" />
          </div>
        </div>
        <!-- Enter email -->
        
        <!-- Re-enter email -->
        <div class="mb-3">
          <label for="confrimemail" required class="form-label"> Confrim Email</label>
          <input v-model="userInfo.confirmEmail" type="email" class="form-control" id="confrimemail" placeholder="please input email again" />
          <p v-if="errorMsg" class="text-danger">The email addresses you entered do not match</p>
        </div>
        <!-- ^ Re-enter email ^ -->

        <!-- Confirm button -->
        <div class="confirm">
          <button type="submit" class="btn btn-primary d-block submit">Confirm</button>
        </div>
        <!-- ^ Confirm button ^ -->

      </form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "FillContact",
  data () {
    return {
      errorMsg: false,
      userInfo: {
        name: '',
        email: '',
        confirmEmail: ''
      }
    }
  },
  methods: {
    confirmContact () {
      axios.post("http://localhost:3001/api/addCustomer", {
          "name": this.userInfo.name,
          "email": this.userInfo.confirmEmail
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.log(error)
        })

      if (this.userInfo.email != this.userInfo.confirmEmail) {
        this.errorMsg = true
        return
      }
      this.errorMsg = false
      this.$store.commit('setUserInfo', this.userInfo)
      this.$router.push({
        path: "/checkout"
      });
    },
    back () {
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

/* Entire form containing all inputs (Name, Email and Re-enter email) */
.fill-contact {
  margin: 2rem 1rem 1rem 1rem;
  text-align: left;
}
/* ^ Entire form containing all inputs (Name, Email and Re-enter email) ^ */

/* ORDER REVIEW button */
/* Div containing button */
.confirm {
  margin-top: 2rem;
  width: 100%;
}
/* ^ Div containing button ^ */
/* button */
.submit {
  width: 100%;
  height: 3rem;
  border-radius: 0.6rem;
}
/* ^ button ^ */
/* ^ ORDER REVIEW button ^ */
</style>