import React, { Component } from "react";

import "./style.css";

import { NavLink } from "react-router-dom";

import adminRoutes from "globals/admin-routes.js";

export default class AdminSidebar extends Component {
  renderAdminRoutes = () => {
    return adminRoutes.map((adRoute, index) => {
      if (adRoute.label) {
        return (
          <li key={index} className="sidebarItem">
            <NavLink exact to={`/admin${adRoute.path}`}>
              {adRoute.label}
            </NavLink>
          </li>
        );
      } else return "";
    });
  };

  render() {
    return (
      <aside
        className="adminSidebar"
        style={{ left: !this.props.visible && "-245px" }}
      >
        <h1> Admin Dashboard </h1>
        <ul className="list-unstyled mt-2">{this.renderAdminRoutes()}</ul>
      </aside>
    );
  }
}
