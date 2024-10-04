// Function to set the access token in localStorage
export const setAccessToken = (accessToken: string) => {
  document.cookie = `access_token=${accessToken}; path=/`;
};

// Function to set user details in localStorage
export const setUserDetails = (data: any) => {
  localStorage.setItem("user_details", JSON.stringify(data));
};
