<template>
  <a-result
    status="404"
    title="404"
    sub-title="对不起，访问的页面不存在或暂无权限，请联系管理员。"
  >
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">返回主页</a-button>
    </template>
  </a-result>
</template>
