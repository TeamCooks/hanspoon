import { useAuthUser } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const authUser = useAuthUser();
  console.log(authUser);
  if (!authUser) {
    window.alert('Please sign in to have your recipes saved!');
    return <Navigate to="/" replace />;
  }

  return children;
}
