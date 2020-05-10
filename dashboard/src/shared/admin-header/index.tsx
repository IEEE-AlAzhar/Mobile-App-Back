import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import UserService from "modules/users/services/user.service";

import "./style.css";

interface Prop {
  isVisible: boolean;
  toggleSidebar(event: React.MouseEvent<HTMLButtonElement>): void;
}                                             

export default class AdminHeader extends Component<Prop> {
  public _userService: UserService;
  constructor(props: Prop) {
    super(props);
    this._userService = new UserService();
  }

  logoutUser: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = () => {
    this._userService.logout().then(() => {
      window.location.href = "/login";
    });
  };

  render() {
    return (
      <nav className="navbar admin-header navbar-expand-lg">
        <button
          className="btn text-muted nav-item d-md-none"
          style={{ marginLeft: this.props.isVisible ? "245px" : "0" }}
          onClick={this.props.toggleSidebar}
        >
          <FontAwesomeIcon
            size="lg"
            icon={this.props.isVisible ? faTimes : faBars}
          />
        </button>
        <ul className="navbar-nav ml-auto">
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
