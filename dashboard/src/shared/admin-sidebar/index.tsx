import React, { Component } from "react";

import "./style.css";

import { NavLink } from "react-router-dom";

import { adminRoutes } from "configurations/admin-routes";
import { RouteStructure } from "configurations/interfaces/route.interface";

interface Prop {
  isVisible: boolean;
}

export default class AdminSidebar extends Component<Prop> {
  renderAdminRoutes = () => {
    let { type } = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "";
    return adminRoutes.map((adRoute: RouteStructure, index: number) => {
      if (adRoute.label) {
        if (type === "Board" && !adRoute.adminOnly) {
          return (
            <li key={index} className="sidebarItem">
              <NavLink exact to={adRoute.path}>
                {adRoute.label}
              </NavLink>
            </li>
          );
        } else if (type === "Admin") {
          return (
            <li key={index} className="sidebarItem">
              <NavLink exact to={adRoute.path}>
                {adRoute.label}
              </NavLink>
            </li>
          );
        } else return "";
      } else return "";
    });
  };

  render() {
    return (
      <aside
        className="adminSidebar text-center"
        style={{ left: !this.props.isVisible ? "-245px" : "0" }}
      >
        <h1> Admin Dashboard </h1>
        <ul className="list-unstyled mt-2">{this.renderAdminRoutes()}</ul>
      </aside>
    );
  }
}
