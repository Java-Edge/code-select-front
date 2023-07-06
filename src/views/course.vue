<template>
    <div class="index">
        <el-container>
            <!-- <el-aside width="200px">Aside</el-aside> -->
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">VIP</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3">学习路线</el-menu-item>
                    <el-menu-item index="4">系统课</el-menu-item>
                    <el-menu-item index="5">粉丝群</el-menu-item>
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
                                <el-carousel-item v-for="item in carouselItems" :key="item">
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
                    <el-tab-pane label="VIP">
                        <div class="product-list">
                            <CourseGride v-for="product in courses" :key="product.id" :product="product" />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
                </el-tabs>
            </el-main>
            <el-footer>Footer</el-footer>
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

    },
    data() {

        return {
            activeIndex: '1',
            activeIndex2: '1',
            nickname: '',
            menuList: [],
            active: localStorage.getItem("active"),
            courses: [],
            menuData: [
                {
                    index: '1',
                    title: 'Java开发',
                    icon: 'el-icon-message',
                    items: [
                        { index: '1-1', title: '选项1' },
                        { index: '1-2', title: '选项2' },
                    ],
                },
                {
                    index: '2',
                    title: 'JavaWeb开发',
                    icon: 'el-icon-menu',
                    items: [
                        { index: '2-1', title: '选项1' },
                        { index: '2-2', title: '选项2' },
                    ],
                },
                {
                    index: '3',
                    title: 'Java面试/进阶课程',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '3-1', title: '选项1' },
                        { index: '3-2', title: '选项2' },
                    ],
                },
                {
                    index: '4',
                    title: '运维技术',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '3-1', title: '选项1' },
                        { index: '3-2', title: '选项2' },
                    ],
                },
                {
                    index: '5',
                    title: 'python开发',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '3-1', title: '选项1' },
                        { index: '3-2', title: '选项2' },
                    ],
                },
                {
                    index: '6',
                    title: '前端开发',
                    icon: 'el-icon-setting',
                    items: [
                        { index: '3-1', title: '选项1' },
                        { index: '3-2', title: '选项2' },
                    ],
                },
            ],
            carouselItems: [
                {
                    id: 1,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png',
                    title: 'Slide 1',
                },
                {
                    id: 2,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230613205635148.png',
                    title: 'Slide 2',
                },
                {
                    id: 3,
                    imageUrl: 'https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png',
                    title: 'Slide 3',
                },
                {
                    id: 4,
                    imageUrl: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    title: 'Slide 3',
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