import axiosInstance from './axios.config';

export const auditsApi = {
  // Get all audits
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/api/audit', { params });
    return response.data;
  },

  // Get single audit
  getById: async (id) => {
    const response = await axiosInstance.get(`/api/audit/${id}`);
    return response.data;
  },

  // Get by payment reference
  getByPaymentRef: async (paymentRef) => {
    const response = await axiosInstance.get('/api/audit', {
      params: { paymentRef },
    });
    return response.data;
  },

  // Get by action
  getByAction: async (action) => {
    const response = await axiosInstance.get('/api/audit', {
      params: { action },
    });
    return response.data;
  },
};
