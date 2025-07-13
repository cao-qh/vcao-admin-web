<template>
  <div class="sun-moon holder" :class="{ leftChecked: !isDark }">
    <span @click="handleSun">
      <SvgIcon
        class="icon"
        name="sun"
        :width="getSize.icon"
        :height="getSize.icon"
        :color="iconColor.sun"
      />
    </span>
    <span @click="handleMoon">
      <SvgIcon
        class="icon"
        name="moon"
        :width="getSize.icon"
        :height="getSize.icon"
        :color="iconColor.moon"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'SunMoon',
})

const props = withDefaults(
  defineProps<{ size?: 'middle' | 'large' | 'small' }>(),
  {
    size: 'middle',
  },
)

const isDark = defineModel()

const iconColor = computed(() => {
  return {
    sun: isDark.value ? '#a3b1bf' : '#fff',
    moon: isDark.value ? '#fff' : '#a3b1bf',
  }
})

// 当太阳被点击
const handleSun = () => {
  isDark.value = false
}

// 当月亮被点击
const handleMoon = () => {
  isDark.value = true
}

// 获取具体尺寸数值
const getSize = computed(() => {
  switch (props.size) {
    case 'small':
      return {
        bg: '16px',
        icon: '11px',
        lineHeight: '16px',
      }
    case 'middle':
      return {
        bg: '24px',
        icon: '16px',
        lineHeight: '29px',
      }
    case 'large':
      return {
        bg: '32px',
        icon: '20px',
        lineHeight: '40px',
      }
    default:
      return {
        bg: '24px',
        icon: '16px',
        lineHeight: '29px',
      }
  }
})
</script>

<style lang="scss" scoped>
.sun-moon {
  position: relative;
  display: inline-flex;
  background: #ebedf0;
  border-radius: 100vw;
  cursor: pointer;
  transition: all 0.3s;

  span {
    position: relative;
    width: v-bind('getSize.bg');
    height: v-bind('getSize.bg');
    text-align: center;
    line-height: v-bind('getSize.lineHeight');
    transition: all 0.3s;
  }
}

.holder::before {
  position: absolute;
  top: 0;
  left: calc(100% - v-bind('getSize.bg'));
  width: v-bind('getSize.bg');
  height: v-bind('getSize.bg');
  background: #314659;
  border-radius: 100vw;
  transition: all 0.3s;
  content: '';
}

.holder.leftChecked::before {
  left: 0;
}
</style>
