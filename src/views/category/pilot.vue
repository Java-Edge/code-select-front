<template>
  <div class="content-class">
    <div v-for="(value, key) in pilotList" :key="key"><categry-components :list="value" :title="key"></categry-components></div>
  </div>
</template>

<script setup>
import CategryComponents from "@/views/category/categryComponents.vue";

import axios from 'axios'
import { ref } from "vue";
let pilotList = ref({})
const mediaList = ref([])
const toolList = ref([])
const gptList = ref([])

const getPilotType = () => {
  axios.get('/back/pilot/getList').then(res => {
    console.log('res', res.data.result)
    mediaList.value = res.data.result['媒体']
    toolList.value = res.data.result['工具']
    gptList.value = res.data.result['ChatGPT']
    // pilotList.value = res.data.result
    // console.log("11", pilotList.value)
    // Object.entries(res.data.result).forEach(item => console.log(item[0], item[1]))
    // Object.entries(res.data.result).forEach(item => pilotList.set(item[0], item[1]))
    pilotList.value = res.data.result
    console.log("p", pilotList)

    // for((k, v) in pilotList.value) {
    //   console.log(k, v)
    // }
    // pilotList.value.push()
    // console.log(response)
  }).catch(err => {
    console.log('err', err)
  })
}
getPilotType()
// getPilotType()
// export default {
//   name: "pilotPage",
//   components: {
//     CategryComponents,
//   },
//   created() {
//     this.getPilotType()
//   },
//   data() {
//     return {
//       mediaList: [
//         {
//           link: "https://www.bilibili.com/",
//           img: "https://www.bilibili.com/favicon.ico",
//           name: "哔哩哔哩"
//         },
//         {
//           link: "https://blog.csdn.net/qq_33589510",
//           img: "https://www.csdn.net/favicon.ico",
//           name: "CSDN"
//         },
//         {
//           link: "https://www.zhihu.com/people/11111112j",
//           img: "https://www.zhihu.com/favicon.ico",
//           name: "知乎"
//         },
//         {
//           link: "https://wx.zsxq.com/dweb2/index/group/88855184142452",
//           img: "https://wx.zsxq.com/favicon.ico",
//           name: "知识星球"
//         },
//         {
//           link: "https://www.jianshu.com/u/32c7d1f520c2",
//           img: "https://www.jianshu.com/favicon.ico",
//           name: "简书"
//         },
//         {
//           link: "https://mp.weixin.qq.com/",
//           img: "https://mp.weixin.qq.com/favicon.ico",
//           name: "微信公众平台"
//         }
//       ],
//       toolList: [
//         {
//           link: "https://www.planttext.com/",
//           img: "https://www.planttext.com/favicon.ico",
//           name: "plantUML Editor"
//         },
//         {
//           link: "https://www.pptx.cn/",
//           img: "https://www.pptx.cn//favicon.ico",
//           name: "PPT世界"
//         },
//       ],
//       gptList: [
//         {
//           link: "https://open.ai/",
//           img: "https://open-image-zipzap-ai.oss-ap-southeast-1.aliyuncs.com/prompt/logo/20230620-175220.png",
//           name: "ChatGPT"
//         },        {
//           link: "https://claude.ai/",
//           img: "https://claude.ai/favicon.ico",
//           name: "Claude2"
//         },
//         {
//           link: "https://bard.google.com/",
//           img: "https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_2bdb7df2724e450073ede.gif",
//           name: "Google Bard"
//         },
//         {
//           link: "https://yiyan.baidu.com/",
//           img: "https://nlp-eb.cdn.bcebos.com/logo/logoErnieBot.png",
//           name: "百度 文心一言"
//         },
//         {
//           link: "https://bard.google.com/",
//           img: "https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_2bdb7df2724e450073ede.gif",
//           name: "阿里 通义千问"
//         },
//         {
//           link: "https://moss.fastnlp.top/",
//           img: "https://moss.fastnlp.top/moss/assets/assets/images/logo.webp",
//           name: "复旦 MOSS"
//         },
//         {
//           link: "https://labs.openai.com/",
//           img: "https://labs.openai.com/favicon.ico",
//           name: "DALL-E"
//         },
//       ],
//     }
//   },
//   methods: {
//     getPilotType() {
//       this.$axios.get('/back/pilot/getList').then(res => {
//         console.log(res)
//         // console.log(response)
//       })
//     }
//   },
// }
</script>

<style>
.category-com {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>