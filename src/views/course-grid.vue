<!--
 * @Descripttion: 
 * @version: 
 * @Author: 不败顽童
 * @Date: 2023-06-23 20:21:24
 * @LastEditors: 不败顽童
 * @LastEditTime: 2023-06-29 21:42:52
-->
<template>
    <div class="product">
      <div class="product-image-container">
        <el-image class="product-image" :src="product.image" fit="cover"></el-image>
      </div>
      <div class="product-info">
        <router-link :to="`/product/${product.id}`">
          <p class="product-name">{{ product.name }}</p>
        </router-link>
        <div class="product-details">
          <span class="product-price">{{ product.price }} ￥</span>
          <span class="product-description">{{ product.description }}</span>
        </div>
      </div>
    </div>
  </template>
  

<script>
export default {
    name: "course-grid",
    props: {
        product: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            courseImg: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1cUpBW.img?w=768&h=429&m=6&x=483&y=193&s=252&d=252',
            studentList: [],
            course: '',
            teacher: '',
            date: '',
        }
    },
    methods: {
        getList() {
            const _this = this;
            this.$axios.get("/grade/showStudentsCourseGrade?courseId=" + _this.$store.getters.getCourseId,
                {
                    headers: {
                        "Authorization": _this.$store.getters.getToken
                    }
                }
            ).then(response => {
                var data = response.data.data;
                _this.studentList = data.list;
                _this.course = data.course;
                _this.teacher = data.teacher;
            })
        },
        getFormatDate() {
            var date = new Date();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentDate = date.getFullYear() + "年" + month + "月" + strDate
                + "日" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            this.date = currentDate;
        },
        showUpdate(index) {
            this.showEdit[index] = true;
            this.$set(this.showEdit, index, true); //这里要用$set方法，否则页面状态不更新
        },
        //取消修改
        cancelUpdate(index) {
            this.$confirm("取消修改？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$set(this.showEdit, index, false);
                    this.getList();
                    this.getTermList();
                    this.getTeacherList();
                })
                .catch(() => {
                });
        },
        submitUpdate(index, row) {
            this.$confirm("确认修改？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$axios.post("/grade/update", row.grade,
                        {
                            headers: {
                                "Authorization": this.$store.getters.getToken
                            }
                        }).then(res => {
                            this.$message({
                                message: res.data.message,
                                type: "success"
                            })
                            this.showEdit[index] = false;
                            this.$set(this.showEdit, index, false);
                            this.getList();
                        })
                })
                .catch(() => {
                });
        },
    },
    created() {
        this.getList();
        this.getFormatDate();
    }
}
</script>
<style>
.product {
    /* flex-basis: calc(33.33% - 20px); */
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    /* border-radius: 4px;
    padding: 12px;
    border: 1px solid #ccc; */
    margin-bottom: 20px;
    margin-right: 20px;
    line-height: 30px;
}

.product-image-container {
    margin-bottom: 12px;
}

.product-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
}

.product-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 6px;
    line-height: 10px;
}

.product-info {
    text-align: center;
    /* display: flex;
    align-items: center;
    justify-content: center; */
}

.product-price {
    font-size: 14px;
    color: #666;
    margin-right: 12px;
    line-height: 10px;
}

.product-description {
    font-size: 14px;
    color: #999;
    line-height: 10px;
}
</style>