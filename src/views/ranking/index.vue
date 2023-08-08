<template>
    <div class="body">
        <div class="ranking-body" v-for="ranking in rankings" :key="ranking.id">
            <div class="ranking-number">{{ ranking.orderVal }}</div>
            <div class="ranking-left">
                <div class="ranking-img" v-show="ranking.img != null">
                    <img src="https://pic.imgdb.cn/item/64cf41fe1ddac507ccff877a.png" />
                </div>
            </div>
            <!-- <router-link :to="`/ranking/${ranking.articleId}`" class="link-sty"> -->
            <a :href="ranking.href" target="_blank" class="link-sty">
                <div class="ranking-middle">
                    <div class="ranking-name hide-text">{{ ranking.title }}</div>
                    <div class="ranking-des hide-text">{{ ranking.des }}</div>
                    <!-- <div class="ranking-likes">浏览量 {{ ranking.pageView }}</div> -->
                </div>
            </a>
            <!-- </router-link> -->

            <div class="ranking-right">
                <div class="ranking-user-img"><img src="https://pic.imgdb.cn/item/64d1f0451ddac507ccb3ddbc.jpg" /></div>
                <div class="ranking-user-name hide-text">Java Edge</div>
                <a href="https://blog.csdn.net/qq_33589510" target="_blank"><div class="ranking-button">关注</div> </a>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios'
import {ref} from 'vue'

const rankings = ref([])
axios.get("/back/ranking/getRanking").then(res => {
  console.log('res', res.data.result)
  rankings.value = res.data.result
//   options.value = res.data.result
})
</script>

<style lang="scss" scoped>

.link-sty{
  text-decoration: none;
  color: black;
  display: block;
  width: 600px;
}
.ranking-number {
    color: #999AAA;
    font-size: 20px;
    // margin-bottom: 50px;
    margin-right: 15px;
}
.ranking-body {
    height: 67px;
    width: 876px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 10px;
}

.ranking-left {
    // background-color: yellow;
    margin: 0 auto;
}

.ranking-middle {
    // background-color: blue;
    display: flex;
    flex-direction: column;
    flex-grow: 3;
    margin-left: 15px;
    justify-content: space-between;
    height: 100%;
}


.ranking-name {
    font-size: 16px;
    font-weight: 600;
}
.ranking-img img{
    width: 107px;
    height: 60px;
    border-radius: 5px;
    // max-width: none;
    // max-height: none;
    // border-radius: 50%;
    // margin: 0 auto;
}
.ranking-des {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #777888;
    
}
.ranking-likes {
    font-size: 14px;
    color: #777888;
}
.ranking-right {
    // background-color: green;
    flex-grow: 1;
    // width: 300px;
    display: flex;
    align-items: center;
}
.ranking-right a {
    text-decoration: none;
}
.ranking-user-img img {
    width: 37px;
    height: 37px;
    border-radius: 50%;
}
.ranking-user-name {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 14px;
}

.ranking-button {
    width: 65px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #f8f8f8; /* Google蓝色 */
    color: black;
    border-radius: 13px; /* 圆角 */
    font-size: 14px;
    // padding: 10px 20px; /* 上下边距，左右边距 */
    cursor: pointer;
    border: 1px solid #ccccd8; // 先添加上 border，防止添加border抖动
}

/* 按钮悬停样式 */
.ranking-button:hover {
    border: 1px solid black;
}

/* 按钮点击样式 */
.ranking-button:active {
    background-color: #f8f8f8; /* Google更深的蓝色 */
}

// 隐藏多余文字样式
.hide-text {
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //需要显示的行数
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>