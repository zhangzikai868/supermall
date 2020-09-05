<template>
  <div class="account">
    <div class="account-item">
      <div class="number"><span class="balance">2.23</span>元</div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">3</span>个</div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number"><span class="balance">117</span>分</div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account"
};
</script>

<style scoped>
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
  border-right: 1px solid rgb(241, 241, 241);
}
.account-item:last-child {
  border: none;
}
.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>
