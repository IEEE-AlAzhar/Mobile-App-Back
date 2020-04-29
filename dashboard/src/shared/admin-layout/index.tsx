import React, { Component } from "react";
import AdminHeader from "../admin-header";
import AdminSidebar from "../admin-sidebar";

import "./style.css";

interface State {
  isSidebarVisible: boolean;
}

export default class AdminLayout extends Component<{ children }, State> {
  state = {
    isSidebarVisible: true,
  };

  toggleSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void = () => {
    this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
  };

  render() {
    return (
      <>
        <AdminHeader
          toggleSidebar={this.toggleSidebar}
          isVisible={this.state.isSidebarVisible}
        />
        <main className="admin-main">{this.props.children}</main>
        <AdminSidebar
          isVisible={this.state.isSidebarVisible}
        />
      </>
    );
  }
}
