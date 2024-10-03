export const callRegisterApi = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  const Fetcheddata = await response.json();
  return Fetcheddata;
};
