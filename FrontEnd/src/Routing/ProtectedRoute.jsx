import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const userdata = useSelector((state) => state.auth);
  console.log(userdata);
  const location = useLocation();

  if (!userdata?.islogedin || !userdata.userInfo) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
