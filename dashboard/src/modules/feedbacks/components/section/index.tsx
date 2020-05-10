import React, { Component } from "react";

import AdminTable from "shared/admin-table";
import Loading from "shared/loading";
import FeedbackForm from "../form";

import FeedbackService from "modules/feedbacks/services/feedbacks.service";
import { Feedback } from "configurations/interfaces/feedback.interface";

import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Prop {
  feedbacks: Feedback[];
  userId: string;
}

interface State {
  feedbacks: Feedback[];
  feedbackToBeEdited?: Feedback | null;
  successAlert: string;
  errorAlert: string;
  isLoading: boolean;
  isCreateModalOpened: boolean;
  isSubmitting: boolean;
  idOfItemToBeDeleted: string;
}

export default class FeedbacksList extends Component<Prop, State> {
  tableConfig = {
    tableHeaders: ["title"],
    className: "table-striped",
    actions: ["edit", "delete"],
  };

  state = {
    feedbacks: this.props.feedbacks,
    successAlert: "",
    errorAlert: "",
    feedbackToBeEdited: {} as Feedback,
    isLoading: false,
    isCreateModalOpened: false,
    isSubmitting: false,
    idOfItemToBeDeleted: "",
  };

  public _feedbackService: FeedbackService;

  constructor(props: Prop) {
    super(props);
    this._feedbackService = new FeedbackService();
  }

  createFeedback = (feedback: Feedback) => {
    let { feedbacks } = this.state;

    this.setState({
      isSubmitting: true,
    });

    return this._feedbackService
      .create(feedback, this.props.userId)
      .then((response) => {
        feedbacks.unshift(response as never);

        this.setState({
          feedbacks,
          successAlert: "Feedback added successfully",
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

  editFeedback = (
    feedback: Feedback,
    submit: boolean,
    id = this.state.feedbackToBeEdited._id
  ) => {
    if (submit) {
      this.setState({
        isSubmitting: true,
      });
      return this._feedbackService
        .update(id, feedback)
        .then((response) => {
          this.updateStateWithNewFeedback(response);
          this.setState({
            isSubmitting: false,
            successAlert: "Feedback updated successfully",
            errorAlert: "",
            feedbackToBeEdited: {} as Feedback,
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
        feedbackToBeEdited: feedback,
      });
    }
  };

  updateStateWithNewFeedback = (feedback: Feedback) => {
    let { feedbacks } = this.state;
    let objectToUpdateIndex: number = feedbacks.findIndex(
      (item: Feedback) => item._id === feedback._id
    );

    feedbacks.splice(objectToUpdateIndex, 1, feedback as never);

    this.setState({ feedbacks });
  };

  removeFeedback = (id: string, submit?: boolean) => {
    let { feedbacks } = this.state;

    if (submit) {
      this._feedbackService.delete(id, this.props.userId).then(() => {
        this.setState({
          feedbacks: feedbacks.filter((item: Feedback) => item._id !== id),
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
      feedbacks,
      successAlert,
      errorAlert,
      feedbackToBeEdited,
      idOfItemToBeDeleted,
      isLoading,
      isCreateModalOpened,
      isSubmitting,
    } = this.state;

    return (
      <>
        <header className="d-flex justify-content-between container mt-5">
          <h3> Feedbacks </h3>
          <button
            className="btn btn-success"
            onClick={() => this.setState({ isCreateModalOpened: true })}
          >
            <FontAwesomeIcon icon={faPlus} /> Create New Feedback
          </button>
        </header>
        {isLoading ? (
          <div className="text-center mt-5">
            <Loading />
          </div>
        ) : feedbacks && feedbacks.length > 0 ? (
          <div className="container mt-5">
            <AdminTable
              config={this.tableConfig}
              triggerEditEvent={this.editFeedback}
              deleteRow={this.removeFeedback}
              tableBody={feedbacks as any}
            />
          </div>
        ) : (
          <div className="text-center my-5">
            <p>No Feedbacks yet</p>
          </div>
        )}

        {Object.keys(feedbackToBeEdited).length > 1 && (
          <FeedbackForm
            isModalOpened={Object.keys(feedbackToBeEdited).length > 1}
            itemToBeEdited={feedbackToBeEdited}
            onSubmit={this.editFeedback}
            isSubmitting={isSubmitting}
            closeModal={() =>
              this.setState({ feedbackToBeEdited: {} as Feedback })
            }
          />
        )}

        <FeedbackForm
          isModalOpened={isCreateModalOpened}
          isSubmitting={isSubmitting}
          onSubmit={this.createFeedback}
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
            this.removeFeedback(idOfItemToBeDeleted, true);
            this.setState({ idOfItemToBeDeleted: "" });
          }}
          onCancel={() => this.setState({ idOfItemToBeDeleted: "" })}
          focusCancelBtn
          show={!!idOfItemToBeDeleted}
        >
          You will not be able to recover this item !
        </SweetAlert>
      </>
    );
  }
}
