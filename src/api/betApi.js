import { useApi } from './index'; // Adjust the path as needed

export const useApiBetCalls = () => {
  const { get, post } = useApi();

  const marketListApi = (data) => get('/api/v1/admin/bet/points', { tag: data });

  const ankListApi = (data) => post('/api/v1/admin/bet/points', data);

  const bidHistoryApi = (data) => get('/api/v1/admin/bet/all', { ...data });

  const bidPointHistoryApi = (data) => post('/api/v1/admin/bet/points/all', { ...data });

  const updateBetApi = (data) => post('/api/v1/admin/bet/update', data);

  return {
    marketListApi,
    ankListApi,
    bidHistoryApi,
    updateBetApi,
    bidPointHistoryApi,
  };
};
