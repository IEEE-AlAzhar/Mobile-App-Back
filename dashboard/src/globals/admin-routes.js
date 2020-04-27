import LoginPage from "modules/users/login";
import DashboardHome from "modules/admin-home-page";

export default [
  {
    path: "/",
    label: "Home",
    component: DashboardHome,
  },
  {
    path: "/login",
    component: LoginPage,
  }
];
