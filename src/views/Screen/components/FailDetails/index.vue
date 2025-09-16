<template>
  <div class="box1">
    <div class="title">
      <p>今日开卡异常检测</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="content">
      <div class="content-title">
        <span>异常时间</span>
        <span>用户地址</span>
        <span>异常原因</span>
      </div>
      <div class="content-list">
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.box1 {
  width: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100%;
  margin: 20px 0 0 0;

  .title {
    p {
      color: white;
      font-size: 20px;
    }
    img {
      margin-top: 15px;
    }
  }

  .content {
    .content-title {
      background-color: #3a3d64;
      color: #51b5d0;
      font-size: 20px;
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      padding: 15px 0;
    }
    .content-list {
      color: #3165c4;
      background-color: #11144e;
      height: 360px;
      display: flex;
      justify-content: center;
      align-items: start;

      span {
        font-size: 19px;
        margin-top: 60px;
      }
    }
  }
}
</style>
