<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar"></detail-nav-bar>
    <b-scroll class="content" ref="scroll">
      <detail-swipe :topImages="topImages"></detail-swipe>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </b-scroll>
  </div>
</template>

<script>
// 导航栏组件
import DetailNavBar from "./childComps/DetailNavBar";
// 轮播图组件
import DetailSwipe from "components/vant/DetailSwipe";
// 商品信息组件
import DetailBaseInfo from "./childComps/DetailBaseInfo";
// 商家信息组件
import DetailShopInfo from "./childComps/DetailShopInfo";
// 图片信息展示组件
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
// 参数组件
import DetailParamInfo from "./childComps/DetailParamInfo";
// 用户评论组件

// 推荐组件

// 引入之前封装好的batter-scroll组件
import BScroll from "components/common/scroll/Scroll";

// 网络请求
import { getDatail, Goods, Shop, GoodsParam } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
    }
  },
  created() {
    // 1、保存传入的iid
    this.iid = this.$route.params.iid;
    // 2、根据iid请求对应的数据
    getDatail(this.iid).then(res => {
      // 1、获取顶部轮播数据
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 2、获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4、保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5、获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },
  components: {
    DetailNavBar,
    DetailSwipe,
    DetailBaseInfo,
    DetailShopInfo,
    BScroll,
    DetailGoodsInfo,
    DetailParamInfo
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: #fff;
  position: relative;
}
#detail {
  z-index: 999;
  position: relative;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
</style>
