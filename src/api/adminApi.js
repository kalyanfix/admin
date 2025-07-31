import { useApi } from './index'; // Adjust the path as needed

export const useApiAdminCalls = () => {
  const { post, put, patch, deleted } = useApi();

  const adminCreateApi = (data) => post('/api/v1/admin/signup', data);

  const adminEditApi = (data) => put('/api/v1/admin/notice/toggle', data);

  const adminDeleteApi = (data) => deleted(`/api/v1/admin/delete/${data}`);

  const adminToggleApi = (data) => patch('/api/v1/admin/toggle', data);

  return {
    adminCreateApi,
    adminEditApi,
    adminDeleteApi,
    adminToggleApi,
  };
};
