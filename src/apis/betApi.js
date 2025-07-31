import { get, post } from "./index";

export const marketListApi = (data) =>  get('/api/v1/admin/bet/points',{tag: data})


export const bidHistoryApi = (data) =>  get('/api/v1/admin/bet/all',{...data})


export const updateBetApi = (data) =>  post('/api/v1/admin/bet/update',data)
