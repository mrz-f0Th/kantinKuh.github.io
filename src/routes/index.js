import { createWebHistory, createRouter } from "vue-router";

// Login
import Login from "../views/LoginView.vue";

// layout
import DashboardManager from "../components/layout/DashboardManager.vue";
import User from "../components/layout/DashboardUser.vue";
import DashboardKasir from "../components/layout/DashboardKasir.vue";
import DashboardKoki from "../components/layout/DashboardKoki.vue";

// manager
import Home from "../views/manager/Home.vue";
import ProdukList from "../views/manager/ProdukList.vue";
import PostProduk from "../components/PostProduk.vue";
import EditProduk from "../views/manager/EditProduk.vue";

// user
import LoginUser from "../views/user/Form.vue";
import UserHome from "../views/user/Home.vue";
import UserMenu from "../views/user/Menu.vue";
import MenuId from "../views/user/MenuId.vue";
import Keranjang from "../views/user/keranjang.vue";
import Transaksi from "../views/user/Transaksi.vue";

// kasir
import KasirHome from "../views/kasir/Home.vue";
import KasirDetail from "../views/kasir/DetailTransaksi.vue";

// koki
import KokiHome from "../views/koki/HomeKoki.vue";

const routes = [
  // Manager Routes
  {
    path: "/",
    name: "DashboardManager",
    component: DashboardManager,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Home,
      },
      {
        path: "produk",
        name: "Produk",
        component: ProdukList,
      },
      {
        path: "post-produk",
        name: "PostProduk",
        component: PostProduk,
      },
      {
        path: "edit-produk/:id",
        name: "EditProduk",
        component: EditProduk,
      },
    ],
    meta: {
      role: "admin",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  // user routes
  {
    path: "/user",
    name: "DashboardUser",
    component: User,
    children: [
      {
        path: "",
        name: "UserHome",
        component: UserHome,
      },
      {
        path: "menu",
        name: "UserMenu",
        component: UserMenu,
      },
      {
        path: "keranjang",
        name: "Keranjang",
        component: Keranjang,
      },
      {
        path: "transaksi",
        name: "Transaksi",
        component: Transaksi,
      },
    ],
  },
  {
    path: "/menu/:id",
    name: "MenuId",
    component: MenuId,
  },
  {
    path: "/user-login/:id",
    name: "LoginUser",
    component: LoginUser,
  },

  // kasir routes
  {
    path: "/kasir",
    name: "DashboardKasir",
    component: DashboardKasir,
    meta: {
      requiredAuthorization: true,
    },
    children: [
      {
        path: "",
        name: "KasirHome",
        component: KasirHome,
      },
      {
        path: ":id",
        name: "KasirDetail",
        component: KasirDetail,
      },
    ],
  },

  // koki routes
  {
    path: "/koki",
    name: "Koki",
    component: DashboardKoki,
    meta: {
      requiredAuthorization: false,
    },
    children: [
      {
        path: "",
        name: "kokiHome",
        component: KokiHome,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass:
    "md:bg-gray-900 active:bg-gray-800 text-success bg-base-200 md:text-accent-content",
});

router.beforeEach((to, from, next) => {
  const privatePages = ["/", "/produk"];
  const authRequired = privatePages.includes(to.path);
  const loggedIn = localStorage.getItem("auth");
  const me = localStorage.getItem("me");

  if (authRequired && !loggedIn) {
    console.log(to.meta);
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const privatePages = [
    "/user",
    "/user/menu",
    "/user/transaksi",
    "/user/keranjang",
  ];
  const authRequired = privatePages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/user-login");
  } else {
    next();
  }
});

export default router;
