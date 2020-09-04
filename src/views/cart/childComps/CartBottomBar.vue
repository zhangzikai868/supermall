<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-bottom
        class="check-bottom"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-bottom>
      <span>全选</span>
    </div>
    <div class="price">合计:￥{{ totalPrice }}</div>
    <div class="go">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckBottom from "./CheckButton";
export default {
  name: "CartBottomBar",
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    }
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  },
  components: {
    CheckBottom
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  line-height: 40px;
  background-color: var(--color-high-text);
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  display: flex;
}
.check-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-bottom {
  margin-right: 5px;
}
.price {
  margin-left: 60px;
  flex: 1;
}
.go {
  width: 90px;
  color: #fff;
  text-align: center;
  background-color: #f40;
}
</style>
