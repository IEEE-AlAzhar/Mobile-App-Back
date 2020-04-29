export const isUserLoggedIn = (): boolean => {
  if (localStorage.getItem("user")) return true;
  else return false;
};
