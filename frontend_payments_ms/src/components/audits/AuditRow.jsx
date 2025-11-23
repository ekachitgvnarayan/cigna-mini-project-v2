import { formatDateTime } from '../../utils/formatters';
import './AuditRow.css';

const AuditRow = ({ audit }) => {
  const getActionClass = (action) => {
    switch (action) {
      case 'Created':
        return 'action-created';
      case 'Updated':
        return 'action-updated';
      case 'Deleted':
        return 'action-deleted';
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    return status === 'Completed' ? 'status-completed' : 'status-pending';
  };

  return (
    <tr className="audit-row">
      <td>{audit.auditId}</td>
      <td className="payment-ref">{audit.paymentRef}</td>
      <td>
        <span className={`action-badge ${getActionClass(audit.action)}`}>
          {audit.action}
        </span>
      </td>
      <td>{formatDateTime(audit.date)}</td>
      <td>{audit.user}</td>
      <td>
        <span className={`status-badge ${getStatusClass(audit.status)}`}>
          {audit.status}
        </span>
      </td>
    </tr>
  );
};

export default AuditRow;
