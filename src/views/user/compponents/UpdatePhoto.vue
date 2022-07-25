<template>
  <div class="update-avatar">
    <img :src="img" ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user.js'
export default {
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 1 / 1, // 默认比例
      preview: '.previewImg', // 预览视图
      guides: false, // 裁剪框的虚线(九宫格)
      autoCropArea: 0.3, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
      // movable: false, // 是否允许移动图片
      dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
      movable: true, // 是否允许移动剪裁框
      resizable: true, // 是否允许改变裁剪框的大小
      scalable: false, // 是否可以缩放图片
      zoomable: true, // 是否允许缩放图片大小
      mouseWheelZoom: false, // 是否允许通过鼠标滚轮来缩放图片
      touchDragZoom: false, // 是否允许通过触摸移动来缩放图片
      rotatable: true // 是否允许旋转图片
    })
  },
  methods: {
    confirm() {
      const formData = new FormData()
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        formData.append('photo', blob)
        const { data } = await updateUserAvatar(blob)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-avatar', data.data.photo)
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
