<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="tabcontrolitemclick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabcontrolitemclick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  background-color: #ffffff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
  padding: 0 2px 3px;
}
</style>
