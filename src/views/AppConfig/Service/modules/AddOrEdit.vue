<template>
	<a-modal :title="title" :open="open" @ok="submit" @cancel="open = false">
		<UploadImage style="text-align: center;" v-model:value="img" />
	</a-modal>
</template>
<script lang="ts" setup>
	import { ref } from 'vue'
	import { message } from 'ant-design-vue'
	import { reqAddOrEdit } from '@/api/AppConfig/Service'
	import UploadImage from '@/components/UploadImage/index.vue'

	defineOptions({ name: 'Add' })

	// 定义方法
	const $emit = defineEmits(['success'])

	const baseUrl = import.meta.env.VITE_SERVE
	const open = ref<boolean>(false)
	const img = ref<any>(null)
	const title = ref<string>('')

	const show = (data : any) => {
		open.value = true
		if (data) {
			title.value = '修改'
			img.value = baseUrl + data.erweima
		} else {
			title.value = '新增'
			img.value = null
		}
	}

	const submit = async () => {
		try {
			console.log('formState :>> ', img.value)
			const formData = new FormData()
			formData.append('tuPianFile', img.value)
			const res = await reqAddOrEdit(formData)
			if (res.code == 0) {
				$emit('success')
				open.value = false
				message.success(res.msg)
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