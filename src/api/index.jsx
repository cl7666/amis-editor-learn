import axios from 'axios'
import { render as renderAmis } from 'amis'
import { AlertComponent, alert } from 'amis-ui'
/*
 * API请求封装（带验证信息）
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 */

let API_DOMAIN = '192.168.110.65:9007'

// API请求正常，数据正常
export const API_CODE = {
  // API请求正常
  OK: 200,
  // API请求正常，数据异常
  ERR_DATA: 403,
  // API请求正常，空数据
  ERR_NO_DATA: 301,
  // API请求正常，登录异常
  ERR_LOGOUT: 401,
}

// API请求异常统一报错提示
export const API_FAILED = '网络连接异常，请稍后再试'

export function apiRequest(config) {
  if (config.data === undefined) {
    config.data = {}
  }
  config.method = config.method || 'post'

  // 封装header信息
  let headers = {}

  let data = null

  // 判断是否使用formData方式提交
  if (config.formData) {
    headers['Content-Type'] = 'multipart/form-data'
    data = new FormData()
    Object.keys(config.data).forEach(function (key) {
      data.append(key, config.data[key])
    })
  } else {
    data = config.data
  }

  // 组装axios数据
  let axiosConfig = {
    method: config.method,
    url: config.url,
    headers,
  }

  // 判断是get还是post，并加入发送的数据
  if (config.method === 'get') {
    axiosConfig.params = data
  } else {
    axiosConfig.data = data
  }

  // 发起请求
  axios(axiosConfig)
    .then((res) => {
      let result = res.data
      config.done && config.done()

      if (result.code === API_CODE.ERR_LOGOUT) {
        // 如果是登录信息失效，则弹出Antd的Modal对话框
        Modal.error({
          title: result.message,
          // 点击OK按钮后，直接跳转至登录界面
          onOk: () => {
            logout()
          },
        })
      } else {
        // 如果登录信息正常，则执行success的回调
        config.success && config.success(result)
      }
    })
    .catch((err) => {
      // 如果接口不通或出现错误，则弹出Antd的Modal对话框
      Modal.error({
        title: API_FAILED,
      })
      // 执行fail的回调
      config.fail && config.fail()
      // 执行done的回调
      config.done && config.done()
    })
}
