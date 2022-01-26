import { useAuthLoading, useAuthUser } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loading } from '../../components';

export default function RequireAuth({ children }) {
  const authUser = useAuthUser();
  const authLoading = useAuthLoading();
  if (authLoading) {
    return <Loading message="Loading start" />;
  }

  if (authUser !== null) {
    return children;
  }
  // window.alert('Please sign in to have your recipes saved!');
  return <Navigate to="/" replace />;
}
