<template>
        <div class="box">
      <!-- 评论框 -->
      <div class="comment">
        <input type="text" />
        <div class="publish">发布</div>
      </div>
      <div class="commentList">
        <div class="commentItem">
          <div class="top">
            <div class="itemImg">
              <img
                src="https://p5-pro.a.yximgs.com/uhead/AB/2023/01/13/16/BMjAyMzAxMTMxNjAzMDhfMzIwNTU1NDExXzJfaGQ3NDVfNDc4_s.jpg"
              />
            </div>
            <div class="commName">凌小峰[编程教学]</div>
          </div>
          <div class="content">js真好玩</div>
          <div class="bottom">
            <div class="time">2023-02-27</div>
            <div class="del" onclick="del(this)">删除</div>
          </div>
        </div>
      </div>
      <script>
        let input = document.querySelector("input");
        let publish = document.querySelector(".publish");
        let commentList = document.querySelector(".commentList");
        // 删除
        function del(item) {
          let commItem = item.parentNode.parentNode;
          commentList.removeChild(commItem);
        }
        publish.onclick = function () {
          let text = input.value;
          let date = new Date();
          let time =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
          if (text.trim().length > 0) {
            // 正常评论
            let html = `
              <div class="top">
                <div class="itemImg">
                  <img
                    src="https://p5-pro.a.yximgs.com/uhead/AB/2023/01/13/16/BMjAyMzAxMTMxNjAzMDhfMzIwNTU1NDExXzJfaGQ3NDVfNDc4_s.jpg"
                  />
                </div>
                <div class="commName">凌小峰[编程教学]</div>
              </div>
              <div class="content">${text}</div>
              <div class="bottom">
                <div class="time">${time}</div>
                <div class="del" onclick="del(this)">删除</div>
              </div>
            `;
            // 创建子节点
            let item = document.createElement("div");
            item.className = "commentItem";
            item.innerHTML = html;
            // 添加子节点
            commentList.appendChild(item);
            // 清空输入框
            input.value = "";
          } else {
            alert("评论不能为空");
          }
        };
      </script>
    </div>
</template>

<script setup>
</script>

<style scoped> 
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        width: 100vw;
      }
      .box .comment {
        width: 80vw;
        height: 100px;
        display: flex;
        align-items: center;
        margin: auto;
        margin-top: 50px;
      }
      .box .comment input {
        width: 50vw;
        height: 50px;
        border: none;
        outline: none;
        background-color: #f1f2f3;
        padding-left: 20px;
        font-size: 16px;
      }
      .box .comment .publish {
        width: 80px;
        height: 50px;
        line-height: 50px;
        margin-left: 20px;
        font-weight: 600;
        color: #f1f2f3;
        background-color: #80d7f6;
        text-align: center;
        border-radius: 20px;
      }
      .box .comment .publish:hover {
        background-color: #00aeec;
        cursor: pointer;
        color: #fff;
      }
      .box .commentList {
        width: 80vw;
        margin: auto;
        margin-top: 10px;
      }

      .box .commentList .commentItem .top {
        display: flex;
        align-items: center;
        color: #73777e;
        font-weight: 600;
      }
      .box .commentList .commentItem .top .itemImg {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 8px #ccc;
        margin-right: 20px;
      }
      .box .commentList .commentItem .top .itemImg img {
        width: 100%;
      }
      .box .commentList .commentItem .content {
        padding: 20px 10px;
        padding-left: 80px;
      }
      .box .commentList .commentItem .bottom {
        display: flex;
        font-size: 14px;
        color: #acabab;
        padding-left: 30px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
      }
      .box .commentList .commentItem .bottom .del {
        margin-left: 80px;
      }
      .box .commentList .commentItem .bottom .del:hover {
        cursor: pointer;
        color: #000;
        font-weight: 600;
      }
</style>