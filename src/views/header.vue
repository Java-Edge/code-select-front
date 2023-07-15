<template>
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1"> <div @click="toIndex">首页</div></el-menu-item>
            <el-submenu index="1-1">
                <template slot="title">VIP</template>
            </el-submenu>
            <el-menu-item index="2">学习路线</el-menu-item>
            <el-menu-item index="3">系统课</el-menu-item>
            <el-menu-item index="4">粉丝群</el-menu-item>
        </el-menu>
        <div class="line"></div>
    </el-header>
</template>
  
<script>
export default {
    name: 'Header',
    data() {
        return {
            websiteName: 'JAVA',
            contactPhone: '123-456-7890',
            activeIndex: 1,
        };
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        },
    },
    methods: {
        toIndex() {
            this.$router.push({
                path: "/index"
            });
        }
    }
};
</script>
  
<style>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>
  