<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextpage"
      success-text="刷新成功"
    >
      <van-list @load="loadNextpage" :immediate-check="loding">
        <ArticleItem
          v-for="(item, index) in articlList"
          :key="index"
          :list="item"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articlList: [],
      pre_timestamp: '',
      loding: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getArticleList()
  },
  mounted() {},

  methods: {
    async getArticleList() {
      try {
        const res = await getArticleList(this.id, +new Date())
        console.log(res)
        this.articlList = res.data.data.results
        this.pre_timestamp = res.data.data.pre_timestamp
      } catch {
        alert('获取失败')
      }
    },
    async loadNextpage() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)

        if (this.refreshing) {
          this.articlList.unshift(...data.data.results)
        } else {
          this.articlList.push(...data.data.results)
        }

        this.pre_timestamp = data.data.pre_timestamp
      } catch {
        this.error = true
      } finally {
        this.refreshing = false
        this.loding = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
