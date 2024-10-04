export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};
export const getUserDetails = (): any => {
  const userDetails = localStorage.getItem('user_details');
  return userDetails ? JSON.parse(userDetails) : null;
};
