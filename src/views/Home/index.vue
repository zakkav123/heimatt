<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round to="/search"><van-icon name="search" />搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 更多按钮 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <span class="toutiao toutiao-gengduo" @click="showFn"></span>
    <Popup
      ref="popup"
      :channel="channelList"
      :channelAll="newChannelAllList"
      @delMyChannelfn="deleteChannelList"
      @change-channel="changeChannel"
      @add-channel="addChannel"
    ></Popup>
  </div>
</template>

<script>
import {
  getChannels,
  getAllChannels,
  getMyChannels,
  setMyChannels,
  delAllChannels
} from '@/api'

import ArticleList from './compents/ArticleList.vue'
import Popup from './compents/Popup.vue'
export default {
  name: 'Home',

  data() {
    return {
      active: 0,
      channelList: [],
      channelAllList: []
    }
  },
  computed: {
    newChannelAllList() {
      return this.channelAllList.filter((res) => {
        return !this.channelList.find((i) => i.id === res.id)
      })
    },
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  mounted() {
    this.getChannels()
    this.getAllChannels()
  },
  components: {
    ArticleList,
    Popup
  },
  methods: {
    async getChannels() {
      try {
        const {
          data: { data }
        } = await getChannels()
        const res = getMyChannels
        console.log(res)
        this.channelList = data.channels
      } catch {
        this.$$toast.fail('网络错误')
      }
    },
    showFn() {
      this.$refs.popup.isShow = true
    },
    async getAllChannels() {
      try {
        const {
          data: { data }
        } = await getAllChannels()

        this.channelAllList = data.channels
      } catch {
        this.$$toast.fail('网络错误')
      }
    },
    async deleteChannelList(val) {
      this.channelList = this.channelList.filter((ch) => ch.id !== val)
      if (!this.isLogin) {
        setMyChannels(val)
      } else {
        try {
          await delAllChannels(val)
        } catch {
          this.$toast.fail('网络错误')
        }
      }
    },
    changeChannel(index) {
      console.log(11)
      this.active = index
    },
    addChannel(channel) {
      this.channelList.push(channel)
      console.log('6666' + channel)

      setMyChannels(channel)
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 90px;
  right: 0;
  z-index: 99;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
