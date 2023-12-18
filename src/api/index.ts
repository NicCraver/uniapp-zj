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

export const test = (params: any) => http.post<PostTest.data>('/test', params);
