// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 用户日志查询
  searchUserLogUrl = '/pc/riZhiGuanLi/getAll',
  // 会员余额变更记录查询
  searchMemberBalanceChangeRecordUrl = '/pc/riZhiGuanLi/getAll07',
  // 会员金币变更记录查询
  searchMemberCoinChangeRecordUrl = '/pc/riZhiGuanLi/getAll05',
  // 会员购剧记录查询
  searchMemberBuyRecordUrl = '/pc/riZhiGuanLi/getAll03',
  // 广告观看或下单记录
  searchAdwatchOrOrderRecordUrl = '/pc/riZhiGuanLi/getAll02',
  // 会员观看记录
  searchMemberViewingRecordUrl = '/pc/riZhiGuanLi/getAll04',
  // 会员追剧记录
  searchMemberCatchRecordUrl = '/pc/riZhiGuanLi/getAll06',
}

// 查用户日志查询
export const reqSearchUserLog = (data: any) =>
  request.post<any, any>(API.searchUserLogUrl, obj2Query(data))

// 查会员余额变更记录查询
export const reqSearchMemberBalanceChangeRecord = (data: any) =>
  request.post<any, any>(
    API.searchMemberBalanceChangeRecordUrl,
    obj2Query(data),
  )

// 查会员金币变更记录查询
export const reqSearchMemberCoinChangeRecord = (data: any) =>
  request.post<any, any>(API.searchMemberCoinChangeRecordUrl, obj2Query(data))

// 查会员购剧记录查询
export const reqSearchMemberBuyRecord = (data: any) =>
  request.post<any, any>(API.searchMemberBuyRecordUrl, obj2Query(data))

// 广告观看或下单记录
export const reqSearchAdwatchOrOrderRecord = (data: any) =>
  request.post<any, any>(API.searchAdwatchOrOrderRecordUrl, obj2Query(data))

// 会员观看记录
export const reqSearchMemberViewingRecord = (data: any) =>
  request.post<any, any>(API.searchMemberViewingRecordUrl, obj2Query(data))

// 会员追剧记录
export const reqSearchMemberCatchRecord = (data: any) =>
  request.post<any, any>(API.searchMemberCatchRecordUrl, obj2Query(data))
