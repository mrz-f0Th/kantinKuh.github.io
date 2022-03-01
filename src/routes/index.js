import { createWebHistory, createRouter } from 'vue-router';

// layout
import DashboardManager from "../components/layout/DashboardManager.vue";
import User from "../components/layout/DashboardUser.vue"
import DashboardKasir from "../components/layout/DashboardKasir.vue"
import DashboardKoki from "../components/layout/DashboardKoki.vue"

// manager
import Home from "../views/manager/Home.vue"
import ProdukList from "../views/manager/ProdukList.vue"
import PostProduk from "../components/PostProduk.vue"

// user
import LoginUser from "../views/user/Form.vue"
import UserHome from "../views/user/Home.vue"
import UserMenu from "../views/user/Menu.vue"
import MenuId from "../views/user/MenuId.vue"
import Keranjang from "../views/user/keranjang.vue"
import Transaksi from "../views/user/Transaksi.vue"

// kasir 
import KasirHome from "../views/kasir/Home.vue"
import KasirDetail from "../views/kasir/DetailTransaksi.vue"

// koki 
import KokiHome from "../views/koki/HomeKoki.vue"

const routes = [

  // Manager Routes
  {
    path: '/',
    name: "DashboardManager",
    component: DashboardManager, 
    meta: {
      requiredAuthorization: true
    },
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

  // user routes
  {
    path: '/user',
    name: "DashboardUser",
    component: User,
    meta: {
      requiredAuthorization: true
    },
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
        path: 'menu/:id',
        name: "MenuId",
        component: MenuId
      },
      {
        path: 'keranjang',
        name: "Keranjang",
        component: Keranjang
      }, 
      {
        path: 'transaksi',
        name: "Transaksi",
        component: Transaksi
      }

    ]
  },
  {
    path: '/user-login',
    name: "LoginUser",
    component: LoginUser,
    meta: {
      requiredAuthorization: false
    },
  },

  // kasir routes
  {
    path : '/kasir',
    name: "DashboardKasir",
    component: DashboardKasir,
    meta: {
      requiredAuthorization: true
    },
    children: [
      {
        path: '',
        name: "KasirHome",
        component: KasirHome
      },
      {
        path: ':id',
        name: 'KasirDetail',
        component: KasirDetail
      }
    ]
  },

  // koki routes 
  {
    path: '/koki',
    name: "Koki",
    component: DashboardKoki,
    meta: {
      requiredAuthorization: false
    },
    children: [
      {
        path: '',
        name: "kokiHome",
        component: KokiHome
      }
    ]
  }
]

router.beforeEach((to, from, next) => {

})

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router;
