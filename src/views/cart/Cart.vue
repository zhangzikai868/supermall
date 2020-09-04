<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{ length }}）</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/Navbar";
import CartList from "./childComps/CartList";
import cartBottomBar from "./childComps/CartBottomBar";

// 可以将getters里面的方法转换成计算属性
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      num: 2
    };
  },
  components: {
    NavBar,
    CartList,
    cartBottomBar
  },
  computed: {
    // 辅助函数：两种语法
    // ...mapGetters(["cartLength", "cartList"])
    // 第二种方法，另起一个名字
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
