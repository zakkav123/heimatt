<template>
  <div>
    <van-nav-bar title="暂无评论" />

    <!-- 评论 -->
    <div class="comment">
      <van-image round width="1rem" height="1rem" :src="itemlist.aut_photo" />
      <div class="commentsMian">
        <p class="user-name">{{ itemlist.aut_name }}</p>
        <p class="neiRon">{{ itemlist.content }}</p>
        <span
          >{{ itemlist.pubdate | tiemCeart }}
          <van-button
            size="mini"
            class="nei-button"
            round
            @click="isConner(index)"
            >回复{{ itemlist.reply_count }}</van-button
          ></span
        >
      </div>
      <div class="dianZ">
        <van-icon name="good-job-o" color="blue" v-if="!itemlist.is_liking">{{
          itemlist.like_count
        }}</van-icon>
        <van-icon name="good-job-o" color="red" v-else>{{
          itemlist.like_count
        }}</van-icon>
      </div>
    </div>
    <!-- 评论 -->
    <div class="boxs">
      <p>全部评论</p>
    </div>
    <div class="comment" v-for="(item, index) in compentsList" :key="index">
      <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
      <div class="commentsMian">
        <p class="user-name">{{ item.aut_name }}</p>
        <p class="neiRon">{{ item.content }}</p>
      </div>
      <div class="dianZ">
        <van-icon name="good-job-o" color="blue" v-if="!item.is_liking">{{
          item.like_count
        }}</van-icon>
        <van-icon name="good-job-o" color="red" v-else>{{
          item.like_count
        }}</van-icon>
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
    <van-tabbar>
      <van-button>评论</van-button>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: {
    itemlist: {
      type: Object
    },
    compentsList: {
      type: Array
    }
  },
  created() {
    console.log(this.itemlist)
  }
}
</script>

<style scoped lang="less">
.van-tabbar--fixed {
  bottom: 70px;
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
.boxs {
  width: 100%;
  height: 160px;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  line-height: 80px;
}
</style>
