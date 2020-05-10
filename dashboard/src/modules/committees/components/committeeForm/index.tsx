import React, { Component } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import { Committee } from "configurations/interfaces/committee.interface";
import Loading from "shared/loading";
import FormInput from "shared/Input";

interface Prop {
  isModalOpened: boolean;
  onSubmit: (item: any, submit: boolean, id?: string) => Promise<void>;
  closeModal: () => void;
  itemToBeEdited?: any;
  isSubmitting?: boolean;
}

interface State {
  committee: Committee;
  isLoading: boolean;
}

export default class CommitteeForm extends Component<Prop, State> {
  state = {
    committee: {
      name: "",
    },
    isLoading: false,
  };

  componentDidMount() {
    let { itemToBeEdited } = this.props;

    if (itemToBeEdited) {
      itemToBeEdited.date = this.formatDate();
      this.setState({ committee: itemToBeEdited });
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
      committee: {
        ...this.state.committee,
        [name]: value,
      } as any,
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let { committee } = this.state;
    this.props.onSubmit(committee, true).then(() => {
      this.resetObj(committee);
      this.setState({ committee: committee });
    });
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
    let { committee, isLoading } = this.state;

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
            <h3 className="mb-3"> Committee </h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-md-12">
                  <FormInput
                    type="text"
                    required={true}
                    placeholder="Committee name"
                    label="Name"
                    id="name"
                    name="name"
                    errorPosition="bottom"
                    value={committee.name}
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
