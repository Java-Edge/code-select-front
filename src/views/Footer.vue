<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>{{ aboutUs.name }}</h4>
        <ul>
          <li v-for="item in aboutUs.list" :key="item.id"><a :href="item.value" target="_blank">{{ item.label }}</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>{{ platformService.name }}</h4>
        <ul>
          <li  v-for="item in platformService.list" :key="item.id"><a :href="item.value" target="_blank">{{ item.label }}</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>{{ friendlyLink.name }}</h4>
        <ul>
          <li  v-for="item in friendlyLink.list" :key="item.id"><a :href="item.value" target="_blank">{{ item.label }}</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>{{ contactInfo.name }}</h4>
        <p v-for="item in contactInfo.list" :key="item.id">{{ item.label }}</p>
      </div>
    </div>
  </footer>
</template>
  
<script setup>
// export default {
//   name: 'Footer',
//   data() {
//     return {
//       websiteName: 'Your Website Name',
//       currentYear: new Date().getFullYear(),
//       contactPhone: '+123-456-7890',
//     };
//   },
// };
import {ref} from 'vue'
import axios from 'axios'
const aboutUs = ref({})
const platformService = ref({})
const friendlyLink = ref({})
const contactInfo = ref({})
const getDictionaryData = () => {
  axios.get('/back/dictionary/list?typeKey=about_us').then(res => {
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    console.log("新查询的数据", res.data.result)
    aboutUs.value = res.data.result
  })
  axios.get('/back/dictionary/list?typeKey=platform_service').then(res => {
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    console.log("新查询的数据", res.data.result)
    platformService.value = res.data.result
  })
  axios.get('/back/dictionary/list?typeKey=friendly_link').then(res => {
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    console.log("新查询的数据", res.data.result)
    friendlyLink.value = res.data.result
  })
  axios.get('/back/dictionary/list?typeKey=contact_info').then(res => {
    // console.log(res)
    /**
     * 每次查出来之后，拼接上原来的数据即可
     */
    console.log("新查询的数据", res.data.result)
    contactInfo.value = res.data.result
  })
}
getDictionaryData()
// axios.get('/back/dictionary/list?typekey=platform_service').then(res => {
//     // console.log(res)
//     /**
//      * 每次查出来之后，拼接上原来的数据即可
//      */
//     console.log("新查询的数据", res.data.result)
//     articleData.value = articleData.value.concat(res.data.result.records)
//     total.value = res.data.result.total
// })
// axios.get('/back/dictionary/list?typekey=friendly_link').then(res => {
//     // console.log(res)
//     /**
//      * 每次查出来之后，拼接上原来的数据即可
//      */
//     console.log("新查询的数据", res.data.result)
//     articleData.value = articleData.value.concat(res.data.result.records)
//     total.value = res.data.result.total
// })
// axios.get('/back/dictionary/list?typekey=contact_info').then(res => {
//     // console.log(res)
//     /**
//      * 每次查出来之后，拼接上原来的数据即可
//      */
//     console.log("新查询的数据", res.data.result)
//     articleData.value = articleData.value.concat(res.data.result.records)
//     total.value = res.data.result.total
// })
</script>
  
<style scoped>
/* 添加样式 */
.footer {
  background-color: #333;
  color: #fff;
  padding: 30px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-around;
}

.footer-section {
  margin: 0 40px;
}

.footer h4 {
  margin-bottom: 20px;
  font-size: 20px;
}

.footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer li {
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
}

.footer li:hover {
  color: #ffd04b;
}

.footer p {
  margin-bottom: 10px;
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.footer a:hover {
  color: #ffd04b;
}
</style>
