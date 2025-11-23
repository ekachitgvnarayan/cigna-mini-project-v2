import { formatCurrency, formatDate } from '../../utils/formatters';
import Card from '../common/Card';
import Button from '../common/Button';
import './PaymentCard.css';

const PaymentCard = ({ payment, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    return status === 'Completed' ? 'status-completed' : 'status-pending';
  };

  return (
    <Card className="payment-card">
      <div className="payment-card-header">
        <div className="payment-reference">
          <span className="label">Ref:</span>
          <span className="value">{payment.referenceNo}</span>
        </div>
        <span className={`status-badge ${getStatusClass(payment.status)}`}>
          {payment.status}
        </span>
      </div>

      <div className="payment-card-body">
        <div className="payment-amount">
          <span className="currency-symbol">₹</span>
          <span className="amount">{formatCurrency(payment.amount)}</span>
        </div>

        <div className="payment-details">
          <div className="detail-row">
            <span className="detail-label">Category:</span>
            <span className="detail-value">
              {payment.category?.categoryName || 'N/A'}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Type:</span>
            <span className="detail-value">
              {payment.category?.type || 'N/A'}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{formatDate(payment.date)}</span>
          </div>
        </div>
      </div>

      <div className="payment-card-footer">
        <Button variant="secondary" size="small" onClick={() => onEdit(payment)}>
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={() => onDelete(payment.paymentId)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default PaymentCard;
