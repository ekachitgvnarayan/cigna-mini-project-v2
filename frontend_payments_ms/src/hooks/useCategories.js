import { useState, useEffect } from 'react';
import { categoriesApi } from '../api/categoriesApi';

export const useCategories = (initialFilter = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async (filter = initialFilter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriesApi.getAll(filter);
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await categoriesApi.create(categoryData);
      setCategories((prev) => [newCategory, ...prev]);
      return { success: true, data: newCategory };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create category';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await categoriesApi.update(id, categoryData);
      setCategories((prev) =>
        prev.map((category) => (category.categoryId === id ? updatedCategory : category))
      );
      return { success: true, data: updatedCategory };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update category';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deleteCategory = async (id) => {
    try {
      await categoriesApi.delete(id);
      setCategories((prev) => prev.filter((category) => category.categoryId !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete category';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
