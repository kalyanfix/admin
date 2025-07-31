import { useApi } from './index'; // Adjust the path as needed

export const useApiMarketCalls = () => {
  const { get, put, post, patch, deleted } = useApi();

  const marketListApi = (data) => get('/api/v1/admin/market/all', { tag: data });

  const marketDayOffListApi = (data) => get('/api/v1/admin/market/all', { _id: data });

  const marketDayOffUpdateApi = (data) => put('/api/v1/admin/market/update/offday', data);

  const marketCreateApi = (data) => post('/api/v1/admin/market/create', data);

  const marketEditApi = (data) => put('/api/v1/admin/market/update', data);

  const marketToggleApi = (data) => patch('/api/v1/admin/market/toggle', data);

  const marketStatusApi = (data) => get(`/api/v1/admin/market/get/${data}`);

  const marketDeleteApi = (data) => deleted(`/api/v1/admin/market/delete/${data}`);

  const resultListApi = (data, date) =>
    get('/api/v1/admin/market/result/get', { tag: data, from: date });

  return {
    marketListApi,
    marketDayOffListApi,
    marketDayOffUpdateApi,
    marketCreateApi,
    marketEditApi,
    marketToggleApi,
    marketStatusApi,
    resultListApi,
    marketDeleteApi,
  };
};
