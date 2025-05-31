import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token); // ✅ use correct method
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.clear();
        setIsAuthorized(false);
        return;
      }

      const actualRole = role.startsWith('ROLE_') ? role : `ROLE_${role.toUpperCase()}`;
      const allowedNormalized = allowedRoles.map(r =>
        r.startsWith('ROLE_') ? r : `ROLE_${r.toUpperCase()}`
      );

      setIsAuthorized(allowedNormalized.includes(actualRole));
    } catch (error) {
      console.error('Error decoding token:', error);
      setIsAuthorized(false);
    }
  }, [allowedRoles]);

  if (isAuthorized === null) return <div>Loading...</div>;
  if (!isAuthorized) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
