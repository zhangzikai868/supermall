<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :stop-propagation="false">
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad" />
      </a>
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
  name: "Swipe",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banners: Array,
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("imgSwipeLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
