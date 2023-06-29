<template>
  <div class="index">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">VIP</template>
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
            <!-- 左侧菜单栏内容 -->
            <!-- ... -->
          </el-aside>
          <el-main>
            <div class="rectangle">
              <div class="left">
                <img class="product-image" :src="selectedCourse.image" fit="contain" />
              </div>
              <div class="right">
                <h3>{{ selectedCourse.name }}</h3>
                <p class="price">价格：{{ selectedCourse.price }}</p>
                <el-button type="primary" size="medium">立即购买</el-button> <!-- 立即购买按钮 -->
                <!-- 其他信息 -->
                <!-- ... -->
              </div>
            </div>
            <div class="long-image">
              <img src="https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230624212140615.png"
                alt="长图" />
            </div>
          </el-main>
        </el-container>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      // 其他数据...
      selectedCourse: {
      },
    };
  },
  created() {
    // this.getMenuList();
    const productId = this.$route.params.id;
    this.getCourseDetail(productId);
    // this.nickname = this.$store.getters.getUser.nickname;
  },
  methods: {
    getCourseDetail(id) {

      this.$axios.get('/sourceCourse/course/' + id
        // ,
        //     {
        //         headers: {
        //             "Authorization": this.$store.getters.getToken
        //         }
        //     }
      ).then(response => {
        const courses = response.data.result;
        console.log(response)
        this.selectedCourse = courses;
        // this.$message({
        //     type: 'success',
        //     message: response.data.message
        // });
        console.log(this.courses)
      })
    }
  }
  // 其他方法...

};
</script>
  
<style>
.rectangle {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.rectangle .left {
  flex: 1;
}

.rectangle .right {
  flex: 2;
  margin-left: 20px;
}

.long-image {
  text-align: center;
  margin-top: 20px;
}

.long-image img {
  max-width: 100%;
}

.price {
  margin-bottom: 10px;
  /* 调整课程价格与课程名称的间距 */
}
</style>
  