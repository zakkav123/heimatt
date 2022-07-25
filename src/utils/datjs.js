import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const zh = require('dayjs/locale/zh-cn')
dayjs.locale(zh)

export default dayjs
