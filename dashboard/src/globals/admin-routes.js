import LoginPage from "modules/users/login";
import BlogAdminPage from "modules/blog/admin-page";
import MessagesPage from "modules/contact/messages-admin-page";
import DashboardHome from "modules/admin-home-page";
import ProjectsAdminPage from "modules/projects/admin-page";

export default [
  {
    path: "/",
    label: "Home",
    component: DashboardHome,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/projects",
    label: "Projects",
    component: ProjectsAdminPage,
  },
  {
    path: "/blog",
    label: "Blog",
    component: BlogAdminPage,
  },
  {
    path: "/messages",
    label: "Messages",
    component: MessagesPage,
  },
];
