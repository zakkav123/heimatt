<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in searchResultList"
        :key="item.id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchList } from '@/api'
export default {
  props: {
    keyWord: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      searchResultList: []
    }
  },
  methods: {
    async onLoad() {
      // 1. 请求获取数据
      const { data } = await getSearchList({
        page: this.page,
        per_page: this.perPage,
        q: this.keyWord
      })

      const { results } = data.data
      this.searchResultList.push(...results)

      this.loading = false

      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    }
  }
}
</script>

<style></style>
