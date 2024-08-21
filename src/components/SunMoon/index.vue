<template>
  <div class="sun-moon holder leftChecked">
    <span class="icon">
      <SvgIcon name="sun" />
    </span>
    <span class="icon">
      <SvgIcon name="moon" />
    </span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.sun-moon {
  position: relative;
  display: inline-flex;
  background: #ebedf0;
  border-radius: 100vw;
  cursor: pointer;
  transition: all 0.3s;

  .icon {
    position: relative;
    width: 32px;
    height: 32px;
    color: #a3b1bf;
    line-height: 32px;
    text-align: center;
    transition: all 0.3s;
    font-size: 16px;

    /*  .icon.active {
      color: #fff;
    } */
  }
}

.holder::before {
  position: absolute;
  top: 0;
  left: calc(100% - 32px);
  width: 32px;
  height: 32px;
  background: #314659;
  border-radius: 100vw;
  transition: all 0.3s;
  content: '';
}

.holder.leftChecked::before {
  left: 0;
}
</style>
