// 统一管理项目中所有的请求路径 api
import request from './index'

export const getFormId = () => request.get('/ef/form/getDetail.xhtml')
export const getDetail = () => request.post('/ef/form/getDetail.xhtml')
export const saveELement = (data: any) =>
  request.post('/ef/form/saveElement.xhtml', data)
export const DelElement = (data: any) =>
  request.post('/ef/uielement/delete.xhtml', data)
