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
  reqConfigPermissionSearch,
  reqConfigPermission,
} from '@/api/admin/channel/admin'

defineOptions({ name: 'Permission' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

const menuArr = ref<any>([])
const fieldNames = { key: 'code', title: 'name' }
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

  const res = await reqConfigPermissionSearch({ shoujihao: row.shoujihao })
  if (res.code == 0) {
    open.value = true
    menuArr.value = res.data
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
    if (item.select) {
      if (isChildrenAllChecked(item)) {
        checkArr.push(item.code)
        item.state = CheckState.checked
      } else {
        halfCheckArr.push(item.code)
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
    return node.children.every((item: any) => item.select)
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
    toggleChecked(item.code, CheckState.unchecked)
    // 勾选子节点
    toggleChecked(item.code, CheckState.checked)

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
  toggleChecked(node.code, CheckState.unchecked)

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
    toggleChecked(node.code, CheckState.checked)
  } else {
    node.state = CheckState.halfChecked
    // 设为半勾选
    toggleChecked(node.code, CheckState.halfChecked)
  }

  if (parent) {
    checkParent(parent)
  }
}

// 取消勾选所有子节点
const unCheckAll = (list: any) => {
  list.forEach((item: any) => {
    item.state = CheckState.unchecked
    toggleChecked(item.code, CheckState.unchecked)

    if (item.children && item.children.length > 0) {
      unCheckAll(item.children)
    }
  })
}

// 切换节点勾选状态
const toggleChecked = (code: string, state: CheckState) => {
  if (state == CheckState.unchecked) {
    if (checkedKeys.value.halfChecked.indexOf(code) !== -1) {
      checkedKeys.value.halfChecked.splice(
        checkedKeys.value.halfChecked.indexOf(code),
        1,
      )
    }
    if (checkedKeys.value.checked.indexOf(code) !== -1) {
      checkedKeys.value.checked.splice(
        checkedKeys.value.checked.indexOf(code),
        1,
      )
    }
  }

  if (state == CheckState.checked) {
    if (checkedKeys.value.checked.indexOf(code) == -1) {
      checkedKeys.value.checked.push(code)
    }
  }

  if (state == CheckState.halfChecked) {
    if (checkedKeys.value.halfChecked.indexOf(code) == -1) {
      checkedKeys.value.halfChecked.push(code)
    }
  }
}

const submit = async () => {
  try {
    const res = await reqConfigPermission({
      phone: phone.value,
      codeS: [
        ...checkedKeys.value.checked,
        ...checkedKeys.value.halfChecked,
      ].join(','),
    })
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success('配置成功')
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
