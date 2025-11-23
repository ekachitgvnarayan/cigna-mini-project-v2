import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import CategoryList from '../components/categories/CategoryList';
import CategoryForm from '../components/categories/CategoryForm';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
// import './CategoriesPage.css';

const CategoriesPage = () => {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory, fetchCategories } =
    useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const result = await deleteCategory(categoryId);
      if (result.success) {
        alert('Category deleted successfully');
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  const handleSubmit = async (formData) => {
    let result;
    if (selectedCategory) {
      result = await updateCategory(selectedCategory.categoryId, formData);
    } else {
      result = await createCategory(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
      alert(selectedCategory ? 'Category updated successfully' : 'Category created successfully');
    }

    return result;
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'type') {
      setTypeFilter(value);
      if (value) {
        await fetchCategories({ type: value });
      } else {
        await fetchCategories();
      }
    } else if (name === 'status') {
      setStatusFilter(value);
      if (value) {
        await fetchCategories({ status: value });
      } else {
        await fetchCategories();
      }
    }
  };

  const handleClearFilters = async () => {
    setTypeFilter('');
    setStatusFilter('');
    await fetchCategories();
  };

  if (loading) {
    return <Loading message="Loading categories..." />;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Categories Management</h1>
        <Button onClick={handleCreate}>+ New Category</Button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="filters-section">
        <Select
          label="Filter by Type"
          name="type"
          value={typeFilter}
          onChange={handleFilterChange}
          options={[
            { value: 'Incoming', label: 'Incoming' },
            { value: 'Outgoing', label: 'Outgoing' },
          ]}
          placeholder="All Types"
        />

        <Select
          label="Filter by Status"
          name="status"
          value={statusFilter}
          onChange={handleFilterChange}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' },
          ]}
          placeholder="All Statuses"
        />

        {(typeFilter || statusFilter) && (
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCategory ? 'Edit Category' : 'Create New Category'}
      >
        <CategoryForm
          category={selectedCategory}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;
