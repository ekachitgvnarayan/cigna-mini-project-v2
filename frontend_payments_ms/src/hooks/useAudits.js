import { useState, useEffect } from 'react';
import { auditsApi } from '../api/auditsApi';

export const useAudits = (initialFilter = {}) => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAudits = async (filter = initialFilter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await auditsApi.getAll(filter);
      setAudits(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch audits');
      console.error('Error fetching audits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  return {
    audits,
    loading,
    error,
    fetchAudits,
  };
};
