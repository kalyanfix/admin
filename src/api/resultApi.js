import { useApi } from './index'; // Adjust the path as needed

export const useApiResultCalls = () => {
  const { get, post, deleted } = useApi();

  const marketStatusApi = async (data) => get(`/api/v1/admin/market/get/`, { ...data });

  const declareResultApi = async (data) => post(`/api/v1/admin/market/declare/`, data);

  const showWinnerResultApi = async (data) => post(`/api/v1/admin/market/winners/`, data);

  const declareGaliResultApi = async (data) => post(`/api/v1/admin/market/declare/gali`, data);

  const deleteResultApi = async (data) => deleted(`/api/v1/admin/market/result/delete/${data}`);

  const deleteOpenResultApi = async (data) =>
    deleted(`/api/v1/admin/market/result/del/once?session=open&result_id=${data}`);

  const deleteCloseResultApi = async (data) =>
    deleted(`/api/v1/admin/market/result/del/once?session=close&result_id=${data}`);

  const revartResultApi = async (data) => deleted(`/api/v1/admin/market/revert`, { ...data });

  return {
    marketStatusApi,
    declareResultApi,
    showWinnerResultApi,
    declareGaliResultApi,
    deleteResultApi,
    deleteOpenResultApi,
    deleteCloseResultApi,
    revartResultApi,
  };
};
