import React, { Component } from "react";

import "./style.css";

import AdminLayout from "shared/admin-layout";
import UserService from "modules/users/services/user.service";

interface Prop {
  history: {
    push: (path: string) => void;
  };
}

export default class AdminHome extends Component<Prop> {
  public _userService: UserService;
  constructor(props: Prop) {
    super(props);
    this._userService = new UserService();
  }

  async componentDidMount() {
    if (!this._userService.isUserLoggedIn()) this.props.history.push("/login");
  }

  render() {
    return (
      <AdminLayout>
        <div className="admin-home d-flex justify-content-center align-items-center">
          <header className="admin-home__header text-center">
            <h2>Welcome to Dashboard</h2>
          </header>
        </div>
      </AdminLayout>
    );
  }
}
