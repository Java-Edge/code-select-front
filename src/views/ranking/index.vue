<template>
    <div class="body">
        <div class="ranking-body">
            <div class="ranking-number">1</div>
            <div class="ranking-left">
                <div class="ranking-img">
                    <img src="https://pic.imgdb.cn/item/64cf41fe1ddac507ccff877a.png" />
                </div>
            </div>
            <router-link to="/recruit/152" class="link-sty">
                <div class="ranking-middle">
                    <div class="ranking-name">传智教育·黑马程序员Java</div>
                    <div class="ranking-des">传智教育·黑马程序员Java研究院全新录制的Java入门教程，相关资料源码...</div>
                    <div class="ranking-likes">浏览 1102</div>
                </div>
            </router-link>

            <div class="ranking-right">
                <div class="ranking-user-img"><img src="https://pic.imgdb.cn/item/64ce0d9b1ddac507cc4c6a38.jpg" /></div>
                <div class="ranking-user-name">无敌少年小旋风</div>
                <div class="ranking-button">关注</div>
                <!-- <button>关注</button> -->
            </div>
        </div>
        <div class="ranking-body">
            <div class="ranking-number">2</div>
            <div class="ranking-left">
                <div class="ranking-img">
                    <img src="https://pic.imgdb.cn/item/64cf45381ddac507cc07ebe1.png" />
                </div>
            </div>
            <router-link to="/recruit/152" class="link-sty">
                <div class="ranking-middle">
                    <div class="ranking-name">传智教育·黑马程序员Java</div>
                    <div class="ranking-des">传智教育·黑马程序员Java研究院全新录制的Java入门教程，相关资料源码...</div>
                    <div class="ranking-likes">浏览 1102</div>
                </div>
            </router-link>

            <div class="ranking-right">
                <div class="ranking-user-img"><img src="https://pic.imgdb.cn/item/64ce0d9b1ddac507cc4c6a38.jpg" /></div>
                <div class="ranking-user-name">无敌少年小旋风</div>
                <div class="ranking-button">关注</div>
                <!-- <button>关注</button> -->
            </div>
        </div>
    </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>

.link-sty{
  text-decoration: none;
  color: black;
  display: block;
  width: 600px;
}
.ranking-number {
    color: #999AAA;
    font-size: 20px;
    // margin-bottom: 50px;
    margin-right: 15px;
}
.ranking-body {
    height: 67px;
    width: 876px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 10px;
}

.ranking-left {
    // background-color: yellow;
    margin: 0 auto;
}

.ranking-middle {
    // background-color: blue;
    display: flex;
    flex-direction: column;
    flex-grow: 3;
    margin-left: 15px;
    justify-content: space-between;
    height: 100%;
}


.ranking-name {
    font-size: 16px;
    font-weight: 600;
}
.ranking-img img{
    width: 107px;
    height: 60px;
    border-radius: 5px;
    // max-width: none;
    // max-height: none;
    // border-radius: 50%;
    // margin: 0 auto;
}
.ranking-des {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #777888;
}
.ranking-likes {
    font-size: 14px;
    color: #777888;
}
.ranking-right {
    // background-color: green;
    flex-grow: 1;
    // width: 300px;
    display: flex;
    align-items: center;
}
.ranking-user-img img {
    width: 37px;
    height: 37px;
    border-radius: 50%;
}
.ranking-user-name {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 14px;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; //需要显示的行数
    overflow: hidden;
    text-overflow: ellipsis;
}

.ranking-button {
    width: 65px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #f8f8f8; /* Google蓝色 */
    color: black;
    border-radius: 13px; /* 圆角 */
    font-size: 14px;
    // padding: 10px 20px; /* 上下边距，左右边距 */
    cursor: pointer;
    border: 1px solid #ccccd8; // 先添加上 border，防止添加border抖动
}

/* 按钮悬停样式 */
.ranking-button:hover {
    border: 1px solid black;
}

/* 按钮点击样式 */
.ranking-button:active {
    background-color: #f8f8f8; /* Google更深的蓝色 */
}
</style>