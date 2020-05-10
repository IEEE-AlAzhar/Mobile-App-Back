import React, { Component } from "react";

import AdminLayout from "shared/admin-layout";
import AdminTable from "shared/admin-table";
import Loading from "shared/loading";
import UserForm from "../userForm";

import UserService from "modules/users/services/user.service";
import { User } from "configurations/interfaces/user.interface";

import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Prop {
  history: {
    push: (path: string) => void;
  };
}

interface State {
  users: User[];
  userToBeEdited?: User | null;
  successAlert: string;
  errorAlert: string;
  isLoading: boolean;
  isCreateModalOpened: boolean;
  isSubmitting: boolean;
  idOfItemToBeDeleted: string;
}

export default class UsersListPage extends Component<Prop, State> {
  tableConfig = {
    tableHeaders: [
      { name: "name", href: "/users", params: "_id" },
      "email",
      "committee",
    ],
    className: "table-striped",
    actions: ["edit", "delete"],
  };

  state = {
    users: [] as User[],
    successAlert: "",
    errorAlert: "",
    userToBeEdited: {} as User,
    isLoading: false,
    isCreateModalOpened: false,
    isSubmitting: false,
    idOfItemToBeDeleted: "",
  };

  public _userService: UserService;
  constructor(props: Prop) {
    super(props);
    this._userService = new UserService();
  }

  async componentDidMount() {
    if (!this._userService.isUserLoggedIn())
      return this.props.history.push("/login");

    this.setState({ isLoading: true });
    try {
      let users = await this._userService.list();

      this.setState({ users, isLoading: false });
    } catch {
      this.setState({ errorAlert: "Error retrieving items", isLoading: false });
    }
  }

  createUser = (user: User) => {
    let { users } = this.state;

    this.setState({
      isSubmitting: true,
    });

    return this._userService
      .create(user)
      .then((response) => {
        users.unshift(response as never);

        this.setState({
          users,
          successAlert: "User added successfully",
          errorAlert: "",
          isCreateModalOpened: false,
          isSubmitting: false,
        });
      })
      .catch((err) => {
        this.setState({
          errorAlert: err.response.data.msg,
          successAlert: "",
          isSubmitting: false,
        });
      });
  };

  editUser = (
    user: User,
    submit: boolean,
    id = this.state.userToBeEdited._id
  ) => {
    if (submit) {
      this.setState({
        isSubmitting: true,
      });
      return this._userService
        .update(id, user)
        .then((response) => {
          this.updateStateWithNewUser(response);
          this.setState({
            isSubmitting: false,
            successAlert: "User updated successfully",
            errorAlert: "",
            userToBeEdited: {} as User,
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
        userToBeEdited: user,
      });
    }
  };

  updateStateWithNewUser = (user: User) => {
    let { users } = this.state;
    let objectToUpdateIndex: number = users.findIndex(
      (item: User) => item._id === user._id
    );

    users.splice(objectToUpdateIndex, 1, user as never);

    this.setState({ users });
  };

  removeUser = (id: string, submit?: boolean) => {
    let { users } = this.state;

    if (submit) {
      this._userService.delete(id).then(() => {
        this.setState({
          users: users.filter((item: User) => item._id !== id),
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
      users,
      successAlert,
      errorAlert,
      userToBeEdited,
      idOfItemToBeDeleted,
      isLoading,
      isCreateModalOpened,
      isSubmitting,
    } = this.state;

    return (
      <AdminLayout>
        <header className="d-flex justify-content-between container mt-5">
          <h2> Users </h2>
          <button
            className="btn btn-success"
            onClick={() => this.setState({ isCreateModalOpened: true })}
          >
            <FontAwesomeIcon icon={faPlus} /> Create New User
          </button>
        </header>
        {isLoading ? (
          <div className="text-center mt-5">
            <Loading />
          </div>
        ) : users.length > 0 ? (
          <div className="container mt-5">
            <AdminTable
              config={this.tableConfig}
              triggerEditEvent={this.editUser}
              deleteRow={this.removeUser}
              tableBody={users as any}
            />
          </div>
        ) : (
          <div className="text-center my-5">
            <p>No users yet</p>
          </div>
        )}

        {Object.keys(userToBeEdited).length > 1 && (
          <UserForm
            isModalOpened={Object.keys(userToBeEdited).length > 1}
            itemToBeEdited={userToBeEdited}
            onSubmit={this.editUser}
            isSubmitting={isSubmitting}
            closeModal={() => this.setState({ userToBeEdited: {} as User })}
          />
        )}

        <UserForm
          isModalOpened={isCreateModalOpened}
          isSubmitting={isSubmitting}
          onSubmit={this.createUser}
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
            this.removeUser(idOfItemToBeDeleted, true);
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
