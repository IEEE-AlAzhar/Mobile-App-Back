import React, { Component } from "react";

import AdminLayout from "shared/admin-layout";
import AdminTable from "shared/admin-table";
import Loading from "shared/loading";
import CommitteeForm from "../committeeForm";

import UserService from "modules/users/services/user.service";
import CommitteeService from "modules/committees/services/committee.service";
import { Committee } from "configurations/interfaces/committee.interface";

import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Prop {
  history: {
    push: (path: string) => void;
  };
}

interface State {
  committees: Committee[];
  committeeToBeEdited?: Committee | null;
  successAlert: string;
  errorAlert: string;
  isLoading: boolean;
  isCreateModalOpened: boolean;
  isSubmitting: boolean;
  idOfItemToBeDeleted: string;
}

export default class CommitteesListPage extends Component<Prop, State> {
  tableConfig = {
    tableHeaders: ["name"],
    className: "table-striped",
    actions: ["edit", "delete"],
  };

  state = {
    committees: [] as Committee[],
    successAlert: "",
    errorAlert: "",
    committeeToBeEdited: {} as Committee,
    isLoading: false,
    isCreateModalOpened: false,
    isSubmitting: false,
    idOfItemToBeDeleted: "",
  };

  public _committeeService: CommitteeService;
  public _userService: UserService;

  constructor(props: Prop) {
    super(props);
    this._committeeService = new CommitteeService();
    this._userService = new UserService();
  }

  async componentDidMount() {
    if (!this._userService.isUserLoggedIn())
      return this.props.history.push("/login");
    this.setState({ isLoading: true });
    try {
      let committees = await this._committeeService.list();

      this.setState({ committees, isLoading: false });
    } catch {
      this.setState({ errorAlert: "Error retrieving items", isLoading: false });
    }
  }

  createCommittee = (committee: Committee) => {
    let { committees } = this.state;

    this.setState({
      isSubmitting: true,
    });

    return this._committeeService
      .create(committee)
      .then((response) => {
        committees.unshift(response as never);

        this.setState({
          committees,
          successAlert: "Committee added successfully",
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

  editCommittee = (
    committee: Committee,
    submit: boolean,
    id = this.state.committeeToBeEdited._id
  ) => {
    if (submit) {
      this.setState({
        isSubmitting: true,
      });
      return this._committeeService
        .update(id, committee)
        .then((response) => {
          this.updateStateWithNewCommittee(response);
          this.setState({
            isSubmitting: false,
            successAlert: "Committee updated successfully",
            errorAlert: "",
            committeeToBeEdited: {} as Committee,
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
        committeeToBeEdited: committee,
      });
    }
  };

  updateStateWithNewCommittee = (committee: Committee) => {
    let { committees } = this.state;
    let objectToUpdateIndex: number = committees.findIndex(
      (item: Committee) => item._id === committee._id
    );

    committees.splice(objectToUpdateIndex, 1, committee as never);

    this.setState({ committees });
  };

  removeCommittee = (id: string, submit?: boolean) => {
    let { committees } = this.state;

    if (submit) {
      this._committeeService
        .delete(id)
        .then(() => {
          this.setState({
            committees: committees.filter((item: Committee) => item._id !== id),
          });
        })
        .catch((err) => {
          this.setState({
            errorAlert: err.response.data.msg,
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
      committees,
      successAlert,
      errorAlert,
      committeeToBeEdited,
      idOfItemToBeDeleted,
      isLoading,
      isCreateModalOpened,
      isSubmitting,
    } = this.state;

    return (
      <AdminLayout>
        <header className="d-flex justify-content-between container mt-5">
          <h2> Committees </h2>
          <button
            className="btn btn-success"
            onClick={() => this.setState({ isCreateModalOpened: true })}
          >
            <FontAwesomeIcon icon={faPlus} /> Create New Committee
          </button>
        </header>
        {isLoading ? (
          <div className="text-center mt-5">
            <Loading />
          </div>
        ) : committees.length > 0 ? (
          <div className="container mt-5">
            <AdminTable
              config={this.tableConfig}
              triggerEditEvent={this.editCommittee}
              deleteRow={this.removeCommittee}
              tableBody={committees as any}
            />
          </div>
        ) : (
          <div className="text-center my-5">
            <p>No committees yet</p>
          </div>
        )}

        {Object.keys(committeeToBeEdited).length > 1 && (
          <CommitteeForm
            isModalOpened={Object.keys(committeeToBeEdited).length > 1}
            itemToBeEdited={committeeToBeEdited}
            onSubmit={this.editCommittee}
            isSubmitting={isSubmitting}
            closeModal={() =>
              this.setState({ committeeToBeEdited: {} as Committee })
            }
          />
        )}

        <CommitteeForm
          isModalOpened={isCreateModalOpened}
          isSubmitting={isSubmitting}
          onSubmit={this.createCommittee}
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
            this.removeCommittee(idOfItemToBeDeleted, true);
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
