import pinia from '@/store'
import useUserStore from '@/store/modules/user'

const userStoure = useUserStore(pinia)
export const isHasButton = (app: any) => {
  // 获取对应得用户仓库
  // 全局得自定义指令：实现按钮得权限
  app.directive('has', {
    mounted(el: any, binding: any) {
      const { value } = binding
      if (!userStoure.buttons.includes(value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
