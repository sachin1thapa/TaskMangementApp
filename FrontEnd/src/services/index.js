import { axiosPrivate } from '@/api/axios';

// Refresh token function
const refreshTokenApi = async () => {
  console.log('called refresh token api');
  await axiosPrivate.get('/user/refresh-token');
  // return response.data.accessToken;
};

export { refreshTokenApi };
