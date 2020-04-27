export default async () => {
  if (localStorage.getItem("user")) return true;
  else return false;
};
