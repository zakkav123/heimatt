<template>
  <div>
    <van-nav-bar class="navbar" title="个人信息">
      <template #left>
        <van-icon name="arrow-left" @click="leftClickFn" />
      </template>
    </van-nav-bar>

    <!-- 头像遮罩层 -->
    <!-- 上传文件 -->
    <input type="file" hidden ref="inputFile" @change="inputChange" />
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avatar" fit="cover" round :src="usersInfo.photo" />
    </van-cell>
    <!-- 编辑头像弹层 -->
    <van-popup
      v-model="isShowUpdateAvatar"
      style="height: 100%"
      position="bottom"
    >
      <UpdatePhoto
        v-if="isShowUpdateAvatar"
        @update-avatar="usersInfo.photo = $event"
        @close="isShowUpdateAvatar = false"
        :img="img"
      ></UpdatePhoto>
    </van-popup>
    <!-- 编辑头像弹层 -->
    <!-- 头像遮罩层 -->

    <van-cell
      title="昵称"
      is-link
      :value="usersInfo.name"
      @click="isshows = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="usersInfo.gender == 0 ? '男' : '女'"
      @click="isshow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="usersInfo.birthday"
      @click="show = true"
    />

    <!-- 弹出层 -->

    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="changeBirthday"
        @cancel="show = false"
      />
    </van-popup>
    <van-popup v-model="isshow" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @confirm="changeSex"
        @cancel="isshow = false"
      />
    </van-popup>
    <van-popup v-model="isshows" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="昵称"
        left-text="取消"
        right-text="确认"
        @click-left="isshows = false"
        @click-right="changeUserNames"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
import { changeName, getUserInfos } from '@/api/user'
import UpdatePhoto from './compponents/UpdatePhoto.vue'
import dayjs from '@/utils/datjs'
export default {
  created() {
    this.getUserInfos()
  },
  data() {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2000, 0, 17),
      usersInfo: {},
      show: false,
      isshow: false,
      isshows: false,
      isShowPhoto: false,
      photo: '',
      isSex: '',
      message: '',
      img: '',
      columns: ['男', '女'],
      isShowUpdateAvatar: false
    }
  },
  components: {
    UpdatePhoto
  },
  methods: {
    leftClickFn() {
      this.$router.back()
    },
    onAgefirm() {},
    // 更改生日
    async changeBirthday(val) {
      try {
        val = dayjs(this.currentDate).format('YYYY-MM-DD')

        this.usersInfo.birthday = val
        await changeName({
          birthday: val
        })

        this.$toast.fail('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    },
    // 更改性别
    async changeSex(val) {
      try {
        if (val === '男') {
          this.isSex = 0
        } else {
          this.isSex = 1
        }
        this.usersInfo.gender = val
        await changeName({
          gender: this.isSex
        })
        this.$toast.fail('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    },
    // 更改昵称
    async changeUserNames() {
      try {
        if (this.message === '') {
          return this.$toast.fail('请输入姓名')
        }
        this.usersInfo.name = this.message
        await changeName({
          name: this.message
        })
        this.isshows = false
        this.$toast.fail('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    },
    // 渲染列表
    async getUserInfos() {
      const res = await getUserInfos()

      this.usersInfo = res.data.data
    },
    // touxiang
    inputChange() {
      // 获取文件对象
      // 获取上传文件
      const file = this.$refs.inputFile.files[0]
      console.log(file)
      this.img = window.URL.createObjectURL(file)
      this.isShowUpdateAvatar = true
      this.$refs.inputFile.value = ''
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
.avatar {
  width: 60px;
  height: 60px;
}
</style>
