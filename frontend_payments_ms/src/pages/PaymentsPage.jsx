import { useState } from 'react';
import { usePayments } from '../hooks/usePayments';
import { useCategories } from '../hooks/useCategories';
import PaymentList from '../components/payments/PaymentList';
import PaymentForm from '../components/payments/PaymentForm';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
import './PaymentsPage.css';

const PaymentsPage = () => {
  const { payments, loading, error, createPayment, updatePayment, deletePayment, fetchPayments } =
    usePayments();
  const { categories } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleCreate = () => {
    setSelectedPayment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleDelete = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      const result = await deletePayment(paymentId);
      if (result.success) {
        alert('Payment deleted successfully');
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  const handleSubmit = async (formData) => {
    let result;
    if (selectedPayment) {
      result = await updatePayment(selectedPayment.paymentId, formData);
    } else {
      result = await createPayment(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
      alert(selectedPayment ? 'Payment updated successfully' : 'Payment created successfully');
    }

    return result;
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'status') {
      setStatusFilter(value);
      if (value) {
        await fetchPayments({ status: value });
      } else {
        await fetchPayments();
      }
    } else if (name === 'category') {
      setCategoryFilter(value);
      if (value) {
        await fetchPayments({ categoryId: value });
      } else {
        await fetchPayments();
      }
    }
  };

  const handleClearFilters = async () => {
    setStatusFilter('');
    setCategoryFilter('');
    await fetchPayments();
  };

  if (loading) {
    return <Loading message="Loading payments..." />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Payments Management</h1>
        <Button onClick={handleCreate}>+ New Payment</Button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="filters-section">
        <Select
          label="Filter by Status"
          name="status"
          value={statusFilter}
          onChange={handleFilterChange}
          options={[
            { value: 'Pending', label: 'Pending' },
            { value: 'Completed', label: 'Completed' },
          ]}
          placeholder="All Statuses"
        />

        <Select
          label="Filter by Category"
          name="category"
          value={categoryFilter}
          onChange={handleFilterChange}
          options={categories.map((cat) => ({
            value: cat.categoryId,
            label: cat.categoryName,
          }))}
          placeholder="All Categories"
        />

        {(statusFilter || categoryFilter) && (
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      <PaymentList payments={payments} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPayment ? 'Edit Payment' : 'Create New Payment'}
      >
        <PaymentForm
          payment={selectedPayment}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default PaymentsPage;
