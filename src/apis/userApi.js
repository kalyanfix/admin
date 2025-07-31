import { get, patch, deleted } from "./index";

export const userListApi = (data) =>  get(`/api/v1/admin/users/all`,{status: data})


export const userUnverifiedListApi = (data) =>  get(`/api/v1/admin/users/all`,{verified: data})


export const userSpecificApi = (data) =>  get(`/api/v1/admin/users/get/${data}`)


export const userMpinUpdateApi = (data) =>  patch(`/api/v1/admin/users/change/`, data)


export const userToggleApi = (data) =>  patch(`/api/v1/admin/users/toggle/`, data)


export const userDeleteApi = (data) =>  deleted(`/api/v1/admin/users/delete/${data}`)
