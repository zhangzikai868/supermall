<template>
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="titleItemClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/Navbar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
      this.$emit("titleItemClick", index);
    },
    backClick() {
      this.$router.back();
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.title .title-item {
  flex: 1;
  font-size: 14px;
  text-align: center;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>
