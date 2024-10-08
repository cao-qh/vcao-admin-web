/**
 * 正则表达式
 */

// 订单通用
export const order = /^[a-zA-Z0-9_-]+$/

// 5-16位字母、数字、下划线
export const username = /^[a-zA-Z][a-zA-Z0-9_]{4,15}/

// 汉字正则
export const nickname = /^[\u4e00-\u9fa5]{0,}$/

// ip地址验证
export const ip =
  /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/

// 收货地址
export const address =
  /[\u4e00-\u9fa5]{1,10}[自治区|省|市] [\u4e00-\u9fa5]{1,10}[自治州|市|盟|县] [\u4e00-\u9fa5]{1,10}[区|市|旗|寺|县|乡|镇|街道|苏木|区公所] [0-9|A-Z|a-z\u4e00-\u9fa5| |（|）|-]/

// 正整数
export const positive = /^[0-9]*[1-9][0-9]*$/

// 手机号
export const phone = /^1\d{10}$/

// 身份证号
export const regIdCard = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/

// 内容不包含*号
export const noStar = /^[^*]*$/

// 合法url地址
export const url =
  /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/

// 邮箱
export const email =
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
