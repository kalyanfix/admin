import { useApi } from './index'; // Adjust the path as needed

export const useApiSettingsCalls = () => {
  const { get, put, patch } = useApi();

  const settingsApi = (data) => get(`/api/v1/admin/setting/get`);

  const settingsUpdateApi = (data) => put(`/api/v1/admin/setting/update`, { ...data });

  const maintenanceUpdateApi = (data) => put(`/api/v1/admin/setting/maintainence`, { ...data });

  const offDayUpdateApi = (data) => put(`/api/v1/admin/setting/withdrawl/offday`, { ...data });

  const websiteUpdateApi = (data) => patch(`/api/v1/admin/setting/toggle/web`);

  const autoVerifiedSettingsUpdateApi = () => patch(`/api/v1/admin/setting/toggle`);

  const autoSendSettingsUpdateApi = () => patch(`/api/v1/admin/setting/toggle/noti`);

  const autoDeclareResultSettingsUpdateApi = () => get(`/api/v1/toggle-auto-declare`);

  return {
    settingsApi,
    offDayUpdateApi,
    websiteUpdateApi,
    settingsUpdateApi,
    maintenanceUpdateApi,
    autoSendSettingsUpdateApi,
    autoVerifiedSettingsUpdateApi,
    autoDeclareResultSettingsUpdateApi
  };
};
