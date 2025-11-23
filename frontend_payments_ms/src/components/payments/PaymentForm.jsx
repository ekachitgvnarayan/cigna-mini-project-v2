import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { validatePaymentForm } from '../../utils/validators';
import { formatDateForInput } from '../../utils/formatters';
import './PaymentForm.css';

const PaymentForm = ({ payment, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: '',
    categoryId: '',
    date: formatDateForInput(new Date()),
    status: 'Pending',
    referenceNo: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (payment) {
      setFormData({
        amount: payment.amount || '',
        categoryId: payment.categoryId || '',
        date: formatDateForInput(payment.date),
        status: payment.status || 'Pending',
        referenceNo: payment.referenceNo || '',
      });
    }
  }, [payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validatePaymentForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Convert amount to number and categoryId to number
    const submitData = {
      ...formData,
      amount: parseFloat(formData.amount),
      categoryId: parseInt(formData.categoryId, 10),
    };

    const result = await onSubmit(submitData);

    setIsSubmitting(false);

    if (result.success) {
      // Reset form if creating new
      if (!payment) {
        setFormData({
          amount: '',
          categoryId: '',
          date: formatDateForInput(new Date()),
          status: 'Pending',
          referenceNo: '',
        });
      }
    } else {
      // Show error from API
      setErrors({ submit: result.error });
    }
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat.categoryId,
    label: `${cat.categoryName} (${cat.type})`,
  }));

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <Input
        label="Amount"
        name="amount"
        type="number"
        step="0.01"
        value={formData.amount}
        onChange={handleChange}
        error={errors.amount}
        placeholder="Enter amount"
        required
      />

      <Select
        label="Category"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        options={categoryOptions}
        error={errors.categoryId}
        placeholder="Select category"
        required
      />

      <Input
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        required
      />

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={statusOptions}
        error={errors.status}
        required
      />

      <Input
        label="Reference Number"
        name="referenceNo"
        type="text"
        value={formData.referenceNo}
        onChange={handleChange}
        error={errors.referenceNo}
        placeholder="e.g., PAY-001"
        required
        disabled={!!payment} // Disable editing reference number
      />

      {errors.submit && <div className="form-error">{errors.submit}</div>}

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : payment ? 'Update Payment' : 'Create Payment'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
