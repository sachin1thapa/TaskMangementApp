import { axiosPrivate } from '@/api/axios';
import { logout } from '@/redux/authSlice';
import { refreshTokenApi } from '@/services';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

const useAxiosInterceptor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Store the interceptor ID
    const responseInterceptorId = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log('response', response);
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Check if we received a 403 Forbidden error
        if (error.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Optionally refresh the token or perform other actions.
            await refreshTokenApi(); // This call may set a new cookie

            // Retry the original request. The cookie should be sent automatically.
            return axiosPrivate(originalRequest);
          } catch (refreshError) {
            // If token refresh fails, log out and redirect to login
            dispatch(logout());
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function to eject the interceptor
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptorId);
    };
  }, [dispatch]);
};

export default useAxiosInterceptor;
