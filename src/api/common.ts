// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API {
  // 省份
  provinceUrl = '/common/selectByProvince',
  // 返佣类型
  fanyongTypeUrl = '/common/selectByFanYong',
  // 运营商
  operatorUrl = '/common/selectByOperate',
  // 号池
  phonePoolUrl = '/common/selectByPhonepool',
  // 产品编码（启用）
  goodsBianma = '/comm/selectQiYongChanPin',
  // 上游渠道商
  upQuDaoShang = '/comm/selectQiYongQuDao',
}

// 获取省份
export const reqProvince = () => request.post(API.provinceUrl)

// 获取返佣类型
export const reqFanyongType = () => request.post(API.fanyongTypeUrl)

// 获取运营商
export const reqOperator = () => request.post(API.operatorUrl)

// 获取号池
export const reqPhonePool = () => request.post(API.phonePoolUrl)

// 产品编码（启用）
export const reqGoodsBianma = () => request.post(API.goodsBianma)
// 上游渠道商
export const reqUpQuDaoShang = () => request.post(API.upQuDaoShang)
