import { get, put } from "./index";

export const settingsApi = () =>  get(`/api/v1/admin/setting/get`)

export const settingsResultApi = () =>  get(`/api/v1/auto-declare-status`)

export const settingsUpdateApi = (data) =>  put(`/api/v1/admin/setting/update`,{...data})

export const settingsResultUpdateApi = (data) =>  put(`/api/v1/toggle-auto-declare`,{...data})