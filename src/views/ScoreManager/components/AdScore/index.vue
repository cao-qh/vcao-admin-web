<template>
	<div>
		<template v-if="data">
			<div style="margin-bottom: 10px">
				<div>广告编码：{{ data.guanggaobianma }}</div>
				<div v-if="data.jifenleixing == 1">积分：{{ data.jifen }}</div>
				<template v-if="data.jifenleixing == 2">
					<div>最低积分：{{ data.zuidijifen }}</div>
					<div>最高积分：{{ data.zuigaojifen }}</div>
				</template>
				<div>
					积分类型：{{
          jifenleixing.find((item) => item.value === data.jifenleixing)?.label
        }}
				</div>
				<div>广告名称：{{ data.guanggaomingcheng }}</div>
			</div>

			<a-space>
				<a-button v-has="'Btn.AdScore.Update'" type="primary" @click="() => edit.show(data)">
					修改
				</a-button>
				<a-button v-has="'Btn.AdScore.Delete'" type="primary" @click="handleDelete">
					删除
				</a-button>

			</a-space>
		</template>

		<div v-else>
			<a-empty>
				<template #description>
					<span>未配置广告积分</span>
				</template>
				<a-button v-has="'Btn.AdScore.Add'" type="primary" @click="add.show()">
					现在添加
				</a-button>
			</a-empty>
		</div>


		<Add ref="add" :jifenleixing="jifenleixing" :adList="adList" @success="gatData()" />

		<Edit ref="edit" :jifenleixing="jifenleixing" :adList="adList" @success="gatData()" />
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { reqSearch, reqDelete } from '@/api/ScoreManager/AdScore'
	import Add from './modules/Add.vue'
	import Edit from './modules/Edit.vue'
	import { message } from 'ant-design-vue'
	import { reqAd } from '@/api/common'

	const data = ref<any>(null)
	const add = ref()
	const edit = ref()
	const adList = ref([])

	const jifenleixing = [
		{
			value: 1,
			label: '固定',
		},
		{
			value: 2,
			label: '区间',
		},
	]

	onMounted(() => {
		gatData()
		reqAd().then((res) => {
			if (res.code == 0) {
				adList.value = res.data.map((item : any) => {
					return {
						label: item.mingcheng,
						value: item.bianma,
					}
				})
			}
		})
	})

	const gatData = async () => {
		const res = await reqSearch()
		if (res.code == 0) {
			data.value = res.data
		} else {
			data.value = null
		}
	}

	// 删除
	const handleDelete = async () => {
		const res = await reqDelete()
		if (res.code == 0) {
			message.success(res.msg)
			gatData()
		} else {
			message.error(res.msg)
		}
	}
</script>