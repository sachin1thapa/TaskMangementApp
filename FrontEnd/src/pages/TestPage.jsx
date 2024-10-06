import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/authSlice';
import { axiosPrivate } from '@/api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

function TestPage() {
  const [userinfo, setUserinfo] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const userdata = await axiosPrivate.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/current-user`,
          {
            signal: controller.signal,
          }
        );
        console.log(userdata.data.data);
        isMounted && setUserinfo(userdata.data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        // navigate('/auth/sign-in', { state: { from: location }, replace: true });
      }
    };

    getUsers();
    // dispatch(logout());

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      {userinfo && (
        <div>
          <div>{userinfo?.email}</div>
          <div>{userinfo?.gender}</div>
        </div>
      )}
    </>
  );
}
export default TestPage;
