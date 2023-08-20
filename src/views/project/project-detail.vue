<template>
    <div class="project-detail">
        <div class="project-title">
            程序员的 AI 启蒙课: ChatGPT 让你 1 人顶 3 人
        </div>
        <div class="project-des">
            <div class="left-border">项目简介</div>
            <div class="project-content">“未来可能让你失业的不是 AI ，而是你身边懂 AI 的同事” 对于开发而言学习AI已经迫在眉睫。本课程带你使用 ChatGPT + Copilot 等 AI 工具，从 0 到 1 开发一个 Vue3 仿简书项目，体验以 3 倍速度完成项目的需求、设计、开发、优化和测试，全面碾压“人肉”开发。让你轻松掌握开发工作提效方法，快速提升职场竞争力。</div>
        </div>
        <div class="architecture-img">
            <div class="left-border">架构图</div>
            <div class="archi-img">
                <!-- <img src="https://pic.imgdb.cn/item/64cf41fe1ddac507ccff877a.png" /> -->
                <img src="https://pic.imgdb.cn/item/64e17f08661c6c8e54bd97c5.jpg" />
            </div>
        </div>
        <div class="will-learn">
            <div class="left-border">通过本项目你将学到</div>
            <div class="project-content">1. ChatGPT写需求、做方案设计
                <br>
                2. ChatGPT快速写代码，并做优化<br>
                3. Copilot 一键智能生成代码<br>
                4. NotionAI 快速写文章、写博客<br>
                5. AIGC 做内容的其他常用工具<br>
                6. Al 使用技巧，Prompt 优化
            </div>
        </div>
        <div class="project-highlight">
            <div class="left-border">项目亮点</div>
            <div class="project-content">
                未来可能让你失业的不是 AI ，而是你身边懂 AI 的同事” 对于开发而言学习AI已经迫在眉睫。本课程带你使用 ChatGPT + Copilot 等 AI 工具，从 0 到 1 开发一个 Vue3 仿简书项目，体验以 3 倍速度完成项目的需求、设计、开发、优化和测试，全面碾压“人肉”开发。让你轻松掌握开发工作提效方法，快速提升职场竞争力。
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
.project-detail {
    margin: 0 auto;
    width: 80%;
    margin-top: 25px;
}
.project-title {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    // background-color: #0d1633;
    height: 125px;
    line-height: 125px;
    color: white;
    background: url("../../assets/350.jpg") no-repeat;
    background-size: cover;
}
.left-border {
    border-left: 5px solid #FF6A6A;
    // background-image: linear-gradient(to bottom, white, pink);
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
}
.project-content {
    line-height: 30px;
}
.archi-img {
    display: flex;
    // justify-content: space-around;
}

</style>