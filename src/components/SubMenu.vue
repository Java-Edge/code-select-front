<template>
    <div class="sub-container">
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
                <div class="display-flex">
                    <div class="ml-20">
                        <div class="sub-menu-header display-flex item-center">
                            <div class="display-flex item-center">
                                <div class="label">面试合集</div>
                                <div style="margin-left: 12px;">
                                    <el-select v-model="parentCategory" placeholder="请选择">
                                        <el-option label="前端开发" value="1"></el-option>
                                        <el-option label="Java" value="2"></el-option>
                                        <el-option label="大数据" value="2"></el-option>
                                    </el-select>
                                </div>

                            </div>
                            <div class="more-link tw-ml-83">
                                查看更多
                            </div>
                        </div>
                        <div class="result display-flex item-center">
                            <div class="job-card display-flex item-center">
                                <img src="@/assets/images/job/java.png" class="job-pic" />
                                <div class="tw-ml-2">
                                    <div class="tw-font-normal tw-text-xl-pure">Java工程师</div>
                                    <div class="display-flex item-center tw-mt-3 tw-text-sm-pure">
                                        <div><span class="tw-text-green-500 tw-w-3">177</span><span
                                                class="tw-ml-1 tw-mr-3 tw-text-gray-600">家公司</span></div>
                                        <div><span class="tw-text-green-500 tw-w-3">3134</span><span
                                                class="tw-ml-1 tw-text-gray-600">篇面经</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="job-card display-flex item-center">
                                <img src="@/assets/images/job/java.png" class="job-pic" />
                                <div class="tw-ml-2">
                                    <div class="tw-font-normal tw-text-xl-pure">前端工程师</div>
                                    <div class="display-flex item-center tw-mt-3 tw-text-sm-pure">
                                        <div><span class="tw-text-green-500 tw-w-3">177</span><span
                                                class="tw-ml-1 tw-mr-3 tw-text-gray-600">家公司</span></div>
                                        <div><span class="tw-text-green-500 tw-w-3">3134</span><span
                                                class="tw-ml-1 tw-text-gray-600">篇面经</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="job-card display-flex item-center">
                                <img src="@/assets/images/job/java.png" class="job-pic" />
                                <div class="tw-ml-2">
                                    <div class="tw-font-normal tw-text-xl-pure">Go工程师</div>
                                    <div class="display-flex item-center tw-mt-3 tw-text-sm-pure">
                                        <div><span class="tw-text-green-500 tw-w-3">177</span><span
                                                class="tw-ml-1 tw-mr-3 tw-text-gray-600">家公司</span></div>
                                        <div><span class="tw-text-green-500 tw-w-3">3134</span><span
                                                class="tw-ml-1 tw-text-gray-600">篇面经</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="job-card display-flex item-center">
                                <img src="@/assets/images/job/java.png" class="job-pic" />
                                <div class="tw-ml-2">
                                    <div class="tw-font-normal tw-text-xl-pure">大数据工程师</div>
                                    <div class="display-flex item-center tw-mt-3 tw-text-sm-pure">
                                        <div><span class="tw-text-green-500 tw-w-3">177</span><span
                                                class="tw-ml-1 tw-mr-3 tw-text-gray-600">家公司</span></div>
                                        <div><span class="tw-text-green-500 tw-w-3">3134</span><span
                                                class="tw-ml-1 tw-text-gray-600">篇面经</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="job-card display-flex item-center">
                                <img src="@/assets/images/job/java.png" class="job-pic" />
                                <div class="tw-ml-2">
                                    <div class="tw-font-normal tw-text-xl-pure">Java工程师</div>
                                    <div class="display-flex item-center tw-mt-3 tw-text-sm-pure">
                                        <div><span class="tw-text-green-500 tw-w-3">177</span><span
                                                class="tw-ml-1 tw-mr-3 tw-text-gray-600">家公司</span></div>
                                        <div><span class="tw-text-green-500 tw-w-3">3134</span><span
                                                class="tw-ml-1 tw-text-gray-600">篇面经</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="job-card display-flex item-center">
                                <img src="@/assets/images/job/java.png" class="job-pic" />
                                <div class="tw-ml-2">
                                    <div class="tw-font-normal tw-text-xl-pure">Java工程师</div>
                                    <div class="display-flex item-center tw-mt-3 tw-text-sm-pure">
                                        <div><span class="tw-text-green-500 tw-w-3">177</span><span
                                                class="tw-ml-1 tw-mr-3 tw-text-gray-600">家公司</span></div>
                                        <div><span class="tw-text-green-500 tw-w-3">3134</span><span
                                                class="tw-ml-1 tw-text-gray-600">篇面经</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="interview-right">
                        <a href="/#/article-interview">
                            <div class="display-flex entrance mt-24">
                                <div class="entrance-left">
                                    <div class="entrance-title">公司面经</div>
                                    <div class="entrance-sub-title">名企面试，经验汇总</div>
