import { Routes, Route, Navigate } from 'react-router-dom';
import PaymentsPage from './pages/PaymentsPage';
import CategoriesPage from './pages/CategoriesPage';
import AuditPage from './pages/AuditPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/payments" replace />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="*" element={<Navigate to="/payments" replace />} />
    </Routes>
  );
};

export default AppRoutes;
