<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <span>首页</span>
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <span>视频</span>
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <span>问答</span>
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>{{ !!this.$store.state.user.token ? '我的' : '未登录' }}</span>
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.van-tabbar-item .toutiao {
  font-size: 40px;
}
</style>
