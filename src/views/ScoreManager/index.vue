<template>
  <PageWrapper>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane
        key="1"
        tab="积分兑换"
        v-if="userStore.hasMenu('ScoreExchange')"
      >
        <ScoreExchange />
      </a-tab-pane>
      <a-tab-pane key="2" tab="广告积分" v-if="userStore.hasMenu('AdScore')">
        <AdScore />
      </a-tab-pane>
      <a-tab-pane
        key="3"
        tab="签到积分"
        v-if="userStore.hasMenu('SigninScore')"
      >
        <SigninScore />
      </a-tab-pane>
      <a-tab-pane
        key="4"
        tab="开宝箱-开心抽抽"
        v-if="userStore.hasMenu('TreasureboxAndLottery')"
      >
        <TreasureboxAndLottery />
      </a-tab-pane>
      <a-tab-pane key="5" tab="看剧积分" v-if="userStore.hasMenu('ViewScore')">
        <ViewScore />
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeKey = ref('1')
import ScoreExchange from './components/ScoreExchange/index.vue'
import AdScore from './components/AdScore/index.vue'
import SigninScore from './components/SigninScore/index.vue'
import TreasureboxAndLottery from './components/TreasureboxAndLottery/index.vue'
import ViewScore from './components/ViewScore/index.vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
</script>

<style></style>
