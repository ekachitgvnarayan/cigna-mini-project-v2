import { useState } from 'react';
import { useAudits } from '../hooks/useAudits';
import AuditTable from '../components/audits/AuditTable';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
//import './AuditPage.css';

const AuditPage = () => {
  const { audits, loading, error, fetchAudits } = useAudits();
  const [actionFilter, setActionFilter] = useState('');

  const handleFilterChange = async (e) => {
    const { value } = e.target;
    setActionFilter(value);

    if (value) {
      await fetchAudits({ action: value });
    } else {
      await fetchAudits();
    }
  };

  const handleClearFilters = async () => {
    setActionFilter('');
    await fetchAudits();
  };

  if (loading) {
    return <Loading message="Loading audit trail..." />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Audit Trail</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="filters-section">
        <Select
          label="Filter by Action"
          name="action"
          value={actionFilter}
          onChange={handleFilterChange}
          options={[
            { value: 'Created', label: 'Created' },
            { value: 'Updated', label: 'Updated' },
            { value: 'Deleted', label: 'Deleted' },
          ]}
          placeholder="All Actions"
        />

        {actionFilter && (
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      <div className="audit-summary">
        <p>Total Records: <strong>{audits.length}</strong></p>
      </div>

      <AuditTable audits={audits} />
    </div>
  );
};

export default AuditPage;
