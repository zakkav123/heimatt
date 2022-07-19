<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '95%' }"
    closeable
    round
    close-icon-position="top-left"
  >
    <!-- 弹出层内容 -->
    <div class="popup-main">
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isIdeta = !isIdeta"
            >{{ isIdeta ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道内容 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :class="{ actived: item.name == '推荐' }"
            v-for="(item, index) in channel"
            :key="item.id"
            :text="item.name"
            @click="delMyChannel(item, index)"
          >
            <template #icon>
              <van-icon
                name="cross"
                v-show="isIdeta && item.name !== '推荐'"
              ></van-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="(item, index) in channelAll"
            :key="index"
            :text="item.name"
            icon="plus"
            @click="addChannel(item)"
          ></van-grid-item
        ></van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'EditChannelPopup',

  data() {
    return {
      isShow: false,
      isIdeta: false
    }
  },
  props: {
    channel: {
      type: Array
    },
    channelAll: {
      type: Array
    }
  },
  mounted() {},

  methods: {
    delMyChannel(val, index) {
      if (this.isIdeta && val.name !== '推荐') {
        this.$emit('delMyChannelfn', val.id)
      }
      if (!this.isIdeta) {
        this.isShow = false
        this.$emit('change-channel', index)
      }
    },
    addChannel(channel) {
      this.$emit('add-channel', { ...channel })
    }
  }
}
</script>

<style lang="less" scoped>
.actived {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popup-main {
  padding-top: 100px;
  .van-cell {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    color: #f68c8c;
    padding: 0 30px;
    font-size: 28px;
    height: 48px;
    border: 1px solid #f68c8c;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.38rem;
          font-size: 28px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
