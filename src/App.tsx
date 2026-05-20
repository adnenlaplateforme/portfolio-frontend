import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import CreateProjectPage from './pages/admin/CreateProjectPage';
import EditProjectPage from './pages/admin/EditProjectPage';
import PrivateRoute from './router/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
      <Route path="/admin/projects/create" element={<PrivateRoute><CreateProjectPage /></PrivateRoute>} />
      <Route path="/admin/projects/:id/edit" element={<PrivateRoute><EditProjectPage /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
