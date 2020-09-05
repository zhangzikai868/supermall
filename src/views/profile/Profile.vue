<template>
  <div class="profile">
    <nav-bar class="nav-bar"><div slot="center">个人中心</div></nav-bar>
    <login></login>
    <account class="account"></account>
    <list :list="message1" class="message"></list>
    <list :list="message2"></list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/Navbar";
import Login from "./childComps/Login";
import Account from "./childComps/Account";
import List from "./childComps/List";

export default {
  name: "Profile",
  data() {
    return {
      message1: ["我的消息", "积分商城", "会员卡"],
      message2: ["我的购物车", "下载购物APP"]
    };
  },
  components: {
    NavBar,
    Login,
    Account,
    List
  }
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.account {
  border-bottom: 10px solid rgb(241, 241, 241);
}
.message {
  border-bottom: 10px solid rgb(241, 241, 241);
}
</style>
