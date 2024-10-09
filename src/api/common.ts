// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import { linkDownload } from '@/utils/download'

// 统一管理接口
enum API {
  // 接口模板列表
  interfaceUrl = '/comm/selectByTemplateMode',
  // 参数模板列表
  canshumobanUrl = '/comm/selectByTemplate',
  // 查询导出文件
  searchExportUrl = '/comm/selectDowOrderPC',
  // 下载文件
  downloadUrl = '/comm/download',
  // 查询商品
  goodsUrl = '/comm/selectQiYongChanPin',
  // 查询渠道商
  selectQudaoshang = '/comm/selectQiYongQuDao',
  // 查询管理员
  searchAdmin = '/comm/selectAdminBianMa',
  // 查询代理员
  searchAgent = '/comm/selectByAgentBianMa',
}

// 查询渠道商
export const selectQudaoshang = () => request.post(API.selectQudaoshang)

// 查询商品
export const reqGoodsBianma = () => request.post(API.goodsUrl)

// 查询接口模板
export const reqInterface = () => request.post(API.interfaceUrl)

// 查询参数模板
export const reqCanshumoban = () => request.post(API.canshumobanUrl)

// 查询导出文件
export const reqSearchExport = () => request.post<any, any>(API.searchExportUrl)

// 下载文件
export const reqDownload = (data: any) => {
  linkDownload(
    import.meta.env.VITE_SERVE + API.downloadUrl + `?filename=${data}`,
  )
}

// 查询管理员
export const reqSearchAdmin = () => request.post(API.searchAdmin)

// 查询代理员
export const reqSearchAgent = () => request.post(API.searchAgent)
