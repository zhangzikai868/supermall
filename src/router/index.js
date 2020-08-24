import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 解决由于vue-router版本太新重复点击会报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 导入大的视图组件
const Home = () => import("views/home/Home.vue");
const Category = () => import("views/category/Category.vue");
const Cart = () => import("views/cart/Cart.vue");
const Profile = () => import("views/profile/Profile.vue");

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/category",
      component: Category
    },
    {
      path: "/cart",
      component: Cart
    },
    {
      path: "/profile",
      component: Profile
    }
  ]
});
