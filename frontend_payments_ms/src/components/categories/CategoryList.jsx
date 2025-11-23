import CategoryCard from './CategoryCard';
import './CategoryList.css';

const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div className="empty-state">
        <p>No categories found.</p>
        <p className="empty-state-hint">Create a new category to get started.</p>
      </div>
    );
  }

  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryCard
          key={category.categoryId}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryList;
