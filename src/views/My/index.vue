<template>
  <div>
    <header>
      <div v-if="isLogin" class="user-info banner">
        <van-row></van-row>
        <van-row class="row2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              >
              </van-image>
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col class="clo2" span="12">
            <van-button class="codeBtn" type="default" size="small" to="/user"
              >编辑资料</van-button
            ></van-col
          >
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item icon="photo-o" text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="warp" @click="goLogin">
          <img src="@/assets/mobile.png" alt="" />
          <p>登录 / 注册</p>
        </div>
      </div>
    </header>
    <main>
      <van-grid clickable :column-num="2">
        <van-grid-item text="收藏" to="/" icon-color="red">
          <template #icon>
            <van-icon name="star-o" color="red" size="22.5" />
          </template>
          <template #text> <p class="caption">收 藏</p></template>
        </van-grid-item>
        <van-grid-item text="历史" url="/vant/mobile.html">
          <template #icon>
            <van-icon name="clock-o" color="orange" size="22.5" />
          </template>
          <template #text>
            <p class="caption">历 史</p></template
          ></van-grid-item
        >
      </van-grid>
      <!-- 两条杠 -->
      <div class="mod">
        <div class="header" :index="4" />
        <div class="submain">
          <div class="view">
            <span class="title" :index="3">消息通知 </span>
            <img class="icon" :index="1" src="@/assets/img_0.png" />
          </div>
          <img class="divider" :index="6" src="@/assets/img_1.png" />
          <div class="view1">
            <span class="caption" :index="2">小智同学 </span>
            <img class="icon1" :index="0" src="@/assets/img_0.png" />
          </div>
        </div>

        <div class="main" :index="5">
          <van-button block class="loginBtn" @click="remToken" v-if="isLogin"
            >退出登录</van-button
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    remToken() {
      this.$dialog
        .confirm({
          title: '黑马TT',
          message: '确定退出奥'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
          this.$toast('废物！')
        })
    },
    goLogin() {
      this.$router.push('/login')
    },
    async getUserInfo() {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
        } catch (error) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 400px;
  background: url(@/assets/banner.png) no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #000;
  }
  .clo2 {
    position: relative;
    .codeBtn {
      position: absolute;
      top: 35px;
      right: 0;
      width: 1.53333rem;
      height: 0.42667rem;
      background: #fff;
      border-radius: 0.21333rem;
      font-size: 0.26667rem;
      color: #666;
      padding: 0;
    }
  }
  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
main {
  .caption {
    margin-top: 16px;
    font-family: 'MicrosoftYaHei';
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    text-decoration: none;
    letter-spacing: 0.7px;
    white-space: pre;
  }
  .mod {
    display: flex;
    flex-direction: column;
    width: 750px;
    height: 692px;
  }
  .mod .header {
    background-color: rgba(245, 247, 249, 1);
    overflow: auto;
    width: 750px;
    height: 12px;
  }
  .mod .submain {
    display: flex;
    flex-direction: column;
    margin-top: 31px;
    height: 140px;
  }
  .mod .view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 27px;
  }
  .mod .title {
    font-size: 30px;
    font-weight: 400;
    font-family: 'MicrosoftYaHei';
    font-style: normal;
    line-height: 30px;
    letter-spacing: 0.75px;
    text-decoration: none;
    text-align: left;
    color: rgba(51, 51, 51, 1);
    margin-left: 13px;
    white-space: nowrap;
  }
  .mod .icon {
    align-self: center;
    width: 12px;
    height: 21px;
  }
  .mod .divider {
    width: 713px;
    height: 4px;
    margin: auto 0 0 37px;
  }
  .mod .view1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 40px 27px 0;
  }
  .mod .caption {
    font-size: 30px;
    font-weight: 400;
    font-family: 'MicrosoftYaHei';
    font-style: normal;
    line-height: 30px;
    letter-spacing: 0.75px;
    text-decoration: none;
    text-align: left;
    color: rgba(51, 51, 51, 1);
    margin-left: 11px;
    white-space: nowrap;
  }
  .mod .icon1 {
    align-self: center;
    width: 12px;
    height: 21px;
  }
  .mod .main {
    background-color: rgba(245, 247, 249, 1);
    overflow: auto;
    margin-top: 31px;
    padding-top: 8px;
    width: 750px;
    height: 478px;
    .loginBtn {
      color: red;
      font-size: 25px;
    }
  }
}

.login-register {
  display: flex;
  justify-content: center;
  align-items: center;

  .warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 10px;
    }
  }
}
</style>
