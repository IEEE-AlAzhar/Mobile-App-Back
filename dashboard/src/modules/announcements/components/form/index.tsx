import React, { Component } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import { Announcement } from "configurations/interfaces/announcement.interface";
import Loading from "shared/loading";
import FormInput from "shared/Input";
import ImageInput from "shared/image-input";

interface Prop {
  isModalOpened: boolean;
  onSubmit: (item: any, submit: boolean, id?: string) => Promise<void>;
  closeModal: () => void;
  itemToBeEdited?: any;
  isSubmitting?: boolean;
}

interface State {
  announcement: Announcement;
  isLoading: boolean;
  isImageUploading: boolean;
}

export default class AnnouncementForm extends Component<Prop, State> {
  state = {
    announcement: {
      title: "",
      body: "",
      cover: "",
      type: "",
    },
    isLoading: false,
    isImageUploading: false,
  };

  componentDidMount() {
    let { itemToBeEdited } = this.props;

    if (itemToBeEdited) {
      itemToBeEdited.date = this.formatDate();
      this.setState({ announcement: itemToBeEdited });
    }
  }

  setImageUpload = (status: boolean, imageUrl?: string) => {
    this.setState({ isImageUploading: status });
    if (imageUrl)
      this.setState({
        announcement: { ...this.state.announcement, cover: imageUrl } as any,
      });
  };

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
      announcement: {
        ...this.state.announcement,
        [name]: value,
      } as any,
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let { announcement } = this.state;

    this.setState(
      {
        announcement: {
          ...announcement,
          date: this.formatDate(),
        } as any,
      },
      () => {
        this.props.onSubmit(this.state.announcement, true).then(() => {
          this.setState({ announcement: announcement });
          this.resetObj(announcement);
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
    let { announcement, isLoading, isImageUploading } = this.state;

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
            <h3 className="mb-3"> Announcement </h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <FormInput
                    type="text"
                    required={true}
                    placeholder="blog title"
                    label="Title"
                    id="title"
                    name="title"
                    errorPosition="bottom"
                    value={announcement.title}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <FormInput
                    type="select"
                    className="form-control"
                    options={["General", "Technical", "Operation"]}
                    required={true}
                    label="Type"
                    id="type"
                    name="type"
                    errorPosition="bottom"
                    value={announcement.type}
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
                    value={announcement.body}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <ImageInput
                imgUrl={announcement.cover}
                setImageUpload={this.setImageUpload}
              />

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || isImageUploading}
              >
                {isImageUploading
                  ? "Uploading..."
                  : isSubmitting
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
