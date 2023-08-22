<template>
    <div class="project-detail">
        <div class="project-title">
            {{ project.title }}
        </div>
        <div class="project-des">
            <div class="left-border">项目简介</div>
            <div class="project-content">{{ project.des }}</div>
        </div>
        <div class="architecture-img">
            <div class="left-border">架构图</div>
            <div class="archi-img">
                <!-- <img src="https://pic.imgdb.cn/item/64cf41fe1ddac507ccff877a.png" /> -->
                <img :src="project.architectureImg
                " />
            </div>
        </div>
        <div class="will-learn">
            <div class="left-border">通过本项目你将学到</div>
            <div class="project-content">
                {{ project.willLearn }}
            </div>
        </div>
        <div class="project-highlight">
            <div class="left-border">项目亮点</div>
            <div class="project-content">
                {{ project.highlight }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import axios from 'axios';
import { useRoute } from 'vue-router'
const route = useRoute()
const project = ref({})
const projectId = route.params.id
const getProjectDetail = async () => {
    axios.get(`/back/project/getById/${projectId}`).then(res=>{
        console.log(res)
        project.value = res.data.result
    })
};
getProjectDetail();
</script>
<style lang="scss" scoped>
.project-detail {
    margin: 0 auto;
    width: 80%;
    margin-top: 25px;
}
.project-title {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    // background-color: #0d1633;
    height: 125px;
    line-height: 125px;
    color: black;
    // background: url("../../assets/350.jpg") no-repeat;
    // background-size: cover;
}
.left-border {
    border-left: 5px solid #FF6A6A;
    // background-image: linear-gradient(to bottom, white, pink);
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
}
.project-content {
    line-height: 30px;
}
.archi-img {
    display: flex;
    // justify-content: space-around;
}

</style>