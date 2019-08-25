import axios from 'axios';

class HttpRequest {
  constructor(options){
    this.defaults = {
      baseUrl: ''
    }
    this.defaults = Object.assign(this.defaults, options);
  }
  setConfig(){

  }

  interceptors(install){
    install.interceptors.request.use(
      config => {
        let token = localStorage.getItem('token');
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.authorization = `token ${token}`;
        }
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
    install.interceptors.response.use(
      res => {
        const { data, status } = res;
        return data;
      },
      err => {
        return Promise.reject(err);
      }
    );
  }
  request(options){
    options = Object.assign(this.defaults, options)
    console.log(options);
    const instance = axios.create(options)
    this.interceptors(instance);
    return instance
  }
}

const request = new HttpRequest({
  baseURL: '/api'
});

const http = request.request();


// 获取所有属性分类
export async function getProperty(){
  return await http.get('/menu/property');
}
// 获取所有菜谱分类
export async function getClassify(){
  return await http.get('/menu/classify');
}

/**
 * 发布菜谱
 * @export
 * @param {Object} params - 参考mock的数据
 * @returns
 */
export async function publish(params){
  return await http.post('/menu/publish', params);
}

/**
 * 注册账号
 * @export
 * @param {Object} params - 
 * @param {Object} params.name - 用户名
 * @param {Object} params.password - 密码
 * @returns
 */
export async function register(params){
  return await http.post('/user/create', params);
}

/**
 * 账号登录
 * @export
 * @param {Object} params - 
 * @param {string} params.name - 用户名
 * @param {string} params.password - 密码
 * @returns
 */
export async function login(params){
  return await http.post('/user/login', params);
}

/**
 * 获取用户信息
 * @export
 * @param {Object} params - 
 * @param {string} params.userId - 用户id
 * @returns
 */
export async function userInfo(params){
  return await http.post('/user/info', params);
}

/**
 * 拿到用户发布的菜谱，可做筛使用选
 * @export
 * @param {Object} [params] - 不填写，则获取所有的菜谱
 * @param {string} [params.userId] - 指定用户的菜单
 * @param {string} [params.classify] - 按照菜单分类，进行筛选
 * @param {string} [params.property] - 指定菜单属性进行筛选
 * @returns
 */
export async function getMenus(params){
  return await http.get('/menu/query', {params});
}

/**
 * 根据菜单id，拿到菜谱的详细信息
 * @export
 * @param {Object} [params] - 
 * @param {string} [params.menuId] - 指定菜单的id
 * @returns
 */
export async function menuInfo(params){
  return await http.get('/menu/menuInfo', {params});
}

/**
 * toggle 收藏。收藏的取消收藏；没收藏的，要收藏。
 * @export
 * @param {Object} [params] - 
 * @param {string} [params.menuId] - 指定要收藏的菜单的id
 * @returns
 */
export async function toggleCollection(params){
  return await http.post('/user/collection', params);
}
/**
 * toggle 关注。关注的取消关注；没关注的，要关注。
 * @export
 * @param {Object} [params] - 
 * @param {string} [params.followUserId] - 指定要关注的用户的id
 * @returns
 */
export async function toggleFollowing(params){
  return await http.post('/user/following', params);
}

/**
 * 获取指定用户的收藏的菜单
 * @export
 * @param {Object} [params] - 
 * @param {string} [params.userId] - 指定的用户id
 * @returns
 */
export async function collection(params){
  return await http.get('/user/collection', {params});
}

/**
 * 获取指定用户关注的人
 * @export
 * @param {Object} [params] - 
 * @param {string} [params.userId] - 指定的用户id
 * @returns
 */
export async function following(params){
  return await http.get('/user/following', {params});
}

/**
 * 获取指定用户的粉丝
 * @export
 * @param {Object} [params] - 
 * @param {string} [params.userId] - 指定的用户id
 * @returns
 */
export async function fans(params){
  return await http.get('/user/fans', {params});
}