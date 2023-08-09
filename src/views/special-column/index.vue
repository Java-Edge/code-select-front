<template>
    <div class="body">
        <!-- 显示专栏列表 -->
        <div class="box-body">
            <!-- 绑定每个专栏的链接 -->
            <a v-for="item in specialItems" :key="item.id" :href="item.sourceUrl" target="_blank" class="special-box">
                <div class="box-head">
                    <!-- 绑定每个专栏的图片 -->
                    <img :src="item.image" class="head-img" />
                </div>
                <div class="box-bottom">
                    <!-- 专栏名称-->
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
    axios.get('/back/sourceCourse/listSpecialList'
      ).then(response => {
        specialItems.value = response.data.result;
        // console.log(specialItems.value)
      })
};
getSpecialColumn();
</script>

<style lang="scss" scoped>

/* 设置专栏列表的宽度、间距和对齐方式 */
.box-body {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}

/* 设置专栏列表中的图片的大小 */
.head-img {
    width: 250px;
    height: 125px;
}

/* 设置专栏列表中的每个专栏的样式，包括背景颜色、高度、内边距、边框半径、对齐方式、文本颜色等 */
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

/* 设置专栏列表中的每个专栏的标题区域的样式，包括背景颜色、高度、定位、溢出、动画等 */
.box-head {
//   width: 300px;
//   height: 500px;
//   background: #333333;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    height: 150%;
    width: 25px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
    margin: auto;
    opacity: .6;
    filter: blur(6px);
    animation: move 3s infinite ease-out;
  }
}

@keyframes move {
  0% {
    transform: translate(-200px, -200px) rotate(45deg);
  }
  100% {
    transform: translate(200px, 200px) rotate(45deg);
  }
}


.box-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

/* 设置专栏列表中的每个专栏的名称和状态的样式，包括字体大小、字体粗细等 */
.bottom-left {
    font-size: 14px;
    font-weight: bold;
}

.bottom-right {
    font-size: 14px;
}</style>