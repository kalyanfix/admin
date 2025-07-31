import { get, post } from './index';

export const transactionCreateApi = (data) =>
    post('/api/v1/admin/transaction/create', { ...data });
  
  export const transactionHistoryApi = (data) =>
    get('/api/v1/admin/transaction/all', { ...data });
  