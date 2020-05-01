import React, { Component } from "react";

import AdminLayout from "shared/admin-layout";
import AdminTable from "shared/admin-table";
import Loading from "shared/loading";

import {
  getAnnouncements,
  updateAnnouncement,
} from "modules/announcements/services/announcement.service";
import { Announcement } from "globals/interfaces/announcements.interface";

interface State {
  announcements: Announcement[];
}

export default class AnnouncementsListPage extends Component<{}, State> {
  tableHeaders: string[] = ["title", "type", "date"];
  config = {
    actions: ["edit", "delete"],
    filters: [this.filterByName],
  };

  state = {
    announcements: [],
  };

  async componentDidMount() {
    let announcements = await getAnnouncements();

    this.setState({ announcements });
  }

  updateAnnouncements = (announcement: Announcement) => {
    let { announcements } = this.state;
    let objectToUpdateIndex: number = announcements.findIndex(
      (item: Announcement) => item._id === announcement._id
    );

    announcements.splice(objectToUpdateIndex, 1, announcement as never);

    this.setState({ announcements });
  };

  filterByName(filterKey: string) {
    this.setState({});
  }

  render() {
    let { announcements } = this.state;

    return (
      <AdminLayout>
        <h2> Announcements </h2>
        {announcements ? (
          <AdminTable
            headers={this.tableHeaders}
            config={this.config}
            body={announcements as any}
          />
        ) : (
          <Loading />
        )}
      </AdminLayout>
    );
  }
}
