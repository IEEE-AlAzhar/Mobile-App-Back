import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

import logout from "modules/users/services/logout.service";

interface Prop {
  isVisible: boolean;
  toggleSidebar(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default class AdminHeader extends Component<Prop> {
  logoutUser: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = () => {
    logout().then(() => {
      window.location.href = "/admin/login";
    });
  };

  render() {
    let userObject = localStorage.getItem("user");
    let user = typeof userObject === "string" && JSON.parse(userObject);
    return (
      <nav className="navbar admin-header navbar-expand-lg">
        <button
          className="btn text-muted nav-item d-lg-none"
          style={{ marginLeft: this.props.isVisible ? "245px" : "0" }}
          onClick={this.props.toggleSidebar}
        >
          <FontAwesomeIcon
            size="lg"
            icon={this.props.isVisible ? faTimes : faBars}
          />
        </button>
        <ul className="navbar-nav ml-auto">
          {user && <li className="nav-item text-muted pt-1">{user.name}</li>}

          <li className="nav-item">
            <button
              className="btn btn-link text-muted"
              onClick={this.logoutUser}
            >
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
