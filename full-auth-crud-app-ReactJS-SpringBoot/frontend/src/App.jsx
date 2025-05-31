import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import VerifySuccess from './components/Auth/VerifySuccess';
import VerifyFailed from './components/Auth/VerifyFailed';
import VerifyEmail from './components/Auth/VerifyEmail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Password & Email Verification */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-success" element={<VerifySuccess />} />
      <Route path="/verify-failed" element={<VerifyFailed />} />

      {/* ✅ Use ROLE_ prefixed roles in ProtectedRoute */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={['ROLE_USER']}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
