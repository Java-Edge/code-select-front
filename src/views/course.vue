<template>
    <div class="index">
        <el-container>
            <!-- <el-aside width="200px">Aside</el-aside> -->
            <Header/>
            <el-header>
            </el-header>
            <el-main style="margin-top:50px">
                <el-container>
                    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                        <el-menu :default-openeds="['1']" class="menu-container">
                            <el-submenu v-for="(submenu, index) in menuData" :key="index" :index="submenu.index"
                                :ref="'submenu-' + index" popper-class="submenu-hover" @mouseenter="showSubMenu(index)"
                                @mouseleave="hideSubMenu(index)">
                                <template slot="title"><i :class="submenu.icon"></i>{{ submenu.title }}</template>
                                <el-menu-item v-for="item in submenu.items" :key="item.index" :index="item.index" >
                                    {{ item.title }}
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                    <el-main>
                        <div class="block">
                            <el-carousel trigger="click" height="400px" type="card">
                                <el-carousel-item v-for="item in fiveCourses" :key="item.id">
                                    <router-link :to="`/product/${item.id}`">
                                        <el-image class="carousel-image" :src="item.image" fit="full"></el-image>
                                        <h3 class="small">{{ item }}</h3>
                                    </router-link>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-main>
                </el-container>
            </el-main>
            <div>
                <img width="100%" height="200px" src="@/assets/background.png"></img>
            </div>
            <el-main>
                <div type="border-card">
                    <div class="product-list">
                        <CourseGride v-for="product in courses" :key="product.id" :product="product" />
                    </div>
                    <!-- <el-tab-pane label="VIP">
                    
                    </el-tab-pane> -->
                    <!-- <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
                </div>
            </el-main>
            <Footer></Footer>
        </el-container>

    </div>
</template>

<script>
import CourseGride from "./course-grid"
import Footer from "./footer.vue"
import Header from "./header.vue";
export default {
    components: {
        CourseGride,
        Footer,
        Header,
    },
    name: "courseTest",
    created() {
        // this.getMenuList();
        this.getCourses();
        this.getFiveCourse();
        // this.nickname = this.$store.getters.getUser.nickname;
    },
    methods: {
        getCourses() {
            this.$axios.get('/sourceCourse/list'
                // ,
                //     {
                //         headers: {
                //             "Authorization": this.$store.getters.getToken
                //         }
                //     }
            ).then(response => {
                const courses = response.data.result;
                console.log(response)
                this.courses = courses;
                // this.$message({
                //     type: 'success',
                //     message: response.data.message
                // });
                console.log(this.courses)
            })
        },
        getFiveCourse() {
            this.$axios.get('/sourceCourse/getFiveCourse'
                // ,
                //     {
                //         headers: {
                //             "Authorization": this.$store.getters.getToken
                //         }
                //     }
            ).then(response => {
                const courses = response.data.result;
                console.log(response)
                this.fiveCourses = courses;
                // this.$message({
                //     type: 'success',
                //     message: response.data.message
                // });
                console.log(this.fiveCourses)
            })
        },
        activeSubMenu(index) {
            this.activeIndex = index;
        },
        showSubMenu(index) {
            console.log(index);
            this.$refs['submenu-' + index][0].active = true;
        },
        hideSubMenu(index) {
            this.$refs['submenu-' + index][0].active = false;
        },
    },
    data() {

        return {
            activeIndex: '1',
            activeIndex2: '1',
            nickname: '',
            menuList: [],
            active: localStorage.getItem("active"),
            courses: [],
            fiveCourses: [],
            menuData: [
                // {
                //     index: '1',
                //     title: 'Java开发',
                //     icon: 'el-icon-message',
                //     items: [
                //         { index: '1-1', title: 'Java基础' },
                //         { index: '1-2', title: 'Java面向对象' },
                //     ],
                // },
                // {
                //     index: '2',
                //     title: 'JavaWeb开发',
                //     icon: 'el-icon-menu',
                //     items: [
                //         { index: '2-1', title: 'mysql基础' },
                //         { index: '2-2', title: 'springboot' },
                //         { index: '2-3', title: 'JavaWeb基础' },
                //         { index: '2-4', title: 'springcloud' },
                //         { index: '2-5', title: 'maven' },
                //         { index: '2-6', title: 'vue实战' },
                //         { index: '2-7', title: 'mybatis' },
                //     ],
                // },
                // {
                //     index: '3',
                //     title: 'Java面试/进阶课程',
                //     icon: 'el-icon-setting',
                //     items: [
                //         { index: '3-1', title: 'juc面试题' },
                //         { index: '3-2', title: '互联网安全面试题' },
                //         { index: '3-3', title: '消息中间面试题' },
                //         { index: '3-4', title: 'mysql索引面试题' },
                //         { index: '3-5', title: 'mysql一致性面试题' },
                //     ],
                // },
                // {
                //     index: '4',
                //     title: '运维技术',
                //     icon: 'el-icon-setting',
                //     items: [
                //         { index: '4-1', title: 'docker' },
                //         { index: '4-2', title: '云服务' },
                //         { index: '4-3', title: 'jekins' },
                //         { index: '4-4', title: 'nginx' },
                //         { index: '4-5', title: 'k8s' },
                //     ],
                // },
                // {
                //     index: '5',
                //     title: 'python开发',
                //     icon: 'el-icon-setting',
                //     items: [
                //         { index: '5-1', title: 'python面向对象' },
                //         { index: '5-2', title: 'pythonWeb开发' },
                //         { index: '5-3', title: 'python数据爬虫' },
                //         { index: '5-4', title: '爬虫基础100到题' },
                //         { index: '5-5', title: 'python破解验证码' },
                //     ],
                // },
                // {
                //     index: '6',
                //     title: '前端开发',
                //     icon: 'el-icon-setting',
                //     items: [
                //         { index: '6-1', title: 'HTML' },
                //         { index: '6-2', title: 'CSS' },
                //         { index: '6-3', title: 'Javascript' },
                //         { index: '6-4', title: 'React' },
                //         { index: '6-5', title: 'Vue' },
                //     ],
                // },
            ],
        }
    }
}
</script>
<style>
.index {
    background-color: #E9EEF3;
}
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
}
.el-footer {
    line-height: 40px;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 100px;
}

.carousel-image{
    width: 800px;
    height: 500px;
    object-fit: cover;
    border-radius: 4px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
.products-content{
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  width: 80%;
}
.product-list {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin-left: 240px;
}
.el-tabs__content {
    background-color: #E9EEF3;
}

</style>