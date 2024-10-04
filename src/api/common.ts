// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API {
  // 接口模板列表
  interfaceUrl = '/comm/selectByTemplateMode',
}

// 获取省份
export const reqInterface = () => request.post(API.interfaceUrl)
