import { get, post, deleted } from "./index";

export const marketStatusApi = (data) =>  get(`/api/v1/admin/market/get/${data}`)


export const declareResultApi = (data) =>  post(`/api/v1/admin/market/declare/`, data)


export const showWinnerResultApi = (data) =>  post(`/api/v1/admin/market/winners/`, data)


export const declareGaliResultApi = (data) =>  post(`/api/v1/admin/market/declare/gali`, data)


export const showWinnerGaliResultApi = (data) =>  post(`/api/v1/admin/market/winners/gali`, data)


export const deleteResultApi = (data) =>  deleted(`/api/v1/admin/market/result/delete/${data}`)
