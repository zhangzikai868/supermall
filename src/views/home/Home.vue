<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <tab-control
      :titles="['新款', '流行', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabFixed"
    ></tab-control>
    <!-- 使用BScroll滚动需要设置高度（样式content） -->
    <b-scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <swipe :banners="banners" @imgSwipeLoad="imgSwipeLoad"></swipe>
      <recommend-view :recommends="recommends"></recommend-view>
      <ranking></ranking>
      <tab-control
        :titles="['新款', '流行', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </b-scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 顶部导航
import NavBar from "components/common/navbar/Navbar";
// Swipe轮播图
import Swipe from "components/vant/Swipe";
// RecommendView组件（轮播图下方的组件）
import RecommendView from "./childComps/RecommendView";
// 本周流行Ranking组件
import Ranking from "./childComps/Ranking";
// TabControl组件（新款、流行、精选组件）
import TabControl from "components/content/tabControl/TabControl";
// 商品列表数据
import GoodsList from "components/content/goods/GoodsList";
// BScroll封装
import BScroll from "components/common/scroll/Scroll";
// 引入封装的网络模块（home）
import { getHomeMultidata, getHomeGoods } from "network/home";

// 混入
// 回到顶部
import { backTopMixin } from "common/mixin";

export default {
  name: "Home",
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      savey: 0
    };
  },
  // 获取首页多个数据
  created() {
    // 1、请求多个数据
    this.getHomeMultidata();

    // 2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听item中图片加载完成
    this.$bus.$on("temImageLoad", () => {
      this.$refs.scroll.scroll.refresh();
    });
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // 1、判断backTop是否显示
      this.isShowBackTop = -position.y > 1500;
      // 2、决定TabControl是否吸顶（position: fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.finishPullUp();
    },
    imgSwipeLoad() {
      // 获取tabControl的位置
      // 所有的组件都有一个属性叫$el，用于获取组件中元素的
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 把数据保存到res变量中否则会被销毁
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    }
  },
  components: {
    NavBar,
    Swipe,
    RecommendView,
    Ranking,
    TabControl,
    GoodsList,
    BScroll
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.savey, 0);
    this.$refs.scroll.scroll.refresh();
  },
  deactivated() {
    this.savey = this.$refs.scroll.scroll.y;
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.home-nav {
  background: var(--color-tint);
  color: white;
}
.content {
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.tabControl {
  position: relative;
  /* z-index只对定位元素有效果 */
  z-index: 999;
}
</style>
