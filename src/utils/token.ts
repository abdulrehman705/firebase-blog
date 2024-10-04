// Function to set the access token in localStorage
export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};

// Function to set user details in localStorage
export const setUserDetails = (data: any) => {
  localStorage.setItem('user_details', JSON.stringify(data));
};


