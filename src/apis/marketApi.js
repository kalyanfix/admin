import { get, put, post, patch } from "./index";

export const marketListApi = (data) =>  get('/api/v1/admin/market/all',{tag: data})


export const marketResultListApi = (data) =>  get('/api/v1/admin/market/declare/list',{...data})


export const marketCreateApi = (data) =>  post('/api/v1/admin/market/create',{...data})


export const marketEditApi = (data) =>  put('/api/v1/admin/market/update',{...data})


export const marketToggleApi = (data) =>  patch('/api/v1/admin/market/toggle',{...data})


export const marketStatusApi = (data) =>  get(`/api/v1/admin/market/get/${data}`)


export const resultListApi = (data, date) =>  get('/api/v1/admin/market/result/get',{tag: data, from: date})


export const marketDayOffListApi = (data) =>  get('/api/v1/admin/market/all', { _id: data });


export const marketDayOffUpdateApi = (data) =>  put('/api/v1/admin/market/update/offday', data);
