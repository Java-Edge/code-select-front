<template>
    <div class="body">
        <div class="box-body">
            <a v-for="item in specialItems" :key="item.id" :href="item.sourceUrl" target="_blank" class="special-box">
                <div class="box-head">
                    <img :src="item.image"
                    class="head-img" />
                </div>
                <div class="box-bottom">
                    <div class="bottom-left">{{ item.name }}</div>
                    <div class="bottom-right">所有人可见</div>
                </div>
            </a>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import axios from 'axios';

const specialItems = ref([])
// specialItems.value = [{id: 1, sourceUrl: "baidu.com", name: "平台帮助中心", image: "https://kuangstudy.oss-cn-beijing.aliyuncs.com/bbs/2021/08/16/kuangstudy0ff38edc-4f3e-477a-9655-314a8f28d55b.jpg"}]
const getSpecialColumn = async () => {
    axios.get('/sourceCourse/listSpecialList'
      ).then(response => {
        specialItems.value = response.data.result;
        console.log(specialItems.value)
      })
};
getSpecialColumn();
</script>

<style lang="scss" scoped>

.box-body {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}
.head-img {
    width: 268px;
    height: 88px;
}
.special-box {
    background-color: white;
    width: 268px;
    height: 149px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 25px;
    text-decoration: none;
    color: #666666;
}

.special-box:hover {
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}


.box-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.bottom-left {
    font-size: 14px;
    font-weight: bold;
}

.bottom-right {
    font-size: 14px;
}</style>