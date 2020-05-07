export const isUserLoggedIn = (): boolean => {
  if (localStorage.getItem("token")) return true;
  else return false;
};
