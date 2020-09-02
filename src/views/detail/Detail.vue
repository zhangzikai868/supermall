<template>
  <div id="detail">
    <detail-nav-bar
      class="nav-bar"
      @titleItemClick="titleItemClick"
      ref="nav"
    ></detail-nav-bar>
    <b-scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swipe :top-images="topImages"></detail-swipe>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </b-scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top
      @click.native="backTopClick"
      v-show="isShowBackTop"
      class="backTop"
    ></back-top>
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
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// 推荐组件
import GoodsList from "components/content/goods/GoodsList";
// 底部加入购物车组件
import DetailBottomBar from "./childComps/DetailBottomBar";

// 引入之前封装好的batter-scroll组件
import BScroll from "components/common/scroll/Scroll";

// 混入
// 回到顶部
import { backTopMixin } from "common/mixin";

// 网络请求
import {
  getDatail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail",
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    titleItemClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 判断是否显示回到顶部按钮
      this.isShowBackTop = -position.y > 1500;

      // 1、获取Y值
      const positionY = -position.y;
      // console.log(positionY);
      // 2、positionY和主题的Y值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    }
  },
  created() {
    // 1、保存传入的iid
    this.iid = this.$route.query.iid;
    // 2、根据iid请求对应的数据
    getDatail(this.iid).then(res => {
      // 1、获取顶部轮播数据
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
      // 6、保存评论信息，有的商品没有评论做一个判断
      if (!data.rete) {
        this.commentInfo = data.rate.list[0];
      }
      // 7、请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
      /*
      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完的（目前获取的offsetTop是不包含图片的）
        // offsetTop值不对一般都是图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      });
      */
    });
  },
  components: {
    DetailNavBar,
    DetailSwipe,
    DetailBaseInfo,
    DetailShopInfo,
    BScroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
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
  overflow: hidden;
}
.content {
  height: calc(100% - 44px - 48px);
}
.backTop {
  z-index: inherit;
}
</style>
