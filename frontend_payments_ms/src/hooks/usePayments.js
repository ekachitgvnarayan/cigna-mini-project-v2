import { useState, useEffect } from 'react';
import { paymentsApi } from '../api/paymentsApi';

export const usePayments = (initialFilter = {}) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async (filter = initialFilter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await paymentsApi.getAll(filter);
      setPayments(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch payments');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (paymentData) => {
    try {
      const newPayment = await paymentsApi.create(paymentData);
      setPayments((prev) => [newPayment, ...prev]);
      return { success: true, data: newPayment };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create payment';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updatePayment = async (id, paymentData) => {
    try {
      const updatedPayment = await paymentsApi.update(id, paymentData);
      setPayments((prev) =>
        prev.map((payment) => (payment.paymentId === id ? updatedPayment : payment))
      );
      return { success: true, data: updatedPayment };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update payment';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deletePayment = async (id) => {
    try {
      await paymentsApi.delete(id);
      setPayments((prev) => prev.filter((payment) => payment.paymentId !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete payment';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    updatePayment,
    deletePayment,
  };
};