<!--                                  添加点击公司面经，跳转链接-->

                                </div>
                                <img src="@/assets/images/job/interview.png" class="entrance-img" />
                            </div>
                        </a>
                        <a>
                            <div class="display-flex entrance mt-16">
                                <div class="entrance-left">
                                    <div class="entrance-title">AI模拟面试</div>
                                    <div class="entrance-sub-title">真是面试体验，快速补齐短板</div>
                                </div>
                                <img src="@/assets/images/job/AI.png" class="entrance-img" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="fade-in-animation" v-if="currentId === 2">
                <div class="display-flex">
                    <div class="ml-20">
                        <div class="sub-menu-header display-flex item-center">
                            <div class="display-flex item-center">
                                <div class="label">在线编程</div>
                                <div style="margin-left: 12px;">
                                    <el-select v-model="parentCategory" placeholder="请选择">
                                        <el-option label="前端开发" value="1"></el-option>
                                        <el-option label="后端" value="2"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="more-link tw-ml-46">
                                查看更多
                            </div>
                        </div>
                        <div class="card-warpper display-flex item-center">
                            <div class="card display-flex item-center">
                                <div class="tw-ml-2">
                                    <div
                                        class="tw-mt-4 tw-w-33 tw-whitespace-nowrap tw-overflow-hidden tw-overflow-ellipsis">
                                        非技术快速入门</div>
                                    <div class="tw-mt-3 tw-text-sm-pure tw-text-gray-600">
                                        <span class="tw-mr-1">已做</span>
                                        <span>0</span>/39
                                        <span class="tw-ml-1">题</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card display-flex item-center">
                                <div class="tw-ml-2">
                                    <div
                                        class="tw-mt-4 tw-w-33 tw-whitespace-nowrap tw-overflow-hidden tw-overflow-ellipsis">
                                        非技术快速入门</div>
                                    <div class="tw-mt-3 tw-text-sm-pure tw-text-gray-600">
                                        <span class="tw-mr-1">已做</span>
                                        <span>0</span>/39
                                        <span class="tw-ml-1">题</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card display-flex item-center">
                                <div class="tw-ml-2">
                                    <div
                                        class="tw-mt-4 tw-w-33 tw-whitespace-nowrap tw-overflow-hidden tw-overflow-ellipsis">
                                        非技术快速入门</div>
                                    <div class="tw-mt-3 tw-text-sm-pure tw-text-gray-600">
                                        <span class="tw-mr-1">已做</span>
                                        <span>0</span>/39
                                        <span class="tw-ml-1">题</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card display-flex item-center">
                                <div class="tw-ml-2">
                                    <div
                                        class="tw-mt-4 tw-w-33 tw-whitespace-nowrap tw-overflow-hidden tw-overflow-ellipsis">
                                        非技术快速入门</div>
                                    <div class="tw-mt-3 tw-text-sm-pure tw-text-gray-600">
                                        <span class="tw-mr-1">已做</span>
                                        <span>0</span>/39
                                        <span class="tw-ml-1">题</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card display-flex item-center">
                                <div class="tw-ml-2">
                                    <div
                                        class="tw-mt-4 tw-w-33 tw-whitespace-nowrap tw-overflow-hidden tw-overflow-ellipsis">
                                        非技术快速入门</div>
                                    <div class="tw-mt-3 tw-text-sm-pure tw-text-gray-600">
                                        <span class="tw-mr-1">已做</span>
                                        <span>0</span>/39
                                        <span class="tw-ml-1">题</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card display-flex item-center">
                                <div class="tw-ml-2">
                                    <div
                                        class="tw-mt-4 tw-w-33 tw-whitespace-nowrap tw-overflow-hidden tw-overflow-ellipsis">
                                        非技术快速入门</div>
                                    <div class="tw-mt-3 tw-text-sm-pure tw-text-gray-600">
                                        <span class="tw-mr-1">已做</span>
                                        <span>0</span>/39
                                        <span class="tw-ml-1">题</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="interview-center">
                        <a>
                            <div class="entrance-title">专项练习</div>
                            <div class="entrance-sub-title">分知识点巩固知识</div>
                            <img src="@/assets/images/job/exercise.png" class="practice-img" />
                        </a>

                    </div>
                    <div class="interview-right">
                        <a>
                            <div class="display-flex entrance mt-24">
                                <div class="entrance-left">
                                    <div class="entrance-title">公司真题</div>
                                    <div class="entrance-sub-title">汇集历年名企笔试真题</div>
                                </div>
                                <img src="@/assets/images/job/real.png" class="entrance-img" />
                            </div>
                        </a>
                        <a>
                            <div class="display-flex entrance mt-16">
                                <div class="entrance-left">
                                    <div class="entrance-title">面试题库</div>
                                    <div class="entrance-sub-title">主流行业面试真题</div>
                                </div>
                                <img src="@/assets/images/job/question.png" class="entrance-img" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="fade-in-animation" v-if="currentId === 3">
                <div class="display-flex">
                    <div class="ml-20">
                        <div class="sub-menu-header display-flex item-center">
                            <div class="display-flex item-center">
                                <div class="label">热招职位</div>
                            </div>
                            <div class="more tw-ml-83">
                                查看更多
                            </div>
                        </div>


                    </div>
                    <div class="company-right">
                        <a class="company">
                            <div class="entrance mt-24">
                                <div class="entrance-title">热招公司</div>
                                <div class="entrance-sub-title">千家公司正在热招中</div>
                                <img src="@/assets/images/job/company.png" class="company-image"/>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
            <div class="fade-in-animation" v-if="currentId === 4">
                <div class="jobHurt display-flex">
