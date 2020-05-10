import React, { Component } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Loading from "shared/loading";
import FormInput from "shared/Input";
import { Feedback } from "configurations/interfaces/feedback.interface";

interface Prop {
  isModalOpened: boolean;
  onSubmit: (item: any, submit: boolean, id?: string) => Promise<void>;
  closeModal: () => void;
  itemToBeEdited?: any;
  isSubmitting?: boolean;
}

interface State {
  feedback: Feedback;
  isLoading: boolean;
}

export default class FeedbackForm extends Component<Prop, State> {
  state = {
    feedback: {
      title: "",
      body: "",
      date: "",
    },
    isLoading: false,
  };

  componentDidMount() {
    let { itemToBeEdited } = this.props;

    if (itemToBeEdited) {
      itemToBeEdited.date = this.formatDate();
      this.setState({ feedback: itemToBeEdited });
    }
  }

  formatDate = () => {
    let currentDateTime = new Date();
    let formattedDate =
      currentDateTime.getFullYear() +
      "-" +
      (currentDateTime.getMonth() + 1) +
      "-" +
      currentDateTime.getDate();

    return formattedDate;
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    let { name, value } = e.currentTarget;

    this.setState({
      feedback: {
        ...this.state.feedback,
        [name]: value,
      } as any,
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let { feedback } = this.state;

    this.setState(
      {
        feedback: {
          ...feedback,
          date: this.formatDate(),
        } as any,
      },
      () => {
        this.props.onSubmit(this.state.feedback, true).then(() => {
          this.setState({ feedback: feedback });
          this.resetObj(feedback);
        });
      }
    );
  };

  resetObj(obj: any) {
    for (let prop in obj) {
      obj[prop] = "";
    }
  }

  render() {
    let {
      isModalOpened,
      itemToBeEdited,
      closeModal,
      isSubmitting,
    } = this.props;
    let { feedback, isLoading } = this.state;

    return (
      <Modal
        open={isModalOpened}
        onClose={() => closeModal()}
        center
        styles={{
          modal: {
            animation: `${
              isModalOpened ? "customEnterAnimation" : "customLeaveAnimation"
            } 500ms`,
          },
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h3 className="mb-3"> Feedback </h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-md-12">
                  <FormInput
                    type="text"
                    required={true}
                    placeholder="feedback title"
                    label="Title"
                    id="title"
                    name="title"
                    errorPosition="bottom"
                    value={feedback.title}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-12">
                  <FormInput
                    type="textarea"
                    required={true}
                    label="body"
                    id="body"
                    name="body"
                    rows="5"
                    errorPosition="bottom"
                    value={feedback.body}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Loading ..."
                  : itemToBeEdited
                  ? "Save"
                  : "Create"}
              </button>
            </form>
          </>
        )}
      </Modal>
    );
  }
}
