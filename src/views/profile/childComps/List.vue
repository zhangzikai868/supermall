<template>
  <div class="llist">
    <ul>
      <li v-for="(item, index) in list" :key="index" class="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.item {
  border-bottom: 1px solid rgb(241, 241, 241);
  margin-left: 10px;
  padding: 13px;
}
</style>
