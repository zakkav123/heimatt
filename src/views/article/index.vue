<template>
  <div class="article-container">
    <!-- 导航栏 -->

    <!-- 头部 -->

    <van-nav-bar class="navbar" title="城市列表">
      <template #left>
        <van-icon name="arrow-left" @click="leftClickFn" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">黑马头条号</div>
          <div slot="label" class="publish-date">14小时前</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#ccc"
            round
            size="small"
            v-if="isGzShow"
            @click="followUser"
            icon="plus"
            >已关注</van-button
          >
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            v-else
            size="small"
            @click="followUser"
            icon="plus"
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleList.content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- 评论区域 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div
          class="comment"
          v-for="(item, index) in getNewConList"
          :key="index"
        >
          <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
          <div class="commentsMian">
            <p class="user-name">{{ item.aut_name }}</p>
            <p class="neiRon">{{ item.content }}</p>
            <span
              >{{ item.pubdate | tiemCeart }}
              <van-button
                size="mini"
                class="nei-button"
                round
                @click="isConner(index)"
                >回复{{ item.reply_count }}</van-button
              ></span
            >
          </div>
          <div class="dianZ">
            <van-icon
              name="good-job-o"
              color="blue"
              @click="commentsDz(index)"
              v-if="!item.is_liking"
              >{{ item.like_count }}</van-icon
            >
            <van-icon
              name="good-job-o"
              color="red"
              @click="commentsDz(index)"
              v-else
              >{{ item.like_count }}</van-icon
            >
            <!-- 遮罩层 -->
            <van-popup
              v-model="isConnershow"
              position="bottom"
              :style="{ height: '90%' }"
            >
              <componentsVus
                :itemlist="newObjcompents"
                :compentsList="compontsListcom"
              ></componentsVus>
            </van-popup>
          </div>
        </div>
      </van-list>
      <!-- 评论区域 -->
    </div>
    <!-- 回复遮罩层 -->

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="show = !show"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="getNewConList.length" color="#777" />
      <van-icon color="red" name="star-o" @click="shouClist" v-if="isScShow" />
      <van-icon name="star-o" @click="shouClist" v-else color="#777"></van-icon>
      <van-icon
        color="red"
        name="good-job-o"
        class="goodJob"
        v-if="isDzShow"
        @click="dianZGood"
      />
      <van-icon color="#777" name="good-job-o" @click="dianZGood" v-else />
      <van-icon
        name="share"
        color="#777777"
        @click="showShare = true"
      ></van-icon>
      <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
        <div class="iptComments">
          <div class="iptcimmen">
            <van-field
              class="messages"
              v-model="message"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入留言"
              show-word-limit
            />
            <van-button
              :disabled="message == ''"
              type="primary"
              @click="fbComments"
              >发布</van-button
            >
          </div>
        </div>
      </van-popup>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import {
  getNewsDetails,
  getCommentsList,
  getCommentsCommentsList,
  getLikingsList,
  getLikingsTargetList,
  getCollectionsList,
  getRemoLikingsList,
  goComments,
  commentLikingsTarget,
  commentLikings,
  userFollowings,
  userFollowingsFarget
} from '@/api/articles'
import componentsVus from './components'
export default {
  name: 'ArticleIndex',
  components: {
    componentsVus
  },
  data() {
    return {
      articleList: {},
      isLoading: true,
      show: false,
      isConnershow: false,
      isCommentsShow: false,
      isGzShow: false,
      message: '',
      getNewConList: [],
      newObjcompents: {},
      compontsListcom: [],
      NewConList: {},
      id: this.$route.params.articleId,
      isDzShow: '',
      isScShow: '',
      loading: false,
      finished: false,
      lastId: '',
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      showShare: false,
      isLikeing: false
    }
  },
  computed: {},

  created() {
    this.getNewsDetails()
    this.getCommentsList()
  },
  mounted() {},
  methods: {
    async getNewsDetails() {
      try {
        const res = await getNewsDetails(this.$route.params.articleId)
        this.articleList = res.data.data
      } catch (err) {
        // 加载失败 404
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取失败')
      }
      this.isLoading = false
    },
    async isConner(index) {
      this.isConnershow = true
      this.newObjcompents = this.getNewConList[index]
      try {
        const res = await getCommentsCommentsList(
          this.getNewConList[index].aut_id
        )
        console.log(res)
        this.compontsListcom = res.data.data.results
      } catch (err) {
        this.$toast.fail('网络状况不佳')
      }
    },
    leftClickFn() {
      this.$router.back()
    },
    async getCommentsList() {
      try {
        const res = await getCommentsList(this.$route.params.articleId)
        this.getNewConList = res.data.data.results

        this.lastId = res.data.data.last_id
        this.isLikeing = res.data.data.results.is_liking

        this.NewConList = res.data.data
        this.isDzShow = this.NewConList.is_collected
        this.isScShow = this.NewConList.is_collected
      } catch (err) {
        this.$toast.fail('网络状况不佳')
      }
    },
    async dianZGood() {
      try {
        if (this.isDzShow === 1) {
          // 取消点赞
          try {
            await getLikingsTargetList(this.id)
            this.isDzShow = false
            this.$toast.fail('取消点赞')
          } catch (err) {
            this.$toast.fail('取消失败')
          }
        } else {
          try {
            // 点赞成功
            await getLikingsList(this.id)
            this.isDzShow = 1
            this.$toast.fail('点赞成功')
          } catch (err) {
            this.$toast.fail('点赞失败')
          }
        }
      } catch {}
    },
    async shouClist() {
      if (this.isScShow) {
        // 取消收藏
        try {
          await getRemoLikingsList(this.id)
          this.isScShow = false
          this.$toast.fail('取消收藏')
        } catch (err) {
          this.$toast.fail('取消收藏失败')
        }
      } else {
        try {
          // 收藏成功
          await getCollectionsList(this.id)
          this.isScShow = true
          this.$toast.fail('收藏成功')
        } catch (err) {
          this.$toast.fail('收藏失败')
        }
      }
    },
    async fbComments() {
      try {
        await goComments(this.id, this.message)
        this.$toast.fail('评论成功')
      } catch {
        this.$toast.fail('评论失败不正当言论')
      }
    },
    // 评论的点赞
    async commentsDz(index) {
      const commentId = this.getNewConList[index].com_id
      if (this.isCommentsShow) {
        // 取消点赞
        try {
          this.getNewConList[index].like_count--
          await commentLikingsTarget(commentId)
          this.isCommentsShow = false
          this.getNewConList[index].is_liking = false
          this.$toast.fail('取消点赞')
        } catch (err) {
          this.$toast.fail('点赞失败')
        }
      } else {
        try {
          // 点赞成功
          this.getNewConList[index].like_count++
          this.getNewConList[index].is_liking = true
          await commentLikings(commentId)
          this.isCommentsShow = true
          this.$toast.fail('点赞成功')
        } catch (err) {
          this.$toast.fail('点赞失败')
        }
      }
    },
    async followUser() {
      if (this.isGzShow) {
        // 取消关注
        try {
          await userFollowingsFarget(this.articleList.aut_id)
          this.isGzShow = false
          this.$toast.fail('取消关注')
        } catch (err) {
          this.$toast.fail('取消收藏失败')
        }
      } else {
        try {
          // 关注成功
          await userFollowings(this.articleList.aut_id)
          this.isGzShow = true
          this.$toast.fail('关注成功')
        } catch (err) {
          this.$toast.fail('收藏失败')
        }
      }
    },
    // 评论的下拉事件
    async onLoad() {
      // this.lastId = this.NewConList.last_id
      const res = await getCommentsList(
        this.$route.params.articleId,
        this.lastId,
        100000
      )
      this.getNewConList.push(...res.data.data.results)
      this.lastId = res.data.data.last_id
      if (!this.last_id) {
        this.finished = true
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 18px;
  }
  .van-icon {
    color: #fff;
  }
}
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
.iptComments {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .iptcimmen {
    display: flex;
    margin-left: 45px;
    width: 666px;
    height: 200px;
  }
}
.messages {
  background-color: #f5f7f9;
}
.van-button--primary {
  height: 100%;
  background-color: #fff;
  color: #6ba3d8;
  border: #fff;
}
.comment {
  display: flex;
  width: 96%;
  padding: 15px 2% 0;
  height: 250px;
  // background-color: red;
  .commentsMian {
    flex: 1;
    padding-left: 45px;
    margin-top: -8px;
    line-height: 35px;
    .neiRon {
      font-size: 0.42667rem;
    }
    .user-name {
      font-size: 0.34667rem;
      color: #406599;
    }
    span {
      font-size: 0.25333rem;
    }
    .nei-button {
      width: 130px;
      height: 40px;
      margin-bottom: 10px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
  }
  .dianZ {
    flex: 1;
    position: relative;
    .van-icon {
      position: absolute;
      top: 0;
      right: 5px;
      font-size: 35px;
    }
  }
}
.goodJob {
  color: red;
}
.goodSC {
  color: red;
}
</style>
