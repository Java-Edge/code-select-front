<template>
    <div class="container">
        <ul class="select-ul">
            <li class="selectTab" @mouseover="selectStyle(item)" :class="{ active: item.id === currentId }"
                v-for="item in menuData" :key="item.id">
                <a>
                    {{ item.name }}
                </a>
            </li>
        </ul>
        <div class="content">
            <div class="fade-in-animation" v-if="currentId === 1">
                我是面试
            </div>
            <div class="fade-in-animation" v-if="currentId === 2">
                我是求职题库
            </div>
            <div class="fade-in-animation" v-if="currentId === 3">
                我是热招职位
            </div>
            <div class="fade-in-animation" v-if="currentId === 4">
                <div class="jobHurt display-flex">
                    <a class="jobHurt-item display-flex">
                        <div class="item-left">
                            <div class="item-left-top">查薪资比OFFER</div>
                            <div class="item-left-bottom">专属offer报告，行情早知道</div>
                        </div>
                        <img src="@/assets/images/job/1.png" class="item-right" />
                    </a>
                    <a class="jobHurt-item display-flex">
                        <div class="item-left">
                            <div class="item-left-top">内推广场</div>
                            <div class="item-left-bottom">大厂牛友帮你内推</div>
                        </div>
                        <img src="@/assets/images/job/2.png" class="item-right" />
                    </a>
                    <div class="jobHurt-item display-flex">
                        <div class="item-left">
                            <div class="item-left-top">求职课程</div>
                            <div class="item-left-bottom">90+自研精品课免费学</div>
                        </div>
                        <img src="@/assets/images/job/3.png" class="item-right" />
                    </div>
                    <a class="jobHurt-item display-flex">
                        <div class="item-left">
                            <div class="item-left-top">职业规划</div>
                            <div class="item-left-bottom">大数据分析校友就业方向</div>
                        </div>
                        <img src="@/assets/images/job/4.png" class="item-right" />
                    </a>
                    <a class="jobHurt-item display-flex">
                        <div class="item-left">
                            <div class="item-left-top">简历互评</div>
                            <div class="item-left-bottom">匿名互助点评，顺利过筛选</div>
                        </div>
                        <img src="@/assets/images/job/5.png" class="item-right" />
                    </a>
                    <a class="jobHurt-item display-flex">
                        <div class="item-left">
                            <div class="item-left-top">牛客职播</div>
                            <div class="item-left-bottom">名企空中宣讲会</div>
                        </div>
                        <img src="@/assets/images/job/6.png" class="item-right" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const menuData = [{ id: 1, name: '面试经验' }, { id: 2, name: '求职题库' }, { id: 3, name: '热招职位' }, { id: 4, name: '求职助手' }]
const currentId = ref(1)
const selectStyle = (item) => {
    currentId.value = item.id
}
</script>

<style lang="scss" scoped>
.container {
    background: url(@/assets/images/job/background.png);
    width: 100%;
    border-radius: 10px;
    display: flex;
}

.select-ul {
    width: 140px;

}

.selectTab {
    width: 140px;
    height: 68px;
    line-height: 68px;
    font-size: 18px;
    text-align: center;
    color: rgba(153, 153, 153, 1);
    position: relative;
}

.selectTab>a {
    display: block;
    background: #fff;
}

.select-ul .active>a {
    background: transparent !important;
    color: #32ca99;
    border-bottom-left-radius: 12px;
}

.select-ul .active::before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 16px;
    content: '';
    width: 6px;
    height: 18px;
    border-radius: 5px;
    background-color: #32ca99;
}

.content {
    flex: 1;
}

.fade-in-animation {
    animation: fade-in-animation .4s ease 80ms 1 normal both;
    opacity: 0;
}

.jobHurt {
    padding-left: 30px;
    padding-top: 30px;
    flex-wrap: wrap;

    .jobHurt-item {
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 8px;
        color: rgba(51, 51, 51, 1);
        cursor: pointer;
        flex-shrink: 0;
        height: 100px;
        margin-right: 12px;
        position: relative;
        transition-duration: .3s;
        box-sizing: border-box;
        width: 220px;
        margin-bottom: 20px;
    }
    .item-left{
        width: 150px;
    }
    .item-left-bottom {
        font-size: 12px;
        margin-top: 12px;
    }

    .item-right  {
        height: 50px;
        width: 50px;
    }
}

@keyframes fade-in-animation {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>