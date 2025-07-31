import { useApi } from './index'; // Adjust the path as needed

export const useApiTransactionCalls = () => {
  const { post, patch } = useApi();

  const transactionCreateApi = (data) => post('/api/v1/admin/transaction/create', data);

  const transactionSwitchApi = (data) => patch('/api/v1/admin/transaction/switch', data);

  return {
    transactionCreateApi,
    transactionSwitchApi,
  };
};
