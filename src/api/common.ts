// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API {
  // 视频合集
  videoCollectionUrl = '/common/selectByShiPinHeJi',
  // 视频章节
  videoChapterUrl = '/common/selectByShiPinZhangJie',
  // 广告
  adUrl = '/common/selectByGuangGao',
  // 会员
  memberUrl = '/common/selectHuiYuanMingChengAndBianMa',
  // 合集大类
  largeClassUrl = '/common/selectByShiPinHeJiDaLei',
  // 合集小类
  smallClassUrl = '/common/selectByShiPinHeJiXiaoLei',
  // 演员角色
  actorRoleUrl = '/common/selectByShiPinYanYuanJueSe',
  // 用户
  userUrl = '/common/selectYongHuMingChengAndShouJiHao',
}

// 视频合集
export const reqVideoCollection = () =>
  request.post<any, any>(API.videoCollectionUrl)

// 视频章节
export const reqVideoChapter = () => request.post<any, any>(API.videoChapterUrl)

// 广告
export const reqAd = () => request.post<any, any>(API.adUrl)

// 会员
export const reqMember = () => request.post<any, any>(API.memberUrl)

// 合集大类
export const reqLargeClass = () => request.post<any, any>(API.largeClassUrl)

// 合集小类
export const reqSmallClass = () => request.post<any, any>(API.smallClassUrl)

// 演员角色
export const reqActorRole = () => request.post<any, any>(API.actorRoleUrl)

// 用户
export const reqUser = () => request.post<any, any>(API.userUrl)
