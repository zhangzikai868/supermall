<template>
  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
    :stop-propagation="false"
  >
    <van-swipe-item
      v-for="(item, index) in topImages"
      :key="index"
      class="detailswipe"
    >
      <img :src="item" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
// vant轮播图
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  name: "DetailSwipe",
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    topImages: Array
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
.detailswipe {
  height: 300px;
  overflow: hidden;
}
</style>
