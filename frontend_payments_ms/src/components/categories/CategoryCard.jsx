import Card from '../common/Card';
import Button from '../common/Button';
import './CategoryCard.css';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const getTypeClass = (type) => {
    return type === 'Incoming' ? 'type-incoming' : 'type-outgoing';
  };

  const getStatusClass = (status) => {
    return status === 'Active' ? 'status-active' : 'status-inactive';
  };

  return (
    <Card className="category-card">
      <div className="category-card-header">
        <h3 className="category-name">{category.categoryName}</h3>
        <div className="category-badges">
          <span className={`type-badge ${getTypeClass(category.type)}`}>
            {category.type}
          </span>
          <span className={`status-badge ${getStatusClass(category.status)}`}>
            {category.status}
          </span>
        </div>
      </div>

      <div className="category-card-body">
        {category.description && (
          <p className="category-description">{category.description}</p>
        )}

        <div className="category-details">
          {category.manager && (
            <div className="detail-row">
              <span className="detail-label">Manager:</span>
              <span className="detail-value">{category.manager}</span>
            </div>
          )}
          <div className="detail-row">
            <span className="detail-label">ID:</span>
            <span className="detail-value">{category.categoryId}</span>
          </div>
        </div>
      </div>

      <div className="category-card-footer">
        <Button variant="secondary" size="small" onClick={() => onEdit(category)}>
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={() => onDelete(category.categoryId)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default CategoryCard;
