<template>
  <a-card>
    <div class="title">年度总收益：</div>
    <div class="total">
      <span>￥</span>
      <a-statistic
        :precision="2"
        :value="112893"
        :valueStyle="{
          color: '#389e0d',
        }"
      />
    </div>
    <div class="yesterday">
      <div>
        <span>昨日收益：￥</span>
        <span>{{ 100 }}</span>
      </div>
      <div>
        <span>昨日涨幅：</span>
        <span>{{ 100 }}%</span>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
}

.total {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 10px 0;
  color: #389e0d;
  > span:first-child {
    font-size: 20px;
  }
}

.yesterday {
  display: flex;
  justify-content: space-between;
}
</style>
