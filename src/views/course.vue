<template>
    <div class="index">
        <el-container>
            <!-- <el-aside width="200px">Aside</el-aside> -->
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">首页</el-menu-item>
                    <!-- <el-submenu index="2">
                        <template slot="title">VIP</template>
                    </el-submenu>
                    <el-menu-item index="3">学习路线</el-menu-item>
                    <el-menu-item index="4">系统课</el-menu-item>
                    <el-menu-item index="5">粉丝群</el-menu-item> -->
                </el-menu>
                <div class="line"></div>
            </el-header>
            <el-main>
                <el-container>
                    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                        <el-menu :default-openeds="['1']" class="menu-container">
                            <el-submenu v-for="(submenu, index) in menuData" :key="index" :index="submenu.index"
                                popper-class="submenu-hover">
                                <template slot="title"><i :class="submenu.icon"></i>{{ submenu.title }}</template>
                                <el-menu-item v-for="item in submenu.items" :key="item.index" :index="item.index">
                                    {{ item.title }}
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                    <el-main>
                        <div class="block">
                            <!-- <span class="demonstration">Click 指示器触发</span> -->
                            <el-carousel trigger="click" height="300px">
                                <el-carousel-item  v-for="item in carouselItems" :key="item">
                                    <el-image class="product-image" :src="item.imageUrl" fit="contain"></el-image>
                                    <h3 class="small">{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-main>
                </el-container>
            </el-main>
            <el-main>
                <el-tabs type="border-card">
                        <div class="product-list">
                            <CourseGride v-for="product in courses" :key="product.id" :product="product" />
                        </div>
                    <!-- <el-tab-pane label="VIP">
                    
                    </el-tab-pane> -->
                    <!-- <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
                </el-tabs>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
        </el-container>

    </div>
</template>

<script>
import CourseGride from "./course-grid"
export default {
    components: {
        CourseGride,
    },
    name: "courseTest",
    created() {
        // this.getMenuList();
        this.getCourses();
        // this.nickname = this.$store.getters.getUser.nickname;
    },
    methods: {
        getCourses(){
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
        }
    },
    data() {

        return {
            activeIndex: '1',
            activeIndex2: '1',
            nickname: '',
            menuList: [],
            active: localStorage.getItem("active"),
            courses: [
            //     { id: 1, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 2, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 3, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 4, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 5, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 6, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 7, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 8, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 9, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 10, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 11, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 12, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 13, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 14, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 15, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 16, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 17, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 18, name: '商品1', price: 10.99, image: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png', info: "价格便宜" },
            //     { id: 19, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            //     { id: 20, name: '商品2', price: 19.99, image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', info: "价格便宜" },
            ],
            menuData: [
                {
                    index: '1',
                    title: 'Java开发',
                    icon: 'el-icon-message',
                    items: [
                        { index: '1-1', title: 'Java基础' },
                        { index: '1-2', title: 'Java面向对象' },
                    ],
                },
                {
                    index: '2',
                    title: 'JavaWeb开发',
                    icon: 'el-icon-menu',
                    items: [
                        { index: '2-1', title: 'mysql基础' },
                        { index: '2-2', title: 'springboot' },
                        { index: '2-3', title: 'JavaWeb基础' },
                        { index: '2-4', title: 'springcloud' },
                        { index: '2-5', title: 'maven' },
                        { index: '2-6', title: 'vue实战' },
                        { index: '2-7', title: 'mybatis' },
                    ],
                },
                {
                    index: '3',
                    title: 'Java面试/进阶课程',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '3-1', title: 'juc面试题' },
                        { index: '3-2', title: '互联网安全面试题' },
                        { index: '3-3', title: '消息中间面试题' },
                        { index: '3-2', title: 'mysql索引面试题' },
                        { index: '3-2', title: 'mysql一致性面试题' },
                    ],
                },
                {
                    index: '4',
                    title: '运维技术',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '4-1', title: 'docker' },
                        { index: '4-2', title: '云服务' },
                        { index: '4-3', title: 'jekins' },
                        { index: '4-4', title: 'nginx' },
                        { index: '4-5', title: 'k8s' },
                    ],
                },
                {
                    index: '5',
                    title: 'python开发',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '5-1', title: 'python面向对象' },
                        { index: '5-2', title: 'pythonWeb开发' },
                        { index: '5-3', title: 'python数据爬虫' },
                        { index: '5-4', title: '爬虫基础100到题' },
                        { index: '5-5', title: 'python破解验证码' },
                    ],
                },
                {
                    index: '6',
                    title: '前端开发',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '6-1', title: 'HTML' },
                        { index: '6-2', title: 'CSS' },
                        { index: '6-3', title: 'Javascript' },
                        { index: '6-4', title: 'React' },
                        { index: '6-5', title: 'Vue' },
                    ],
                },
            ],
            carouselItems: [
                {
                    id: 1,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709132254155.png',
                    title: 'Slide 1',
                },
                {
                    id: 2,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709132946157.png',
                    title: 'Slide 2',
                },
                {
                    id: 3,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709133514241.png',
                    title: 'Slide 3',
                },
                {
                    id: 4,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709134325831.png',
                    title: 'Slide 4',
                },
                {
                    id: 5,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709134613695.png',
                    title: 'Slide 5',
                },
            ],
        }
    }
}
</script>
<style>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
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

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
}

.menu-container {
    position: relative;
}

.submenu-hover .el-submenu__title {
    cursor: pointer;
}

.submenu-hover .el-submenu__title:hover {
    background-color: #e6f1ff;
}

.submenu-hover .el-menu {
    position: absolute;
    right: -200px;
    top: 0;
    z-index: 999;
}
</style>