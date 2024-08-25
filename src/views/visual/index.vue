<template>
  <div class="content">
    <div class="components">
      <h3>组件列表</h3>
      <div>
        <ComponentItem @click="onAddParagraph" />
      </div>
    </div>
    <div class="canvas">
      <h3>画布</h3>
      <div>
        <CanvasItem
          v-for="item in canvasItems"
          :key="item.id"
          :item="item"
          @click="onCanvansItemClick"
        />
      </div>
    </div>
    <div class="params">
      <h3>组件参数</h3>
      <div v-if="selectedComponent">
        <label>
          <span>组件名称：</span>
          <span>{{ selectedComponent.name }}</span>
        </label>
        <label>
          <span>组件内容：</span>
          <input type="text" v-model="selectedComponent.text" />
        </label>
        <a-button type="primary" @click="onDeleteSelected">删除</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ComponentItem from './modules/ComponentItem/index.vue'
import CanvasItem from './modules/CanvasItem/index.vue'
import type { CanvasItemType } from './type'

defineOptions({ name: 'Visual' })

const canvasItems = ref<CanvasItemType[]>([])

const onAddParagraph = () => {
  canvasItems.value.push({ id: 1, name: 'p', text: '段落' })
}

const selectedComponent = ref<CanvasItemType | null>(null)

const onCanvansItemClick = (id: number) => {
  selectedComponent.value = canvasItems.value.find(
    (item) => item.id === id,
  ) as CanvasItemType
}

const onDeleteSelected = () => {
  canvasItems.value = canvasItems.value.filter(
    (item) => item !== selectedComponent.value,
  )
  selectedComponent.value = null
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: calc(100vh - 89px);
  user-select: none;

  h3 {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }

  .components {
    flex: 1;
    background-color: aqua;
  }
  .canvas {
    flex: 4;
    /*background-color: #fff;*/
  }
  .params {
    flex: 1;
    background-color: pink;

    label {
      display: flex;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
