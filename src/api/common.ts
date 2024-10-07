// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import { linkDownload } from '@/utils/download'

// 统一管理接口
enum API {
  // 接口模板列表
  interfaceUrl = '/comm/selectByTemplateMode',
  // 查询导出文件
  searchExportUrl = '/comm/selectDowOrderPC',
  // 下载文件
  downloadUrl = '/comm/download',
  // 查询商品
  goodsUrl = 'comm/selectQiYongChanPin',
}

// 查询商品
export const reqGoodsBianma = () => request.post(API.goodsUrl)

// 获取省份
export const reqInterface = () => request.post(API.interfaceUrl)

// 查询导出文件
export const reqSearchExport = () => request.post<any, any>(API.searchExportUrl)

// 下载文件
export const reqDownload = (data: any) => {
  linkDownload(
    import.meta.env.VITE_SERVE + API.downloadUrl + `?filename=${data}`,
  )
}
