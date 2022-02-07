import { createWebHistory, createRouter } from 'vue-router';

import DashboardManager from "../components/layout/DashboardManager.vue";
import Home from "../views/manager/Home.vue"
import ProdukList from "../views/manager/ProdukList.vue"
import PostProduk from "../components/PostProduk.vue"

import LoginUser from "../views/user/Form.vue"
import User from "../components/layout/DashboardUser.vue"
import UserHome from "../views/user/Home.vue"
import UserMenu from "../views/user/Menu.vue"
import PesanMenu from "../components/PesanMenu.vue"

const routes = [
  {
    path: '/',
    name: "DashboardManager",
    component: DashboardManager, 
    children: [
      {
        path: '',
        name: "Dashboard",
        component: Home
      },
      {
        path: 'produk',
        name: "Produk",
        component: ProdukList
      },
      {
        path: 'post-produk',
        name: "PostProduk",
        component: PostProduk
      },
    ]
  },
  {
    path: '/user',
    name: "DashboardUser",
    component: User,
    children: [
      {
        path: '',
        name: "UserHome",
        component: UserHome
      },
      {
        path: 'menu',
        name: "UserMenu",
        component: UserMenu,
      },
      {
        path: ':id',
        name: "PesanMenu",
        component: PesanMenu
      }

    ]
  },
  {
    path: '/user-login',
    name: "LoginUser",
    component: LoginUser
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router;
