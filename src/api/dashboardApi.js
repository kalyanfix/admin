import { useApi } from './index'; // Adjust the path as needed

export const useApiDashboardCalls = () => {
  const { get } = useApi();

  const dashboardApi = (data) => get('/api/v1/admin/market/total');

  return {
    dashboardApi,
  };
};
