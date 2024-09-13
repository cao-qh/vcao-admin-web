<template>
  <a-card>
    <div class="title">最新消息：</div>
    <div class="content">
      <!-- <a-col :span="12"> -->
      <a-list bordered :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a class="ellipsis">{{ item }}</a>
          </a-list-item>
        </template>
        <template #header>
          <div>紧急通知</div>
        </template>
      </a-list>
      <!-- </a-col> -->
      <!-- <a-col :span="12"> -->
      <a-list bordered :data-source="data" style="margin-top: 20px">
        <template #renderItem="{ item }">
          <a-list-item>
            <a class="ellipsis">{{ item }}</a>
          </a-list-item>
        </template>
        <template #header>
          <div>产品变动通知</div>
        </template>
      </a-list>
      <!-- </a-col> -->
    </div>
  </a-card>
</template>

<script setup lang="ts">
const data: string[] = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
]
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
}

.ellipsis {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 文本超出显示省略号 */
}

.content {
  padding: 10px;
}

:deep(.ant-list-items) {
  height: 257px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
