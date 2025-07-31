import { useApi } from './index'; // Adjust the path as needed

export const useApiNotificationCalls = () => {
  const { post, patch, deleted } = useApi();

  const notificationCreateApi = (data) => post('/api/v1/admin/notification/create', data);

  const notificationSendApi = (data) => post('/api/v1/admin/notification/send', { id: data });

  const notificationToggleApi = (data) => patch('/api/v1/admin/notification/toggle', data);

  const notificationDeleteApi = (data) => deleted(`/api/v1/admin/notification/delete/${data}`);

  return {
    notificationSendApi,
    notificationCreateApi,
    notificationToggleApi,
    notificationDeleteApi,
  };
};
