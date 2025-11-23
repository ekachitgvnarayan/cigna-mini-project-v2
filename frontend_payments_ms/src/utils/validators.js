// Validate payment form
export const validatePaymentForm = (formData) => {
  const errors = {};

  if (!formData.amount || formData.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!formData.categoryId) {
    errors.categoryId = 'Category is required';
  }

  if (!formData.date) {
    errors.date = 'Date is required';
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  }

  if (!formData.referenceNo || formData.referenceNo.trim() === '') {
    errors.referenceNo = 'Reference number is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate category form
export const validateCategoryForm = (formData) => {
  const errors = {};

  if (!formData.categoryName || formData.categoryName.trim() === '') {
    errors.categoryName = 'Category name is required';
  }

  if (!formData.type) {
    errors.type = 'Type is required';
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