<!--                    <a class="jobHurt-item display-flex">-->
<!--                        <div class="item-left">-->
<!--                            <div class="item-left-top">查薪资比OFFER</div>-->
<!--                            <div class="item-left-bottom">专属offer报告，行情早知道</div>-->
<!--                        </div>-->
<!--                        <img src="@/assets/images/job/1.png" class="item-right" />-->
<!--                    </a>-->
                    <a class="jobHurt-item display-flex" href="/#/inner-recommend">
                        <div class="item-left">
                            <div class="item-left-top">内推天地</div>
                            <div class="item-left-bottom">大厂群友帮你内推</div>
                        </div>
                        <img src="@/assets/images/job/2.png" class="item-right" />
                    </a>
                    <div class="jobHurt-item display-flex" href="/#/index">
                        <div class="item-left">
                            <div class="item-left-top">求职课程</div>
                            <div class="item-left-bottom">全网精品课免费学</div>
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
                            <div class="item-left-top">简历点评</div>
                            <div class="item-left-bottom">助力筛选</div>
                        </div>
                        <img src="@/assets/images/job/5.png" class="item-right" />
                    </a>
<!--                    <a class="jobHurt-item display-flex">-->
<!--                        <div class="item-left">-->
<!--                            <div class="item-left-top">职播</div>-->
<!--                            <div class="item-left-bottom">名企空中宣讲会</div>-->
<!--                        </div>-->
<!--                        <img src="@/assets/images/job/6.png" class="item-right" />-->
<!--                    </a>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// const menuData = [{ id: 1, name: '面试经验' }, { id: 2, name: '求职题库' }, { id: 3, name: '热招职位' }, { id: 4, name: '求职助手' }]
const menuData = [{id: 1, name: '面试经验'}, {id: 4, name: '求职助手'}];
const currentId = ref(1)
const parentCategory = ref('')
const selectStyle = (item) => {
    currentId.value = item.id
}
</script>

