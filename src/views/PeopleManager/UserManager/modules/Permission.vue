<template>
  <a-modal
    title="权限配置"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :bodyStyle="{ height: '500px', overflow: 'auto' }"
  >
    <a-tree
      :tree-data="menuArr"
      :fieldNames="fieldNames"
      checkable
      checkStrictly
      v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys"
      @check="handleTreeCheckd"
    ></a-tree>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  reqSearchPermission,
  reqConfigPermission,
} from '@/api/PeopleManager/UserManager'
import useUserStore from '@/store/modules/user'

defineOptions({ name: 'Permission' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)
const userStore = useUserStore()

const menuArr = ref<any>([])
const fieldNames = { key: 'quanxianbianma', title: 'name' }
const checkedKeys = ref<{
  checked: string[]
  halfChecked: string[]
}>({
  checked: [],
  halfChecked: [],
})
const expandedKeys = ref<string[]>([])

const phone = ref<string>('')

enum CheckState {
  unchecked = 0,
  checked = 1,
  halfChecked = 2,
}

const show = async (row: any) => {
  // 清理数据
  menuArr.value = []
  checkedKeys.value.checked = []
  checkedKeys.value.halfChecked = []

  const res = await reqSearchPermission({ username: row.shoujihao })
  if (res.code == 0) {
    open.value = true
    menuArr.value = res.data
    setConfigPermissionNodeDisabled(menuArr.value)

    const { checked, halfChecked } = filterCheckedArr(menuArr.value, [], [])
    checkedKeys.value.checked = checked
    checkedKeys.value.halfChecked = halfChecked
    phone.value = row.shoujihao

    expandedKeys.value = [...checked, ...halfChecked]
  } else {
    message.error(res.msg)
  }
}

const filterCheckedArr = (allData: any, checkArr: any, halfCheckArr: any) => {
  for (let i = 0; i < allData.length; i++) {
    const item = allData[i]
    if (item.qijinyong == 1) {
      if (isChildrenAllChecked(item)) {
        checkArr.push(item.quanxianbianma)
        item.state = CheckState.checked
      } else {
        halfCheckArr.push(item.quanxianbianma)
        item.state = CheckState.halfChecked
      }
    }
    if (item.children && item.children.length > 0) {
      filterCheckedArr(item.children, checkArr, halfCheckArr)
    }
  }

  return {
    checked: checkArr,
    halfChecked: halfCheckArr,
  }
}

// 子节点是否全部勾选
const isChildrenAllChecked = (node: any) => {
  if (node.children && node.children.length > 0) {
    return node.children.every((item: any) => item.qijinyong == 1)
  }
  return true
}

const handleTreeCheckd = (checkedkeys: any, { node }: { node: any }) => {
  checkedKeys.value.checked = checkedkeys.checked
  checkedKeys.value.halfChecked = checkedkeys.halfChecked

  if (node.checked) {
    node.dataRef.state = CheckState.unchecked
    // 全部取消勾选子节点
    unCheckAll(node.children)
  } else {
    node.dataRef.state = CheckState.checked
    // 全部勾选子节点
    checkAll(node.children)
  }
  // 勾选/取消勾选父节点
  if (node.parent) {
    checkParent(node.parent)
  }
}

// 勾选所有子节点
const checkAll = (list: any) => {
  list.forEach((item: any) => {
    item.state = CheckState.checked
    // 先重置状态
    toggleChecked(item.quanxianbianma, CheckState.unchecked)
    // 勾选子节点
    toggleChecked(item.quanxianbianma, CheckState.checked)

    if (item.children && item.children.length > 0) {
      checkAll(item.children)
    }
  })
}

// 勾选/取消勾选父节点
const checkParent = (self: any) => {
  const { node, parent } = self
  // 重置状态
  node.state = CheckState.unchecked
  // 设为不勾选
  toggleChecked(node.quanxianbianma, CheckState.unchecked)

  // 子节点的勾选数量
  let checkChildCount = 0

  node.children.forEach((item: any) => {
    if (item.state === CheckState.checked) {
      checkChildCount++
    }
  })

  // 子节点全部勾选
  if (checkChildCount == node.children.length) {
    node.state = CheckState.checked
    // 设为勾选
    toggleChecked(node.quanxianbianma, CheckState.checked)
  } else {
    node.state = CheckState.halfChecked
    // 设为半勾选
    toggleChecked(node.quanxianbianma, CheckState.halfChecked)
  }

  if (parent) {
    checkParent(parent)
  }
}

// 取消勾选所有子节点
const unCheckAll = (list: any) => {
  list.forEach((item: any) => {
    if (item.disabled) return

    item.state = CheckState.unchecked
    toggleChecked(item.quanxianbianma, CheckState.unchecked)

    if (item.children && item.children.length > 0) {
      unCheckAll(item.children)
    }
  })
}

// 切换节点勾选状态
const toggleChecked = (quanxianbianma: string, state: CheckState) => {
  if (state == CheckState.unchecked) {
    if (checkedKeys.value.halfChecked.indexOf(quanxianbianma) !== -1) {
      checkedKeys.value.halfChecked.splice(
        checkedKeys.value.halfChecked.indexOf(quanxianbianma),
        1,
      )
    }
    if (checkedKeys.value.checked.indexOf(quanxianbianma) !== -1) {
      checkedKeys.value.checked.splice(
        checkedKeys.value.checked.indexOf(quanxianbianma),
        1,
      )
    }
  }

  if (state == CheckState.checked) {
    if (checkedKeys.value.checked.indexOf(quanxianbianma) == -1) {
      checkedKeys.value.checked.push(quanxianbianma)
    }
  }

  if (state == CheckState.halfChecked) {
    if (checkedKeys.value.halfChecked.indexOf(quanxianbianma) == -1) {
      checkedKeys.value.halfChecked.push(quanxianbianma)
    }
  }
}

// 设置权限管理节点，一旦勾选就禁用，不可取消
const setConfigPermissionNodeDisabled = (menuArr: any) => {
  // 找到管理员权限配置节点
  const configPermissionNode: any = findNode(
    menuArr,
    'Btn.UserManager.Permission',
  )
  if (configPermissionNode && configPermissionNode.qijinyong == 1) {
    configPermissionNode.disabled = true
  }
}

// 递归查找节点
const findNode = (list: any, quanxianbianma: string) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].quanxianbianma == quanxianbianma) {
      return list[i]
    }
    if (list[i].children && list[i].children.length > 0) {
      const res: any = findNode(list[i].children, quanxianbianma)
      if (res) {
        return res
      }
    }
  }
  return null
}

const submit = async () => {
  try {
    const res: any = await reqConfigPermission({
      admin: phone.value,
      quanxianbianma: [
        ...checkedKeys.value.checked,
        ...checkedKeys.value.halfChecked,
      ].join(','),
    })
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success('配置成功')
      // 如果配置的是自己则刷新
      if (phone.value == userStore.username) {
        window.location.reload()
      }
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>
