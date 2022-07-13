<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="navbar" title="登录" @click-left="clickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form calss="formuse" @submit="login">
      <van-field
        v-model="username"
        name="mobile"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="password"
        type="text"
        name="code"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button class="codeBtn" type="default" size="small"
            >获取验证码</van-button
          ></template
        >
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clickLeft() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.username, this.password)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: aliceblue;
  }
  .van-icon-cross {
    color: aliceblue;
  }
}
// 图标手机

// :deep(.van-field__control) {
//   flex: 20;
// }
// :deep(.van-field__left-icon) {
//   flex: 1;
// }

.toutiao-shouji:before {
  font-size: 38px;
}
.toutiao-yanzhengma:before {
  font-size: 38px;
}
.codeBtn {
  width: 185px;
  background-color: #ccc;
  color: aliceblue;
  border-radius: 25px;
}
</style>
