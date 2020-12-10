import { requestConfig, PublishMessage,PageConfig,ajax } from './requestConfig'
export function getnotedetail(path) {
    return requestConfig(path)
}
export function PostMessage(path,data) {
    return PublishMessage(path,data)
}
export function PageSizeChange(path,parmas) {
    return PageConfig(path,parmas)
}
// ajax函数  用来与后端交互  （请求类型POST GET DELETE PUT HEAD, 请求地址， callback请求的回调函数，参数， 是否异步）
export function ajaxs(method, url, callback, data, flag) {
       return ajax(method, url, callback, data, flag)
}