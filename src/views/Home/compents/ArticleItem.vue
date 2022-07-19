<template>
  <div>
    <!-- 渲染无图片的 -->
    <van-cell
      v-if="list.cover.type === 0"
      :title="list.title"
      :label="articleDesc"
    />
    <!-- 渲染一张图片的 -->
    <van-cell
      v-if="list.cover.type === 1"
      :title="list.title"
      :label="articleDesc"
    >
      <van-image width="3rem" hight="2rem" :src="list.cover.images[0]">
      </van-image>
    </van-cell>
    <!-- 算然三张图片的 -->

    <van-cell
      v-if="list.cover.type === 3"
      :title="list.title"
      :label="articleDesc"
    >
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in list.cover.images"
            :key="index"
            width="3rem"
            hight="2rem"
            :src="item"
          >
          </van-image>
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import datjs from '@/utils/datjs'
export default {
  props: {
    list: {
      type: Object
    }
  },
  computed: {
    articleDesc() {
      const art = this.list
      const time = datjs(art.pubdate).fromNow
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  }
}
</script>

<style scoped lang="less"></style>
