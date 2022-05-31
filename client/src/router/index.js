import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import ScenicSpotList from '../views/home/ScenicSpotList'
import ScenicDetail from '../views/detail/ScenicSpotDetail'
import ChooseDate from '../views/order/ChooseDate'
import ChooseTicket from '../views/order/ChooseTicket'
import FillContact from '../views/order/FillContact'
import CheckoutOrder from '../views/order/CheckoutOrder'
import OrderResult from '../views/order/OrderResult'
const routes = [{
  path: '/',
  name: 'ScenicSpotList',
  component: ScenicSpotList,
  meta: {
    title: "Toon Tours n' Travel"
  }
},
{
  path: '/detail',
  name: 'ScenicDetail',
  component: ScenicDetail,
  meta: {
    title: ""
  }
},
{
  path: '/choose_date',
  name: 'ChooseDate',
  component: ChooseDate
},
{
  path: '/choose_ticket',
  name: 'ChooseTicket',
  component: ChooseTicket
},
{
  path: '/fill_contact',
  name: 'FillContact',
  component: FillContact
},
{
  path: '/checkout',
  name: 'CheckoutOrder',
  component: CheckoutOrder
},
{
  path: '/order_res',
  name: 'OrderResult',
  component: OrderResult
},
{
  path: '/query',
  name: 'OrderQuery',
  component: () => require('@/views/query/OrderQuery')
},
{
  path: '/queryResult',
  name: 'QueryResult',
  component: () => require('@/views/query/QueryResult')
},

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router