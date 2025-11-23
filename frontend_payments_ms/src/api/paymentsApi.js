import axiosInstance from './axios.config';

export const paymentsApi = {
  // Get all payments
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/api/payments', { params });
    return response.data;
  },

  // Get single payment
  getById: async (id) => {
    const response = await axiosInstance.get(`/api/payments/${id}`);
    return response.data;
  },

  // Create payment
  create: async (paymentData) => {
    const response = await axiosInstance.post('/api/payments', paymentData);
    return response.data;
  },

  // Update payment
  update: async (id, paymentData) => {
    const response = await axiosInstance.put(`/api/payments/${id}`, paymentData);
    return response.data;
  },

  // Delete payment
  delete: async (id) => {
    const response = await axiosInstance.delete(`/api/payments/${id}`);
    return response.data;
  },

  // Get by status
  getByStatus: async (status) => {
    const response = await axiosInstance.get('/api/payments', {
      params: { status },
    });
    return response.data;
  },

  // Get by category
  getByCategory: async (categoryId) => {
    const response = await axiosInstance.get('/api/payments', {
      params: { categoryId },
    });
    return response.data;
  },
};
