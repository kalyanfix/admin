import { useApi } from './index'; // Adjust the path as needed

export const useApiSliderCalls = () => {
  const { post, put, deleted } = useApi();

  const sliderCreateApi = (data) => post('/api/v1/admin/slider/create', data);

  const sliderToggleApi = (data) => put(`/api/v1/admin/slider/toggle/${data}`);

  const sliderDeleteApi = (data) => deleted(`/api/v1/admin/slider/delete/${data}`);

  return {
    sliderCreateApi,
    sliderToggleApi,
    sliderDeleteApi,
  };
};
