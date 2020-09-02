<template>
  <div class="goods-item" @click="itemClick">
    <!-- 小商品列表的图片 -->
    <img :src="showImage" @load="imgload" />
    <div class="goods-info">
      <!-- 商品列表的标题 -->
      <p>{{ goodsItem.title }}</p>
      <!-- 商品列表的价格和收藏 -->
      <span class="price">{{ goodsItem.price }}</span>
      <span class="cfav">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imgload() {
      if (this.$route.path.indexOf("/home")) {
        this.$bus.$emit("homeItemImageLoad");
      } else if (this.$route.path.indexOf("/detail")) {
        this.$bus.$emit("detailItemImageLoad");
      }
    },
    itemClick() {
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.goodsItem.iid
        }
      });
    }
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .cfav {
  position: relative;
}
.goods-info .cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
