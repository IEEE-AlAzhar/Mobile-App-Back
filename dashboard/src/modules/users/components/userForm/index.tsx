import React, { Component } from "react";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import { User } from "globals/interfaces/user.interface";
import Loading from "shared/loading";
import FormInput from "shared/Input";
import ImageInput from "shared/image-input";
import { getCommittees } from "modules/users/services/committee.service";
import { Committee } from "globals/interfaces/committee.interface";

interface Prop {
  isModalOpened: boolean;
  onSubmit: (item: any, submit: boolean, id?: string) => Promise<void>;
  closeModal: () => void;
  itemToBeEdited?: any;
  isSubmitting?: boolean;
}

interface State {
  user: User;
  isLoading: boolean;
  isImageUploading: boolean;
  committees: string[];
}

export default class UserForm extends Component<Prop, State> {
  state = {
    user: {
      name: "",
      email: "",
      code: "",
      phone: "",
      image: "",
      role: "",
      type: "",
      committee: "",
    },
    committees: [] as string[],
    isLoading: false,
    isImageUploading: false,
  };

  componentDidMount() {
    let { itemToBeEdited } = this.props;

    if (itemToBeEdited) {
      itemToBeEdited.date = this.formatDate();
      this.setState({ user: itemToBeEdited });
    }

    getCommittees().then((response) => {
      this.setState({
        committees: this.generateArrayOfCommitteesNames(response),
      });
    });
  }

  setImageUpload = (status: boolean, imageUrl?: string) => {
    this.setState({ isImageUploading: status });
    if (imageUrl)
      this.setState({
        user: { ...this.state.user, image: imageUrl } as any,
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
      user: {
        ...this.state.user,
        [name]: value,
      } as any,
    });
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let { user } = this.state;

    this.setState(
      {
        user: {
          ...user,
        } as any,
      },
      () => {
        this.props.onSubmit(this.state.user, true).then(() => {
          // this.resetObj(user);
          this.setState({ user: user });
        });
      }
    );
  };

  resetObj(obj: any) {
    for (let prop in obj) {
      obj[prop] = "";
    }
  }

  generateCode = (): void => {
    let randomNumber = Math.floor(100000000 + Math.random() * 900000000);

    this.setState({
      user: {
        ...this.state.user,
        code: String(randomNumber),
      } as any,
    });
  };

  generateArrayOfCommitteesNames = (committeesArray: Committee[]): string[] => {
    let committeesNames: string[] = [];
    committeesArray.map(({ name }) => committeesNames.push(name));

    return committeesNames;
  };

  render() {
    let {
      isModalOpened,
      itemToBeEdited,
      closeModal,
      isSubmitting,
    } = this.props;
    let { user, isLoading, isImageUploading, committees } = this.state;

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
            <h3 className="mb-3"> Add new Member </h3>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <FormInput
                    type="text"
                    required={true}
                    placeholder="User name"
                    label="Name"
                    id="name"
                    name="name"
                    errorPosition="bottom"
                    value={user.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <FormInput
                    type="select"
                    className="form-control"
                    options={["Admin", "Board", "Member"]}
                    required={true}
                    label="Type"
                    id="type"
                    name="type"
                    errorPosition="bottom"
                    value={user.type}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <FormInput
                    type="tel"
                    className="form-control"
                    required={true}
                    label="Phone"
                    id="phone"
                    name="phone"
                    errorPosition="bottom"
                    value={user.phone}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group col-md-6">
                  <FormInput
                    type="select"
                    className="form-control"
                    options={["Member", "Head", "Officer", "Vice head"]}
                    required={true}
                    label="Role"
                    id="role"
                    name="role"
                    errorPosition="bottom"
                    value={user.role}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <FormInput
                    type="email"
                    className="form-control"
                    required={true}
                    label="Email"
                    id="email"
                    name="email"
                    errorPosition="bottom"
                    value={user.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <FormInput
                    type="select"
                    className="form-control"
                    options={
                      committees && committees.length > 0 ? committees : []
                    }
                    required={true}
                    label="Committee"
                    id="committee"
                    name="committee"
                    errorPosition="bottom"
                    value={user.committee}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-10">
                  <FormInput
                    type="text"
                    required={true}
                    placeholder="User Code"
                    label="Code"
                    id="code"
                    name="code"
                    errorPosition="bottom"
                    value={user.code}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <button
                    onClick={this.generateCode}
                    type="button"
                    title="Generate Code"
                    className="btn mt-2"
                  >
                    <FontAwesomeIcon icon={faCog} />
                  </button>
                </div>
              </div>

              <ImageInput
                imgUrl={user.image}
                name="image"
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
