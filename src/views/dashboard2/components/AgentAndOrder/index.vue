<template>
  <a-card>
    <div class="total">
      <div class="number">0</div>
      <div>总代理数</div>
    </div>
    <div class="other">
      <div>
        <div class="number">0</div>
        <div>今日新增代理数</div>
      </div>
      <div>
        <div class="number">0</div>
        <div>今日新增代订单</div>
      </div>
      <div>
        <div class="number">0</div>
        <div>昨日新增代理数</div>
      </div>
      <div>
        <div class="number">0</div>
        <div>昨日新增订单</div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.total {
  text-align: center;
}

.number {
  font-weight: bold;
  font-size: 18px;
}

.other {
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin-top: 1px;
}
</style>
