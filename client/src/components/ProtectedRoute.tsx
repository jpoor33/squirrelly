import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('loginToken');

  if (!token) {
    // If no token, redirect to SignIn.tsx
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;
