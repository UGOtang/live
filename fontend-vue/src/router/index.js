import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home";
import MyRoom from "../views/MyRoom";
import MyInfo from "../views/MyInfo";
import MySecret from "../views/MySecret";
import liveRoom from "../views/liveRoom";
import CheckPay from "../views/CheckPay";
import ChangeAvatar from "../views/ChangeAvatar";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/myroom',
    name:"MyRoom",
    component:MyRoom
  },
  {
    path:'/myinfo',
    name:"Myroom",
    component:MyInfo
  },
  {
    path:"/mysecret",
    name:"MySecret",
    component:MySecret
  },
  {
    path:"/liveRoom/:id",
    name:"LiveRoom",
    component:liveRoom
  },
  {
    path:"/checkPay",
    name:"checkPay",
    component:CheckPay
  },
  {
    path:"/changeAvatar",
    name:"changeAvatar",
    component:ChangeAvatar
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
