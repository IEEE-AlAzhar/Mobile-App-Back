import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

import logout from "@modules/users/services/logout.service";

interface Prop {
  isVisible: boolean,
  toggleSidebar(event: React.MouseEvent<HTMLButtonElement>): void;
}

export default class AdminHeader extends Component<Prop> {
  logoutUser: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = () => {
    logout().then(() => {
      window.location.href = "/admin/login";
    });
  };

  render() {
    return (
      <nav className="navbar admin-header navbar-expand-lg">
        <button
          className="btn text-muted nav-item d-lg-none"
          style={{ marginLeft: this.props.isVisible && "245px" }}
          onClick={this.props.toggleSidebar}
        >
          <FontAwesomeIcon
            size="lg"
            icon={this.props.isVisible ? faTimes : faBars}
          />
        </button>
        <ul className="navbar-nav ml-auto">
          {JSON.parse(localStorage.getItem("user")) && (
            <li className="nav-item text-muted pt-1">
              {JSON.parse(localStorage.getItem("user")).name}
            </li>
          )}

          <li className="nav-item">
            <button className="btn btn-link text-muted" onClick={this.logoutUser}>
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
