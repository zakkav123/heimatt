<template>
  <div class="page">
    <div class="container" :index="1">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @focus="onCancels"
          background="rgba(50, 149, 249, 1)"
        />
      </form>
    </div>
    <!-- <SearchHistory></SearchHistory>
    <SearchJy></SearchJy>
    <SearchResult></SearchResult> -->
    <components
      :is="computSearch"
      :keyWord="value"
      :historyList="historyList"
      @searchVal="searchValFn"
    ></components>
  </div>
</template>
<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchJy from './components/SearchJy.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  data() {
    return {
      constants: {},
      value: '',
      isShowSearch: false,
      historyList: [],
      delHistoryList: []
    }
  },
  components: {
    SearchHistory,
    SearchJy,
    SearchResult
  },
  computed: {
    computSearch() {
      if (this.value.trim() === '') {
        return 'SearchHistory'
      } else if (this.isShowSearch) {
        return 'SearchJy'
      }
      return 'SearchResult'
    }
  },
  methods: {
    onCancel() {
      this.$router.back()
    },
    onSearch() {
      this.isShowSearch = false
      this.historyList.push(this.value)
      localStorage.setItem('recordingList', JSON.stringify(this.historyList))
      console.log(this.historyList)
    },
    onCancels() {
      this.isShowSearch = true
    },
    searchValFn(val) {
      this.value = val
      this.isShowSearch = false
    }
  }
}
</script>
<style scoped lang="less">
.van-search__action {
  color: aliceblue;
}
</style>
