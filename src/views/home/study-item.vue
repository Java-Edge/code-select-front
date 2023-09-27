<!--
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-07-16 17:51:44
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-07-17 21:25:53
-->
<template>
    <router-link :to="`/course/${course.id}`">
        <div class="course-box">
            <div class="image-container" :style="{ backgroundImage: `url(${course.image})` }">
            </div>
            <p class="title ellipsis2">{{ course.desc }}从Python入门/统计学基础到工业级量化交易策略实战，能力逐步提升，让你成为职业的量化交易开发工程师，进军前景可观的金融高薪领域。</p>
            <div class="bottom">
                <div class="left">
                    <span>4步骤</span> ·
                    <span>4门课</span>
                </div>
                <div class="right">150收藏</div>
            </div>
        </div>
    </router-link>
</template>
  
<script>
export default {
    props: {
        course: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped lang="scss">
.course-details a:nth-child(4n) {
    .course-box {
        margin-right: 0px;
    }
}

.course-box {
    display: flex;
    flex-direction: column;
    width: 368px;
    height: 200px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 6px 10px 0 rgba(95, 101, 105, .15);
    line-height: 30px;
    margin: 0 42px 24px 0;
}

.image-container {
    overflow: hidden;
    margin-bottom: 10px;
    height: 140px;
    max-height: 200px;
    margin-bottom: 8px;
    border-radius: 8px 8px 0 0;
    object-fit: contain;
}
 .title {
    font-size: 14px;
    color: #545c63;
    line-height: 20px;
    padding: 0 8px;
    width: 368px;
    height: 50px;
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
  