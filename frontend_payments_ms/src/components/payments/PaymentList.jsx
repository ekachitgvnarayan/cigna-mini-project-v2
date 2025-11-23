import PaymentCard from './PaymentCard';
import './PaymentList.css';

const PaymentList = ({ payments, onEdit, onDelete }) => {
  if (payments.length === 0) {
    return (
      <div className="empty-state">
        <p>No payments found.</p>
        <p className="empty-state-hint">Create a new payment to get started.</p>
      </div>
    );
  }

  return (
    <div className="payment-list">
      {payments.map((payment) => (
        <PaymentCard
          key={payment.paymentId}
          payment={payment}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PaymentList;
