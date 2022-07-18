<template>
  <div class="contentdiv">
    <div class="emaildiv">
      <div class="infodiv">
        <div class="emailaddress">邮箱地址</div>
        <div class="email">{{ this.item.email }}</div>
      </div>
      <div class="changeemail">修改邮箱</div>
    </div>
    <div class="passdiv">
      <div class="infodiv">
        <div class="password">密码</div>
        <div class="pass">{{ this.item.email }}</div>
      </div>
      <div class="changepass">修改密码</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemList'],
  data() {
    return {
      item: this.itemList,
    }
  },
  created() {
    this.item.email = this.item.email.substring(0, 3) + '****' + this.item.email.substring(7)
    console.log(this.item.email)
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/accountsecurity.scss';
</style>
