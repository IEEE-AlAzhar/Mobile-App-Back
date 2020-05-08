import React, { Component } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Loading from "shared/loading";
import FormInput from "shared/Input";
import ImageInput from "shared/image-input";
import { Achievement } from "globals/interfaces/achievement.interface";

interface Prop {
  isModalOpened: boolean;
  onSubmit: (item: any, submit: boolean, id?: string) => Promise<void>;
  closeModal: () => void;
  itemToBeEdited?: any;
  isSubmitting?: boolean;
}

interface State {
  achievement: Achievement;
  isLoading: boolean;
  isImageUploading: boolean;
}

export default class AchievementForm extends Component<Prop, State> {
  state = {
    achievement: {
      title: "",
      date: "",
      description: "",
      cover: ""
    },
    isLoading: false,
    isImageUploading: false,
  };

  componentDidMount() {
    let { itemToBeEdited } = this.props;

    if (itemToBeEdited) {
      itemToBeEdited.date = this.formatDate();
      this.setState({ achievement: itemToBeEdited });
    }
  }

  setImageUpload = (status: boolean, imageUrl?: string) => {
    this.setState({ isImageUploading: status });
    if (imageUrl)
      this.setState({
        achievement: { ...this.state.achievement, cover: imageUrl } as any,
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
      achievement: {
        ...this.state.achievement,
        [name]: value,
      } as any,
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let { achievement } = this.state;

    this.setState(
      {
        achievement: {
          ...achievement,
          date: this.formatDate(),
        } as any,
      },
      () => {
        this.props.onSubmit(this.state.achievement, true).then(() => {
          this.resetObj(achievement);
          this.setState({ achievement: achievement });
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
    let { achievement, isLoading, isImageUploading } = this.state;

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
            <h3 className="mb-3"> Add new Achievement </h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-md-12">
                  <FormInput
                    type="text"
                    required={true}
                    placeholder="achievement title"
                    label="Title"
                    id="title"
                    name="title"
                    errorPosition="bottom"
                    value={achievement.title}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-12">
                  <FormInput
                    type="textarea"
                    required={true}
                    label="description"
                    id="description"
                    name="description"
                    rows="5"
                    errorPosition="bottom"
                    value={achievement.description}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <ImageInput
                imgUrl={achievement.cover}
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
