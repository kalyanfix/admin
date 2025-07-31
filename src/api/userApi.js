import { useApi } from './index'; // Adjust the path as needed

export const useApiUserCalls = () => {
  const { get, patch, deleted } = useApi();

  const userListApi = (data) => get(`/api/v1/admin/users/all`, { status: data });

  const userSpecificApi = (data) => get(`/api/v1/admin/users/get/${data}`);

  const userMpinUpdateApi = (data) => patch(`/api/v1/admin/users/change/`, data);

  const userToggleApi = (data) => patch(`/api/v1/admin/users/toggle/`, data);

  const userDeleteApi = (data) => deleted(`/api/v1/admin/users/delete/${data}`);

  return {
    userListApi,
    userSpecificApi,
    userMpinUpdateApi,
    userToggleApi,
    userDeleteApi,
  };
};
