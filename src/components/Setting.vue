<template>
  <div>
    <div class="togle">
      <div class="basicinfo" @click="tobasicinfo">基本信息</div>
      <div class="accountsecurity" @click="toaccountsecurity">账号安全</div>
      <div class="line"></div>
    </div>
    <router-view :itemList='itemList'></router-view>
  </div>

</template>

<script>
import { BASE_URL } from "../api/config";
import HttpManager from "../api/index";
import { mapGetters } from "vuex";

export default {
  props: ["itemList"],
  methods: {
    tobasicinfo() {
      this.$router.push(`/userpage/${this.$route.params.myuid}/setting/basicinfo`).catch((err) => {});
    },
    toaccountsecurity() {
      this.$router.push(`/userpage/${this.$route.params.myuid}/setting/accountsecurity`).catch((err) => {});
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/setting.scss";
</style>