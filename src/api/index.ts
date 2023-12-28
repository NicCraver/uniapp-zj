import http from '@/utils/request';
// export function apiLogin(params:any) {

//   getTest: (params: GetTest.params) => http.get('/test', params),
//   postTest: (params: PostTest.params) =>
//     http.post('/test', params)
// }

export const apiLogin1 = (params: any) =>
  http.get('/login', {
    urlName: '成员列表查询',
    ...params
  });

export const apiLogin = (params: any) =>
  http.post('/login', {
    urlName: '用户登录 - apiLogin',
    ...params
  });

export const apiLoginValidCode = (params: any) =>
  http.post('/loginValidCode', {
    urlName: '验证码登录',
    ...params
  });

export const apiSendCodeNew = (params: any) =>
  http.post('/app/sendCodeNew', {
    urlName: '新注册用户获取验证码',
    ...params
  });

export const apiSendCodeOld = (params: any) =>
  http.post('/app/sendCodeOld', {
    urlName: '老用户忘记密码时获取验证码（验证码登录获取验证码）',
    ...params
  });

export const apiRegUser = (params: any) =>
  http.post('/app/regUser', {
    urlName: '新用户注册',
    ...params
  });

export const apiRestPws = (params: any) =>
  http.post('/app/restPws', {
    urlName: '老用户用短信验证码设置密码',
    ...params
  });

export const apiAddLockList = (params: any) =>
  http.post('/lockListCtrl/addLockList', {
    urlName: '新增门锁',
    ...params
  });

export const apiDoorUserLogCtrl = (params: any) =>
  http.get('/doorUserLogCtrl/list', {
    urlName: '门锁系统日志查询 - apiDoorUserLogCtrl',
    ...params
  });

export const apiDoorUserCtrlDelMySelf = () =>
  http.get('/DoorUserCtrl/delMySelf', {
    urlName: '注销自己账号'
  });

export const apiAddUser = (params: any) =>
  http.post('/LockRoleCtrl/AddUser', {
    urlName: '成员添加 - apiAddUser',
    ...params
  });

export const apiLockRoleCtrl = (params: any) =>
  http.get('/LockRoleCtrl/list', {
    // http.get('/DoorUserCtrl/list', {
    urlName: '成员列表查询 - apiLockRoleCtrl',
    ...params
  });

export const apiGetInfo = () =>
  http.get('/getInfo', { urlName: '获取当前用户信息 - apiGetInfo' });

export const apiLockListCtrlList = () =>
  http.get('/lockListCtrl/list', { urlName: '门锁查询 - apiLockListCtrlList' });

export const apiGetLockTypes = () =>
  http.get('/lockListCtrl/getLockTypes', {
    urlName: '获取门锁设备类型列表 - apiGetLockTypes'
  });

export const test = (params: any) =>
  http.post('/test', {
    urlName: 'test',
    ...params
  });

// 添加锁的密码用户 post /doorUserCtrl/addUserListM
export const apiAddUserListM = (params: any) =>
  http.post('/doorUserCtrl/addUserListM', {
    urlName: '添加锁的密码用户',
    ...params
  });

// 获取临时用户列表 get /lsUserCtrl/list
export const apiUserCtrlList = (params: any) =>
  http.get('/lsUserCtrl/list', {
    urlName: '获取临时用户列表',
    ...params
  });

// 添加临时用户 post /lsUserCtrl/AddUser
export const apiLsUserCtrlAddUser = (params: any) =>
  http.post('/lsUserCtrl/AddUser', {
    urlName: '添加临时用户',
    ...params
  });

export function test1() {
  apiLsUserCtrlAddUser({})
    .then((res) => {
      console.log(`res===`, res);
    })
    .catch((err) => {
      console.log(`err====`, err);
    });
}