<style lang="scss" scoped>
.sub-container {
    background: url(@/assets/images/job/background.png);
    width: 100%;
    border-radius: 10px;
    display: flex;
    margin: 20px auto;
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

.sub-menu-header {
    margin-top: 20px;
}

.label {
    font-size: 18px;
    line-height: 18px;
    color: rgba(51, 51, 51, 1);
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

    .item-left {
        width: 150px;
    }

    .item-left-bottom {
        font-size: 12px;
        margin-top: 12px;
    }

    .item-right {
        height: 50px;
        width: 50px;
    }
}

.more-link {
    color: rgba(50, 202, 153);
    cursor: pointer;
    font-size: 14px;
}
.more{
    color: rgba(50, 202, 153);
    cursor: pointer;
    font-size: 14px;
    margin-left: 662px;
}

.result {
    height: 160px;
    width: 730px;
    flex-wrap: wrap;
    align-content: space-between;
    margin-top: 20px;
}

.job-card {
    background-color: #fff;
    box-shadow: 0 0 12px 0 rgba(7, 218, 122, .12);
    height: 74px;
    width: 234px;
}

.job-pic {
    border-radius: 50%;
    height: 42px;
    width: 42px;
}

.entrance {
    background: #fff linear-gradient(294deg, hsla(0, 0%, 100%, .5), #f7fffd);
    width: 220px;
    transition-duration: .3s;
    height: 100px;
    padding-top: 32px;
    border-radius: 8px;
    justify-content: space-between;
    box-sizing: border-box;
}

.entrance-title {
    margin-left: 20px;
    font-weight: 500;
}

.entrance-sub-title {
    margin-left: 20px;
    color: rgba(153, 153, 153, 1);
    font-size: 14px;
    line-height: 18px;
    margin-top: 8px;
}

.entrance-img {
    width: 50px;
    height: 50px;
}

.interview-right a:hover .entrance-title,.interview-center  a:hover .entrance-title  {
    color: #32ca99;
}

.card-warpper {
    height: 184px;
    width: 600px;
    flex-wrap: wrap;
    align-content: space-between;
    margin-top: 20px;
}

.card {
    height: 74px;
    width: 172px;
    background: #fff;
    padding-left: 16px;
}

.interview-center {
    position: relative;
    background: #fff linear-gradient(310deg, hsla(0, 0%, 100%, .5), #f7fffd 100%, #f7fffd 0);
    margin-right: 10px;
    width: 152px;
    height: 216px;
    padding-top: 32px;
}

.practice-img {
    width: 130px;
    height: 130px;
    position: absolute;
    bottom: 0;
    left: 22px;
}
.company-right{
    position: relative;
    margin-left: 20px;
   .entrance{
    background: #fff linear-gradient(317deg,hsla(0,0%,100%,.5),#eefffb);
    width: 166px;
    height: 216px;
   }
}
.company-image{
    position: absolute;
    top: 120px;
    right: 10px;
    width: 130px;
    height: 130px;
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
<style lang="scss" scoped>
::v-deep .el-select {
    height: 32px;

    .el-input {
        .el-input__inner {
            height: 32px;
        }

        .el-input__prefix,
        .el-input__suffix {
            height: 32px;
        }

        /* 下面设置右侧按钮居中 */
        .el-input__suffix {
            top: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            align-content: flex-start;
        }

        .el-input__icon {
            line-height: 34px;
        }
    }

}</style>
