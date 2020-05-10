import React, { Component } from "react";

import AdminLayout from "shared/admin-layout";
import AdminTable from "shared/admin-table";
import Loading from "shared/loading";
import AnnouncementForm from "../form";

import UserService from "modules/users/services/user.service";
import AnnouncementService from "modules/announcements/services/announcement.service";
import { Announcement } from "configurations/interfaces/announcement.interface";

import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Prop {
  history: {
    push: (path: string) => void;
  };
}

interface State {
  announcements: Announcement[];
  announcementToBeEdited?: Announcement | null;
  successAlert: string;
  errorAlert: string;
  isLoading: boolean;
  isCreateModalOpened: boolean;
  isSubmitting: boolean;
  idOfItemToBeDeleted: string;
}

export default class AnnouncementsListPage extends Component<Prop, State> {
  tableConfig = {
    tableHeaders: ["title", "type"],
    className: "table-striped",
    actions: ["edit", "delete"],
  };

  state = {
    announcements: [] as Announcement[],
    successAlert: "",
    errorAlert: "",
    announcementToBeEdited: {} as Announcement,
    isLoading: false,
    isCreateModalOpened: false,
    isSubmitting: false,
    idOfItemToBeDeleted: "",
  };

  public _announcementService: AnnouncementService;
  public _userService: UserService;

  constructor(props: Prop) {
    super(props);
    this._announcementService = new AnnouncementService();
    this._userService = new UserService();
  }

  async componentDidMount() {
    if (!this._userService.isUserLoggedIn())
      return this.props.history.push("/login");
    this.setState({ isLoading: true });
    try {
      let announcements = await this._announcementService.list();

      this.setState({ announcements, isLoading: false });
    } catch {
      this.setState({ errorAlert: "Error retrieving items", isLoading: false });
    }
  }

  createAnnouncement = (announcement: Announcement) => {
    let { announcements } = this.state;

    this.setState({
      isSubmitting: true,
    });

    return this._announcementService
      .create(announcement)
      .then((response) => {
        announcements.unshift(response as never);

        this.setState({
          announcements,
          successAlert: "Announcement added successfully",
          errorAlert: "",
          isCreateModalOpened: false,
          isSubmitting: false,
        });
      })
      .catch((err) => {
        this.setState({
          errorAlert: "An error occurred",
          successAlert: "",
          isSubmitting: false,
        });
      });
  };

  editAnnouncement = (
    announcement: Announcement,
    submit: boolean,
    id = this.state.announcementToBeEdited._id
  ) => {
    if (submit) {
      this.setState({
        isSubmitting: true,
      });
      return this._announcementService
        .update(id, announcement)
        .then((response) => {
          this.updateStateWithNewAnnouncement(response);
          this.setState({
            isSubmitting: false,
            successAlert: "Announcement updated successfully",
            errorAlert: "",
            announcementToBeEdited: {} as Announcement,
          });
        })
        .catch((err) => {
          this.setState({
            errorAlert: err.response.data.msg,
          });
        });
    } else {
      this.setState({
        isSubmitting: false,
        announcementToBeEdited: announcement,
      });
    }
  };

  updateStateWithNewAnnouncement = (announcement: Announcement) => {
    let { announcements } = this.state;
    let objectToUpdateIndex: number = announcements.findIndex(
      (item: Announcement) => item._id === announcement._id
    );

    announcements.splice(objectToUpdateIndex, 1, announcement as never);

    this.setState({ announcements });
  };

  removeAnnouncement = (id: string, submit?: boolean) => {
    let { announcements } = this.state;

    if (submit) {
      this._announcementService.delete(id).then(() => {
        this.setState({
          announcements: announcements.filter(
            (item: Announcement) => item._id !== id
          ),
        });
      });
    } else {
      this.setState({
        idOfItemToBeDeleted: id,
      });
    }
  };

  render() {
    let {
      announcements,
      successAlert,
      errorAlert,
      announcementToBeEdited,
      idOfItemToBeDeleted,
      isLoading,
      isCreateModalOpened,
      isSubmitting,
    } = this.state;

    return (
      <AdminLayout>
        <header className="d-flex justify-content-between container mt-5">
          <h2> Announcements </h2>
          <button
            className="btn btn-success"
            onClick={() => this.setState({ isCreateModalOpened: true })}
          >
            <FontAwesomeIcon icon={faPlus} /> Create New Announcement
          </button>
        </header>
        {isLoading ? (
          <div className="text-center mt-5">
            <Loading />
          </div>
        ) : announcements.length > 0 ? (
          <div className="container mt-5">
            <AdminTable
              config={this.tableConfig}
              triggerEditEvent={this.editAnnouncement}
              deleteRow={this.removeAnnouncement}
              tableBody={announcements as any}
            />
          </div>
        ) : (
          <div className="text-center my-5">
            <p>No Announcements yet</p>
          </div>
        )}

        {Object.keys(announcementToBeEdited).length > 1 && (
          <AnnouncementForm
            isModalOpened={Object.keys(announcementToBeEdited).length > 1}
            itemToBeEdited={announcementToBeEdited}
            onSubmit={this.editAnnouncement}
            isSubmitting={isSubmitting}
            closeModal={() =>
              this.setState({ announcementToBeEdited: {} as Announcement })
            }
          />
        )}

        <AnnouncementForm
          isModalOpened={isCreateModalOpened}
          isSubmitting={isSubmitting}
          onSubmit={this.createAnnouncement}
          closeModal={() => this.setState({ isCreateModalOpened: false })}
        />

        <SweetAlert
          show={!!successAlert}
          success
          title={successAlert || " "}
          timeout={2000}
          onConfirm={() => this.setState({ successAlert: null })}
        />

        <SweetAlert
          show={!!errorAlert}
          warning
          title="An error occurred"
          timeout={2000}
          onConfirm={() => this.setState({ errorAlert: null })}
        >
          {errorAlert}
        </SweetAlert>

        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={() => {
            this.removeAnnouncement(idOfItemToBeDeleted, true);
            this.setState({ idOfItemToBeDeleted: "" });
          }}
          onCancel={() => this.setState({ idOfItemToBeDeleted: "" })}
          focusCancelBtn
          show={!!idOfItemToBeDeleted}
        >
          You will not be able to recover this item !
        </SweetAlert>
      </AdminLayout>
    );
  }
}
