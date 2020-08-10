<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link"><img :src="item.image"/></a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
// vant引入安装轮播图
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  name: "Swipe",
  props: {
    banners: Array
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
