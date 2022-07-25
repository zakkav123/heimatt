<template>
  <div>
    <van-cell title="搜索历史">
      <template #right-icon>
        <van-icon
          name="delete-o"
          v-show="isIdetas"
          @click="historyListShow"
        ></van-icon>
      </template>
      <template #default>
        <div class="showFins" v-show="isIdeta">
          <span class="qunBsc" @click="delHistoryListAll">全部删除</span>
          <span @click="finshHistoryList">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in delLists"
      :key="index"
      :title="item"
      @click="delHistoryList(index, item)"
    >
      <template #right-icon>
        <van-icon name="cross" v-show="isIdeta" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIdeta: false,
      isIdetas: true,
      delLists: JSON.parse(localStorage.getItem('recordingList'))
    }
  },
  methods: {
    historyListShow() {
      this.isIdeta = true
      this.isIdetas = false
    },
    finshHistoryList() {
      this.isIdeta = false
      this.isIdetas = true
    },
    // 删除
    delHistoryList(index, item) {
      console.log(111)
      if (this.isIdeta) {
        this.delLists.splice(index, 1)
      } else {
        this.$emit('searchVal', this.delLists[index])
      }
    },
    delHistoryListAll() {
      this.delLists = []
    }
  }
}
</script>

<style scoped lang="less">
.qunBsc {
  margin-right: 15px;
}
</style>
