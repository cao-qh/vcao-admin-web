import {
  SettingOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  LockOutlined,
  CloseOutlined,
  DownOutlined,
  TableOutlined,
  FundProjectionScreenOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  EditOutlined,
  UpOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
  FullscreenExitOutlined,
  ExperimentOutlined,
} from '@ant-design/icons-vue'

const antDesignIconsVue = {
  SettingOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  LockOutlined,
  CloseOutlined,
  DownOutlined,
  TableOutlined,
  FundProjectionScreenOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  EditOutlined,
  UpOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
  FullscreenExitOutlined,
  ExperimentOutlined,
}

// 对外暴漏插件对象
export default {
  // 无比叫做install方法
  install(app: any): void {
    // 将ant-design-vue的图标注册到全局
    for (const [key, component] of Object.entries(antDesignIconsVue)) {
      app.component(key, component)
    }
  },
}
