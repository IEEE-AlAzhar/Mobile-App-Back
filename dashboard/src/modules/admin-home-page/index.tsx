import React, { Component } from "react";

import "./style.css";

import AdminLayout from "shared/admin-layout";

import { isUserLoggedIn } from "modules/users/services/auth.service";

interface Prop {
  history: {
    push: (path: string) => void;
  };
}

export default class AdminHome extends Component<Prop> {
  async componentDidMount() {
    // if (!isUserLoggedIn()) this.props.history.push("/admin/login");
  }

  render() {
    return (
      <AdminLayout>
        <div className="admin-home d-flex justify-content-center align-items-center">
          <p> Welcome to the dashboard ! </p>
        </div>
      </AdminLayout>
    );
  }
}
