<template>
  <div class="box">
    <div class="title">
      <div>
        <p>排行热榜</p>
        <img src="../../images/dataScreen-title.png" alt="" />
      </div>
      <span>近一个月</span>
    </div>
    <div class="content">
      <div class="left">
        <img src="@/assets/trophy.png" alt="" />
        <span>中国联通</span>
      </div>
      <div class="right">
        <div>
          <span>1</span>
          <img src="@/assets/up.png" alt="" />
        </div>
        <div>
          <div class="item" v-for="(item, index) in data" :key="index">
            <span>{{ item.goodsName }}</span>
            <div>
              <span>{{ item.order_count }}</span>
              <img src="@/assets/up.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive([
  {
    provinceName: '重庆市',
    goodsName: '自拟测试001',
    order_count: 68,
  },
  {
    provinceName: '北京市',
    goodsName: '7月3日赣州联通【29元100分钟+145G通用+60G定向】+需首充100',
    order_count: 13,
  },
  {
    provinceName: '辽宁省',
    goodsName: '自拟联通测试001',
    order_count: 4,
  },
  {
    provinceName: '天津市',
    goodsName: '7月3日赣2通【29元100分钟+145G通用+60G定向】+需首充10011',
    order_count: 2,
  },
  {
    provinceName: '辽宁省',
    goodsName: '1',
    order_count: 1,
  },
])
</script>

<style scoped>
.box {
  margin-top: 20px;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100%;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      color: #fff;
      font-size: 20px;
    }
    img {
      margin-top: 15px;
    }
    > span {
      color: #3165c4;
      margin-right: 10px;
    }
  }

  .content {
    display: flex;
    background-color: #11144e;
    margin-top: 10px;
    height: 282px;
    overflow: hidden;
    padding: 10px;

    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        color: #3165c4;
        margin-top: 10px;
      }
    }

    .right {
      flex: 2;
      display: flex;
      overflow: hidden;
      font-size: 13px;

      > div:first-child {
        flex: 1;
        height: 50px;
        background-color: #182965;
        display: flex;
        justify-content: end;
        align-items: center;
        padding-right: 10px;

        span {
          color: #fff;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }

      > div:last-child {
        flex: 1.5;
        background-color: #182965;
        display: flex;
        flex-direction: column;

        .item {
          color: cyan;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          overflow: hidden;
          padding: 0 10px;

          > span {
            flex: 2;
            width: 100px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            margin-left: 5px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
