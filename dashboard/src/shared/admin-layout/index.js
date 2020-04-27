import React, { Component } from "react";
import AdminHeader from "../admin-header";
import AdminSidebar from "../admin-sidebar";

import "./style.css";

export default class AdminLayout extends Component {
  state = {
    isSidebarVisible: true
  };

  toggleSidebar = () => {
    this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
  };

  render() {
    return (
      <>
        <AdminHeader
          toggleSidebar={this.toggleSidebar}
          visible={this.state.isSidebarVisible}
        />
        <main className="admin-main">{this.props.children}</main>
        <AdminSidebar
          toggleSidebar={this.toggleSidebar}
          visible={this.state.isSidebarVisible}
        />
      </>
    );
  }
}
