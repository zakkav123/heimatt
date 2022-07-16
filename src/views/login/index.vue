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
    <van-form calss="formuse" @submit="login" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="用户名"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="password"
        type="text"
        name="code"
        placeholder="验证码"
        :rules="rules.code"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <template #button>
          <van-count-down
            :time="time"
            v-if="isCuntTime"
            @finish="isCuntTime = false"
            format="ss"
          />
          <van-button
            class="codeBtn"
            type="default"
            size="small"
            v-else
            @click.prevent="isCuntTimeFn"
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
import { rules } from './rules'
import { login, sendCode } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      mobile: '',
      password: '',
      rules,
      time: 60000,
      isCuntTime: false
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
      this.$toast.loading({
        message: '憋急奥...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.password)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/my')
        this.$toast.success('来啦嗨嗨！')
      } catch (err) {
        const res = err.response.status
        let messag = '服务器飞走了'
        if (res === 400) {
          messag = err.response.data.message
        }
        this.$toast.fail(messag)
        // switch (res) {
        //   case 400:
        //     this.$toast.fail(err.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('服务器裂开了')
        //     break
        //   default:
        //     this.$toast.fail('服务器裂开了')
        //     break
        // }
      }
    },
    async isCuntTimeFn() {
      try {
        await this.$refs.form.validate(rules.mobile)
        await sendCode(this.mobile)
        this.isCuntTime = true
      } catch (err) {
        console.log(err)
        if (!err.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
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
