import http from '@/utils/request';
// export function apiLogin(params:any) {

//   getTest: (params: GetTest.params) => http.get<GetTest.data>('/test', params),
//   postTest: (params: PostTest.params) =>
//     http.post<PostTest.data>('/test', params)
// }

export const apiLogin1 = (params: any) =>
  http.get<GetTest.data>('/login', params);

export const apiLogin = (params: any) =>
  http.post<PostTest.data>('/login', params);

export const apiLoginValidCode = (params: any) =>
  http.post<PostTest.data>('/loginValidCode', params);

export const apiSendCodeNew = (params: any) =>
  http.post<PostTest.data>('/app/sendCodeNew', params);

export const apiSendCodeOld = (params: any) =>
  http.post<PostTest.data>('/app/sendCodeOld', params);

export const apiRegUser = (params: any) =>
  http.post<PostTest.data>('/app/regUser', params);

export const apiRestPws = (params: any) =>
  http.post<PostTest.data>('/app/restPws', params);

export const apiAddLockList = (params: any) =>
  http.post<PostTest.data>('/lockListCtrl/addLockList', params);

export const apiDoorUserLogCtrl = (params: any) =>
  http.get<PostTest.data>('/doorUserLogCtrl/list', params);

export const apiDoorUserCtrlDelMySelf = () =>
  http.get<PostTest.data>('/DoorUserCtrl/delMySelf', {});

export const apiGetInfo = () => http.get<PostTest.data>('/getInfo', {});

export const apiLockListCtrlList = () =>
  http.get<PostTest.data>('/lockListCtrl/list', {});
export const apiGetLockTypes = () =>
  http.get<PostTest.data>('/lockListCtrl/getLockTypes', {});

export const test = (params: any) => http.post<PostTest.data>('/test', params);

export function test1() {
  apiDoorUserLogCtrl({})
    .then((res) => {
      console.log(`res===`, res);
    })
    .catch((err) => {
      console.log(`err====`, err);
    });
}
