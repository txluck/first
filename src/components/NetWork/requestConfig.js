import axios from "axios";
import store from '../../store/index'
const baseURL = store.state.baseURL;
axios.defaults.withCredentials = true;
function requestConfig(path) {
  let instance = axios.create({
    baseURL: baseURL, // 换成你自己的后台地址
    timeout: 10000,
  });
  return instance({
    url: path,
  });
}
function PageConfig(path, parmas) {
  let instance = axios.create({
    baseURL: baseURL, // 换成你自己的后台地址
    timeout: 10000,
  });
  return instance({
    url: path,
    params: parmas,
  });
}
function PublishMessage(path, data) {
  let instance = axios.create({
    baseURL: baseURL,// 换成你自己后台地址
  });
  return instance({
    url: path,
    method: "post",
    data: data,
  });
}
function ajax(method, url, callback, data, flag) {
  // xhr 用来存储请求与响应的信息
  var xhr = null;
  if(window.XMLHttpRequest) {
      xhr =  new XMLHttpRequest();
  }else {
      // xhr = new ActiveXObject('Microsoft.XMLHttp');
  }
   // 监听数据请求状态   监听状态readyState的变化
  xhr.onreadystatechange = function() {
      // 1 2 3
      if(xhr.readyState == 4) {
          console.log(4);
          // 4xx   url  data 
          if(xhr.status == 200) {
              console.log(200);
              console.log(xhr.responseText);
              callback(xhr.responseText);
          }else {
              console.log('error');
          }
      }
  }
  method = method.toUpperCase();
  // get 请求 把数据拼接在地址身上
  if(method == 'GET') {
      console.log('get');
      // 建立连接
      xhr.open(method, url + '?' + data, flag);
      // 发出请求
      xhr.send();

      // post 请求需要把数据放在请求体里面  不拼接地址
  }else if(method == 'POST') {
      // 建立连接
      xhr.open(method, url, flag);
      // 前端告诉后端 我的数据是什么格式的   key=value&key1=value1
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      // 传递数据 发出请求i
      xhr.send(data);
  }
}
export { requestConfig, PublishMessage, PageConfig ,ajax};