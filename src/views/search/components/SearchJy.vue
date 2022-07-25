<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="item"
      :title="item"
      icon="search"
      @click="goSearch(index)"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchJy } from '@/api'
export default {
  props: {
    keyWord: {
      type: String,
      required: true
    }
  },
  watch: {
    keyWord: {
      immediate: true,
      handler() {
        this.getSearchJy()
      }
    }
  },
  computed: {
    highlightData() {
      const reg = new RegExp(this.keyWord, 'ig')

      return this.getSearchJyList.map((str) =>
        str.replace(reg, (val) => `<span style="color: red">${val}</span>`)
      )
    }
  },
  data() {
    return {
      getSearchJyList: []
    }
  },
  methods: {
    async getSearchJy() {
      const res = await getSearchJy(this.keyWord)
      console.log(res)
      this.getSearchJyList = res.data.data.options
    },
    goSearch(index) {
      console.log(index)
      this.$emit('searchVal', this.getSearchJyList[index])
    }
  }
}
</script>

<style scoped lang="less">
.red {
  color: red;
}
</style>
