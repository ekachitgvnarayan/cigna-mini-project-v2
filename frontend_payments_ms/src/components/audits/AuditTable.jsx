import { formatDateTime } from '../../utils/formatters';
import AuditRow from './AuditRow';
import './AuditTable.css';

const AuditTable = ({ audits }) => {
  if (audits.length === 0) {
    return (
      <div className="empty-state">
        <p>No audit records found.</p>
      </div>
    );
  }

  return (
    <div className="audit-table-container">
      <table className="audit-table">
        <thead>
          <tr>
            <th>Audit ID</th>
            <th>Payment Ref</th>
            <th>Action</th>
            <th>Date & Time</th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <AuditRow key={audit.auditId} audit={audit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTable;
