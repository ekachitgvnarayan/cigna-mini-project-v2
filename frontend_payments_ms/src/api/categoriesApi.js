import axiosInstance from './axios.config';

export const categoriesApi = {
  // Get all categories
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/api/categories', { params });
    return response.data;
  },

  // Get single category
  getById: async (id) => {
    const response = await axiosInstance.get(`/api/categories/${id}`);
    return response.data;
  },

  // Create category
  create: async (categoryData) => {
    const response = await axiosInstance.post('/api/categories', categoryData);
    return response.data;
  },

  // Update category
  update: async (id, categoryData) => {
    const response = await axiosInstance.put(`/api/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete category
  delete: async (id) => {
    const response = await axiosInstance.delete(`/api/categories/${id}`);
    return response.data;
  },

  // Get by type
  getByType: async (type) => {
    const response = await axiosInstance.get('/api/categories', {
      params: { type },
    });
    return response.data;
  },

  // Get by status
  getByStatus: async (status) => {
    const response = await axiosInstance.get('/api/categories', {
      params: { status },
    });
    return response.data;
  },
};
