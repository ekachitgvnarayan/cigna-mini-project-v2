import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { validateCategoryForm } from '../../utils/validators';
import './CategoryForm.css';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    categoryName: '',
    type: '',
    description: '',
    status: 'Active',
    manager: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName || '',
        type: category.type || '',
        description: category.description || '',
        status: category.status || 'Active',
        manager: category.manager || '',
      });
    }
  }, [category]);

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
    const validation = validateCategoryForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    const result = await onSubmit(formData);

    setIsSubmitting(false);

    if (result.success) {
      // Reset form if creating new
      if (!category) {
        setFormData({
          categoryName: '',
          type: '',
          description: '',
          status: 'Active',
          manager: '',
        });
      }
    } else {
      // Show error from API
      setErrors({ submit: result.error });
    }
  };

  const typeOptions = [
    { value: 'Incoming', label: 'Incoming' },
    { value: 'Outgoing', label: 'Outgoing' },
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <Input
        label="Category Name"
        name="categoryName"
        type="text"
        value={formData.categoryName}
        onChange={handleChange}
        error={errors.categoryName}
        placeholder="e.g., Hospital Bills"
        required
      />

      <Select
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={typeOptions}
        error={errors.type}
        placeholder="Select type"
        required
      />

      <Input
        label="Description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Brief description (optional)"
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
        label="Manager"
        name="manager"
        type="text"
        value={formData.manager}
        onChange={handleChange}
        error={errors.manager}
        placeholder="Responsible person (optional)"
      />

      {errors.submit && <div className="form-error">{errors.submit}</div>}

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
