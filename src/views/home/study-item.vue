<!--
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-16 17:51:44
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-17 21:25:53
-->
<template>
    <router-link :to="`/study-detail/${item.id}`">
        <div class="course-box">
            <div class="image-container" :style="{ backgroundImage: `url(${item.img2})` }"> 
            </div>
            <p class="title ellipsis2">{{ item.description }}</p>
            <div class="bottom">
                <div class="left">
                    <span>{{ item.step }}步骤</span> ·
                    <span>{{ item.course }}门课</span>
                </div>
                <div class="right">{{ item.collect }}收藏</div>
            </div>
        </div>
    </router-link>
</template>
  
<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped lang="scss">
.course-box {
    position: relative;
    float: left;
    width: 368px;
    height: 178px;
    margin: 0 24px 24px 0;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(95,101,105,.1);
    border-radius: 8px;
    transition: all .2s;
    overflow: hidden;
}

.image-container {
    margin-bottom: 10px;
    height: 90px;
}
 .title {
    font-size: 14px;
    color: #545c63;
    line-height: 20px;
    padding: 0 8px;
    width: 368px;
    height: 40px;
    margin-bottom: 10px;
    box-sizing: border-box;
    word-break: break-all;
}
.title.ellipsis2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
 .bottom {
    margin-bottom: 10px;
    padding: 0 10px;
    font-size: 12px;
    color: #9199a1;
    display: flex;
    align-items: space-between;
    justify-content: space-between;
}

.course-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px 0 rgba(95, 101, 105, .15)
}
</style>
  