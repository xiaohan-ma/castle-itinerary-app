import { createStore } from "vuex";
import VueXAlong from "vuex-along";
import scenic_lists from "./scenic_lists";

const moduleA = {
  state: {
    a1: "a1",
    a2: "a2",
  },
};

export default createStore({
  state: {
    // castle list
    scenic_lists,
    // castle detail
    scenic: false,
    // Time of tickets
    timeInfo: false,
    // User information
    userInfo: false,
    // reference number
    orderNumber: "",
    // Bus query info
    busQuery: [],
    busJourneyCost: "",
    orderQuery: [],
  },
  mutations: {
    setScenic(state, payload) {
      state.scenic = payload;
    },
    setTimeInfo(state, payload) {
      state.timeInfo = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setOrderNumber(state, payload) {
      state.orderNumber = payload;
    },
    setBusQueryInfo(state, payload) {
      state.busQuery = payload;
    },
    setOrderDetailInfo(state, payload) {
      state.orderQuery = payload;
    },
    setBusJourneyCost(state, payload) {
      state.busJourneyCost = payload;
    },
  },

  getters: {
    getBusQueryInfo(state) {
      return state.busQuery;
    },
    getOrderQueryInfo(state) {
      return state.orderQuery;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getScenicInfo(state) {
      return state.scenic;
    },
    getTimeInfo(state) {
      return state.timeInfo;
    },
    getOrderNumber(state) {
      return state.orderNumber;
    },
    getBusJourneyCost(state) {
      return state.busJourneyCost;
    },
  },
  modules: {
    ma: moduleA,
  },
  //Cache state data to storage
  plugins: [VueXAlong()],
  //Full parameter configuration (sessionStorage data recovery priority is higher than localStorage)
  /* plugins: [VueXAlong({
     // Set the saved collection name to avoid multi project data conflict under the same site
     name: 'my-app-VueXAlong',
     //Filter ma the data and store other data in localStorage
     local: {
         list: ['ma'],//Attribute name or module name to listen to
         isFilter: true,//Filter instead of save
     },
     //Save ma's a1 data to sessionStorage
     session: {
         list: ['ma.a1'],
         isFilter: false,
     },
     //Save using sessionStorage only
     //justSession: true,
 })] */
  actions: {},
});
