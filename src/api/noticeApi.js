import { useApi } from './index'; // Adjust the path as needed

export const useApiNoticeCalls = () => {
  const { post, patch, deleted } = useApi();

  const noticeCreateApi = (data) => post('/api/v1/admin/notice/create', data);

  const noticeToggleApi = (data) => patch('/api/v1/admin/notice/toggle', data);

  const noticeDeleteApi = (data) => deleted(`/api/v1/admin/notice/delete/${data}`);

  return {
    noticeCreateApi,
    noticeToggleApi,
    noticeDeleteApi,
  };
};
