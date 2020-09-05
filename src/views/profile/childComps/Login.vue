<template>
  <div id="login">
    <div class="via">
      <img src="~assets/img/profile/via.jpg" alt="" />
    </div>
    <div class="login">
      <div class="name">暴躁大叔</div>
      <div class="tel"><i></i>13273002516</div>
    </div>
    <div class="right">></div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped>
#login {
  height: 80px;
  display: flex;
  color: #fff;
  background-color: var(--color-tint);
}
.via {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  left: 20px;
  top: 5px;
}
img {
  width: 100%;
  height: 100%;
}
.login {
  position: relative;
  top: 13px;
  left: 35px;
}
.tel {
  margin-top: 5px;
}
.right {
  position: relative;
  top: 25px;
  right: -185px;
}
</style>
