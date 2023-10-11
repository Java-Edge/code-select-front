<template>
    <div class="pathmain">
        <div class="banner">
            <div class="main-content content">
                <router-link to href="/study-list" target="_blank">
                    <img src="@/assets/study-route-detail.png" class="logo">
                </router-link>
                <h2>{{ roadMap.title }}</h2>
                <p>{{ roadMap.description }}</p>
                <div class="tail">
                    <span v-for="item in roadmapDetail" :key="item.id">{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div class="fixed-wrap">
            <div class=" fixed-wrap-content pt">
                <!-- 大活动倒计时 -->
                <div class="timeout-bigactivity js-timeout-bigactivity" data-endtime="" data-time="1695864152"></div>
                <div class="wrap-box">
                    <span class="jifen">积分兑换</span>
                </div>
                <div>
                    <span class="collect js-path-collect" data-name="5G时代音视频开发与视频直播技术高手之路" data-isfollow="" data-num="1203">
                        <i class="sz-star-o"></i><em class="js-collect-num">{{roadMap.collect}}</em>人收藏
                    </span>
                    <a href="javascript:void(0);" data-isshow="0" class="js-order-line orderpath">
                        积分兑换 </a>
                </div>
            </div>
        </div>
        <div class="main-content content mainbox js-comp-tab">
            <div class="routeview">
                <h2><b>路线详情：</b><span>{{roadMap.step}}步骤</span><i>·</i><span>{{roadMap.course}}门课</span></h2>
                <div class="step" v-for="item in roadmapDetail" :key="item.id">
                    <div class="title">
                        <span class="updateicon"></span>
                        <span class="txt">Step{{ item.mapOrder }}: {{ item.title }}</span>
                    </div>
                    <div class="substance">
                        <p class="brief">{{ item.des }}</p>
                        <div class="item clearfix">
                            <div class="item-desc">
                                <h3>学习目标：</h3>
                                <p class="mb24">{{ item.target }}</p>
                                <h3>课程重点：</h3>
                                <p class="targetlist" v-html="item.courseFocus"></p>
                                <div class="tag">
                                    <span data-index="0" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                                </div>
                            </div>
                            <div class="item-course">
                                <a :href="item.course.sourceUrl" target="_blank" data-name="5G时代音视频开发与视频直播技术高手之路"
                                    class="js-click-zhuge">
                                    <div :style="{ backgroundImage: `url(${item.course.image})` }"
                                        class="courseimg"></div>
                                    <div class="course-info">
                                        <h3>{{ item.course.name }}</h3>
                                        <div class="study-info">
                                            <div class="course-num">
                                                <span>入门</span>
                                                <i>·</i>
                                                <span>{{item.course.pageView}}人学习</span>
                                            </div>
                                            <div class="course-stars">
                                                <!-- <span>948 人评价</span> -->
                                            </div>
                                        </div>
                                        <div class="desc">
                                            <span>{{ item.course.description }}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
             
                <p class="explain">*说明：路线内每门课程都具有完整独立的学习价值，因此一部分知识点可能重合，选择前请知晓！</p>
            </div>
            <div class="offside">
                <!-- <div class="masterknowledge">
                    <h2>如果该路线学起来吃力，您需要掌握如下知识</h2>
                    <p class="suggestion">1、至少掌握一门开发语言基础；<br>
                        2、对Linux有一定了解。</p>
                    <a href="/class/386.html" data-id="386" data-title="Linux核心技能与应用" target="_blank"
                        class="box js-prepose-zhuge">
                        <img src="@/assets/demo/study4.jpg">
                        <div class="recommoncourse">
                            <h2 class="coursetitle">Linux核心技能与应用</h2>
                            <div class="info">
                                <span>实战</span>
                                <i>·</i>
                                <span>初级</span>
                                <i>·</i>
                                <span><i class="imv2-set-sns"></i>2005</span>
                            </div>
                        </div>
                    </a>
                    <a href="//www.imooc.com/learn/583" target="_blank" data-id="583" data-title="Linux系统管理"
                        class="box js-prepose-zhuge">
                        <img src="@/assets/demo/study6.jpg">
                        <div class="recommoncourse">
                            <h2 class="coursetitle">Linux系统管理</h2>
                            <div class="info">
                                <span>免费</span>
                                <i>·</i>
                                <span>初级</span>
                                <i>·</i>
                                <span><i class="imv2-set-sns"></i>79645</span>
                            </div>
                        </div>
                    </a>
                    <a href="//www.imooc.com/learn/537" target="_blank" data-id="537" data-title="Linux服务管理"
                        class="box js-prepose-zhuge">
                        <img src="@/assets/demo/study3.jpg">
                        <div class="recommoncourse">
                            <h2 class="coursetitle">Linux服务管理</h2>
                            <div class="info">
                                <span>免费</span>
                                <i>·</i>
                                <span>初级</span>
                                <i>·</i>
                                <span><i class="imv2-set-sns"></i>49666</span>
                            </div>
                        </div>
                    </a>
                </div> -->
                <div class="morelearnpath js-more-learnpath">
                    <h2>更多学习路线</h2>
                    <p class="mb18 moredesc">阶梯式系统化学习，有章有序，助您小步快跑</p>
                    <router-link :to="`/study-detail/${item.id}`" :data-id="item.id" data-title="移动端进阶高级工程师成长路线" target="_blank"
                        class="box js-more-zhuge" v-for="item in recomendCourses" :key="item.id">
                        <img :src="item.img">
                        <div class="recommoncourse">
                            <h2 class="moretitle">{{ item.title }}</h2>
                            <p>{{ item.description }}</p>
                            <div class="pathinfo">
                                <div class="step">
                                    <span>{{item.step}}步骤</span>
                                    <i>·</i>
                                    <span>{{item.course}}门课</span>
                                </div>
                                <div class="collectnum">{{item.collect}}人收藏</div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios'

import { useRoute } from 'vue-router'
const route = useRoute()
const roadmapDetail = ref([])
const roadMapId = route.params.id
const roadMap = ref({})
console.log('roadMapId', roadMapId)
const getDetail = async () => {
  let path = `/back/roadmap/getRoadMapDetail/${roadMapId}`;
  axios.get(path).then(res => {
    // console.log("getDetail---",res.data.result)
    roadmapDetail.value = res.data.result
  })
}
const getRoadMap = async () => {
  let path = `/back/roadmap/getRoadMapById/${roadMapId}`;
  axios.get(path).then(res => {
    // console.log("getRoadMap---",res.data.result)
    roadMap.value = res.data.result
  })
}
const recomendCourses = ref([])
const getRecommendCourses = () => {
      axios.get("/back/roadmap/getRecommentRoad").then(res => {
        console.log("rec", res.data.result)
        recomendCourses.value = res.data.result;
      })
}

getRoadMap()
getDetail()
getRecommendCourses()
</script>

<style lang="scss" scoped>
.courseimg{
    overflow: hidden;
    margin-bottom: 10px;
    height: 140px;
    max-height: 200px;
    margin-bottom: 8px;
    border-radius: 8px 8px 0 0;
    object-fit: contain;
}
.pathmain {
    position: relative;
    padding-bottom: 60px;

    .banner {
        height: 300px;
        width: 100%;
        position: relative;
        background-color: #172a34;

        h2 {
            margin: 19px 0 12px 0;
            text-align: center;
            font-size: 30px;
            color: #fff;
            font-weight: 700;
            line-height: 32px;
            text-shadow: 0 2px 4px rgba(28, 31, 33, .6);
        }

        p {
            text-align: center;
            font-size: 16px;
            line-height: 22px;
            color: #fff;
            text-shadow: 0 2px 4px rgba(28, 31, 33, .6);
        }

        .tail {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin: 22px auto 0;

            span {
                padding: 0 18px;
                background: rgba(0, 0, 0, .2);
                height: 33px;
                line-height: 33px;
                border-radius: 16.5px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                font-weight: 700;
                position: relative;
                margin-right: 28px;
            }

            span:after {
                position: absolute;
                right: -14px;
                top: 14px;
                width: 7px;
                height: 7px;
                content: "";
                border-top: 1px solid #fff;
                border-right: 1px solid #fff;
                transform: rotate(45deg);
            }
        }

        .cover-img-wrap,
        .path-bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
        }

    }

    .content {
        position: relative;
        z-index: 1;

        .logo {
            width: 420px;
            height: 60px;
            margin-top: 8px;
        }

        .share-wrap {
            position: absolute;
            top: 19px;
            right: 0;
            display: flex;
            flex-direction: row;
            align-items: center;

            .share:first-child {
                margin-left: 0;
            }

            .share {
                font-size: 20px;
                color: rgba(255, 255, 255, .4);
                line-height: 18px;
                margin-left: 26px;
                padding: 0;
                height: 18px;
                float: none;
                background: 0 0;
            }
        }

        .bdshare-button-style0-16 {
            zoom: 1;
        }
    }

    .fixed-wrap {
        width: 1600px;
        height: 98px;
        position: absolute;
        top: 251px;
        left: 50%;
        margin-left: -800px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .05);
        z-index: 9;

        .fixed-wrap-content {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: inherit;

            .huabei {
                width: 68px;
                height: 24px;
                border-radius: 12px;
                background-image: linear-gradient(90deg, #3023ae 0, #53a0fd 100%);
                text-align: center;
                line-height: 24px;
                font-size: 12px;
                font-weight: 700;
                color: #fff;
                display: inline-block;
                margin-right: 10px;
            }

            .jd {
                width: 68px;
                height: 24px;
                border-radius: 12px;
                background-image: linear-gradient(90deg, #ff323f 0, #f76469 100%);
                text-align: center;
                line-height: 24px;
                font-size: 12px;
                font-weight: 700;
                color: #fff;
                display: inline-block;
            }

            .collect {
                width: 160px;
                height: 48px;
                background: rgba(240, 20, 20, .1);
                border-radius: 24px;
                text-align: center;
                line-height: 48px;
                font-size: 14px;
                color: #f20d0d;
                display: inline-block;
                cursor: pointer;
            }

            .orderpath {
                width: 190px;
                height: 48px;
                display: inline-block;
                background: #f20d0d;
                border-radius: 24px;
                text-align: center;
                line-height: 48px;
                color: #fff;
                font-size: 16px;
                margin-left: 12px;
            }
        }

        .pt {
            padding: 0 32px;
            box-sizing: border-box;
        }

        .timeout-bigactivity {
            position: absolute;
            height: 20px;
            right: 29px;
            top: 8px;
            display: -webkit-box;
            display: -moz-box;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flexbox;
            display: flex;
        }
    }

    .mainbox {
        padding-top: 77px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .routeview {
            width: 1200px;
            padding: 28px 32px;
            box-sizing: border-box;
            background: #fff;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .05);

            h2 {
                margin-bottom: 36px;

                b {
                    font-weight: 700;
                    font-size: 20px;
                    color: #1c1f21;
                    line-height: 36px;
                    margin-right: 12px;
                }

                i,
                span {
                    font-weight: 400;
                    font-size: 14px;
                    color: #383d42;
                    line-height: 16px;
                }
            }

            .step {
                border-left: 2px solid #f3f5f6;
                margin-left: 15px;
                padding-bottom: 40px;
                clear: both;

                .title {
                    position: relative;
                    left: -16px;
                    line-height: 32px;

                    .updateicon {
                        position: absolute;
                        z-index: 2;
                        background: url(@/assets/updateicon.png);
                        background-repeat: no-repeat;
                        background-size: cover;
                        width: 32px;
                        height: 32px;
                    }

                    .txt {
                        margin-left: 48px;
                        font-weight: 700;
                        font-size: 18px;
                        color: #07111b;
                        text-align: left;
                    }
                }

                .substance {
                    margin-top: 12px;
                    padding-left: 31px;

                    .brief {
                        font-size: 14px;
                        color: #1c1f21;
                        line-height: 24px;
                        text-align: left;
                    }

                    .item {
                        margin-top: 24px;
                        background: url(@/assets/coursebg.png);
                        background-repeat: no-repeat;
                        background-position: top center;
                        background-size: cover;
                        width: auto;
                        height: auto;
                        border-radius: 12px;
                        padding: 30px 32px;
                    }

                    .item-desc {
                        float: left;
                        color: #383d42;
                        text-align: left;
                        width: 510px;

                        h3 {
                            font-weight: 700;
                            font-size: 14px;
                            line-height: 24px;
                            margin-bottom: 4px;
                        }

                        p {
                            font-size: 12px;
                            line-height: 26px;
                        }

                        .tag {
                            margin-top: 28px;
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;

                            span {
                                padding: 0 10px;
                                height: 24px;
                                line-height: 24px;
                                background: rgba(0, 0, 0, .05);
                                border-radius: 12px;
                                text-align: center;
                                font-size: 12px;
                                color: #383d42;
                                font-weight: 400;
                                margin-right: 12px;
                                margin-bottom: 6px;
                            }
                        }
                    }

                    .item-course {
                        width: 470px;
                        height: auto;
                        float: right;
                        border-radius: 8px;
                        background: #fff;
                        transition: .3s all linear;
                        position: relative;
                        margin-left: 44px;

                        a {
                            display: block;
                        }

                        .course-info {
                            padding: 21px 24px;
                            box-sizing: border-box;
                            display: flex;
                            flex-direction: column;

                            h3 {
                                font-weight: 700;
                                font-size: 14px;
                                color: #1c1f21;
                                line-height: 20px;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                word-break: break-all;
                                word-wrap: break-word;
                                margin-bottom: 10px;
                            }

                            .study-info {
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                line-height: 18px;
                                font-size: 12px;

                                .course-num {
                                    color: #9199a1;
                                }

                                .course-stars {
                                    color: #545c63;
                                }
                            }

                            .desc {
                                margin-top: 17px;
                                font-size: 12px;
                                color: #f20d0d;
                                max-height: 44px;
                                overflow: hidden;

                                span {
                                    display: inline-block;
                                    padding: 2px 6px;
                                    line-height: 20px;
                                    background: rgba(242, 13, 13, .05);
                                }
                            }
                        }
                    }
                }
            }

            .explain {
                text-align: center;
                font-size: 12px;
                color: #9199a1;
                line-height: 24px;
            }
        }

        .offside {
            margin-left: 30px;
            width: 320px;

            h2 {
                font-weight: 700;
                font-size: 16px;
                color: #07111b;
                line-height: 24px;
                margin-bottom: 8px;
            }

            .masterknowledge {
                .suggestion {
                    margin-bottom: 18px;
                    font-size: 12px;
                    color: #9199a1;
                    line-height: 22px;
                }

                img {
                    width: 96px;
                    height: 64px;
                    border-radius: 8px;
                    margin-right: 16px;
                }


            }

            .recommoncourse {
                position: relative;
                width: 208px;

                h2 {
                    font-weight: 400;
                    font-size: 14px;
                    color: #1c1f21;
                    line-height: 20px;
                    margin-bottom: 4px;
                }

                h2.coursetitle {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-break: break-all;
                    word-wrap: break-word;
                    text-overflow: ellipsis;
                }

                h2.moretitle {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                p {
                    font-size: 12px;
                    color: #9199a1;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .info {
                    display: flex;
                    flex-direction: row;
                    margin-top: 4px;
                    font-size: 12px;
                    color: #545c63;
                    line-height: 18px;
                }
            }

            .box {
                margin-bottom: 16px;
                display: flex;
                flex-direction: row;
            }

            .morelearnpath.fixed-slider {
                position: fixed;
                top: 85px;
                left: 1269.6px;
            }

            .morelearnpath {
                img {
                    width: 96px;
                    height: 96px;
                    border-radius: 8px;
                    margin-right: 16px;
                }

                p.moredesc {
                    width: 320px;
                    font-size: 12px;
                    color: #9199a1;
                    line-height: 20px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-break: break-all;
                    word-wrap: break-word;
                    text-overflow: ellipsis;
                }

                .pathinfo {
                    margin-top: 12px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #545454;
                    line-height: 18px;
                }
            }
        }
    }
}
</style>