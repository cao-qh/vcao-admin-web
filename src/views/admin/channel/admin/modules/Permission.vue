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
      @check="handleTreeCheckd"
    ></a-tree>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
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
const checkedKeys = reactive<{
  checked: string[]
  halfChecked: string[]
}>({
  checked: [],
  halfChecked: [],
})

const phone = ref<string>('')

const handleTreeCheckd = (checkedkeys: any, { node }: { node: any }) => {
  checkedKeys.checked = checkedkeys.checked
  checkedKeys.halfChecked = checkedkeys.halfChecked

  if (node.checked) {
    // 全部取消勾选子节点
    unCheckAll(node.children)
    // 取消勾选父节点
    // unCheckParent(node.parent)
  } else {
    node.dataRef.select = true
    // 全部勾选子节点
    checkAll(node.children)
    // 勾选父节点
    if (node.parent) {
      checkParent(node.parent)
    }
  }

  // console.log('checkedKeys :>> ', checkedKeys)
  //console.log('e :>> ', node)
}

const show = async (row: any) => {
  const res = await reqConfigPermissionSearch({ shoujihao: row.shoujihao })
  if (res.code == 0) {
    open.value = true
    menuArr.value = res.data
    const { checked, halfChecked } = filterCheckedArr(menuArr.value, [], [])
    checkedKeys.checked = checked
    checkedKeys.halfChecked = halfChecked
    phone.value = row.shoujihao
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    const res = await reqConfigPermission({
      phone: phone.value,
      codeS: [...checkedKeys.checked, ...checkedKeys.halfChecked].join(','),
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

const filterCheckedArr = (allData: any, checkArr: any, halfCheckArr: any) => {
  allData.forEach((item: any) => {
    // 如果节点选中
    if (item.select) {
      if (isChildrenAllChecked(item)) {
        checkArr.push(item.code)
      } else {
        halfCheckArr.push(item.code)
      }
    }
    if (item.children && item.children.length > 0) {
      filterCheckedArr(item.children, checkArr, halfCheckArr)
    }
  })
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

// 勾选所有子节点
const checkAll = (list: any) => {
  list.forEach((item: any) => {
    if (checkedKeys.halfChecked.indexOf(item.code) !== -1) {
      checkedKeys.halfChecked.splice(
        checkedKeys.halfChecked.indexOf(item.code),
        1,
      )
    }

    if (checkedKeys.checked.indexOf(item.code) == -1) {
      checkedKeys.checked.push(item.code)
      item.select = true
    }

    if (item.children && item.children.length > 0) {
      checkAll(item.children)
    }
  })
}

// 勾选父节点
const checkParent = (self: any) => {
  const { node, parent } = self
  // 自己的勾选状态 0 不勾选 1 全部勾选 2 部分勾选
  let checkChildCount = 0

  node.children.forEach((item: any) => {
    if (item.select) {
      checkChildCount++
    }
  })

  if (checkChildCount == node.children.length) {
    node.select = true
    if (checkedKeys.checked.indexOf(node.code) == -1) {
      checkedKeys.checked.push(node.code)
    }
  } else {
    node.select = true
    if (checkedKeys.checked.indexOf(node.code) == -1) {
      checkedKeys.halfChecked.push(node.code)
    }
  }

  console.log('node :>> ', node)

  // console.log('checkChildCount :>> ', checkChildCount)
  if (parent) {
    checkParent(parent)
  }
}

// 取消勾选所有子节点
const unCheckAll = (list: any) => {
  list.forEach((item: any) => {
    if (checkedKeys.checked.indexOf(item.code) !== -1) {
      checkedKeys.checked.splice(checkedKeys.checked.indexOf(item.code), 1)
      item.select = false
    }

    if (item.children && item.children.length > 0) {
      unCheckAll(item.children)
    }
  })
}

// 取消勾选父节点
// const unCheckParent = (self: any) => {}

defineExpose({
  show,
})
</script>
