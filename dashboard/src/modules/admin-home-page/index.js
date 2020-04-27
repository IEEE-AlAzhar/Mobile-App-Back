import React, { Component } from "react";

import "./style.css";

import AdminLayout from "shared/admin-layout";

import isUserLoggedIn from "modules/users/services/auth.service";

export default class DashboardHome extends Component {
  async componentDidMount() {
    isUserLoggedIn().then(response => {
      if (!response) {
        this.props.history.push("/admin/login");
      }
    });
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
