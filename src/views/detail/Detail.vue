<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swipe :topImages="topImages"></detail-swipe>
  </div>
</template>

<script>
// 导航栏组件
import DetailNavBar from "./childComps/DetailNavBar";
// 轮播图组件
import DetailSwipe from "components/vant/DetailSwipe";
// 网络请求
import { getDatail } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    };
  },
  created() {
    // 1、保存传入的iid
    this.iid = this.$route.params.iid;
    // 2、根据iid请求对应的数据
    getDatail(this.iid).then(res => {
      // 1、获取顶部轮播数据
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
    });
    console.log(this.topImages);
  },
  components: {
    DetailNavBar,
    DetailSwipe
  }
};
</script>

<style scoped></style>
