export default (accessToken: string) => {
  document.cookie = `access_token=${accessToken}; path=/`;
};
