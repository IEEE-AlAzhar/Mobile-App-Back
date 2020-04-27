import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { uploadImage } from "shared/services/uploadImage.service";
import types from "globals/project-types";
import countries from "globals/countries";

export default class AdminModal extends Component {
  state = {
    title: "",
    body: "",
    date: "",
    image: "",
    id: "",
    name: "",
    link: "",
    type: "",
    country: "",
    password: "",
    email: "",
    isImageUploading: false,
    isSubmitting: false,
    isSubmitted: false,
    isFailed: false
  };

  removeImage = () => {
    this.setState({ image: "" });
  };

  formatDate = () => {
    let currentDateTime = new Date();
    let formattedDate =
      currentDateTime.getFullYear() +
      "-" +
      (currentDateTime.getMonth() + 1) +
      "-" +
      currentDateTime.getDate();

    this.setState({
      date: formattedDate
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageInputChange = e => {
    this.setState({ isImageUploading: true });
    uploadImage(e.target.files[0]).then(res => {
      this.setState({ isImageUploading: false, image: res.data.secure_url });
    });
  };

  saveItem = e => {
    e.preventDefault();

    this.setState({
      isSubmitting: true
    });
    
    this.props.save(this.state).then(() => {
      this.props.updateParentState();
      this.setState({
        isSubmitting: false,
        isSubmitted: true
      })

      setTimeout(() => {
        this.setState({ isSubmitted: false });
      }, 3000);
    }).catch(() => {
      this.setState({
        isSubmitting: false,
        isFailed: true
      })

      setTimeout(() => {
        this.setState({ isFailed: false });
      }, 3000);
    })
  };

  componentDidMount() {
    this.formatDate();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="addModal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Item</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {!this.state.isSubmitted ? (
                <form encType="multipart/form-data" onSubmit={this.saveItem}>
                  {this.props.isClient
                    ? this.renderClientForm()
                    : this.props.isProject
                    ? this.renderProjectForm()
                    : this.renderRegularForm()}
                  {this.props.acceptsImage &&
                  !this.state.image &&
                  !this.state.isImageUploading
                    ? this.renderImageForm()
                    : this.state.image && this.renderImagePreview()}
                  {this.state.isImageUploading ? (
                    <p>Wait for image to upload ...</p>
                  ) : (
                    ""
                  )}

                  {!this.state.isImageUploading ? (
                    <button type="submit" className="btn btn-primary">
                      {this.state.isSubmitting ? "Submitting ..." : "Save"}
                    </button>
                  ) : (
                    <button type="submit" disabled className="btn btn-primary">
                      Save
                    </button>
                  )}
                </form>
              ) : this.state.isFailed ? <p className="alert alert-danger">
                  An Error Occurred, please try again and make sure to fill all the fields
                </p> :
                <p className="alert alert-success">
                  Form Submitted successfully, you can close the modal.
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderRegularForm = () => (
    <>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={this.state.title}
          onChange={this.handleChange}
          id="title"
          placeholder="Add News Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          className="form-control"
          onChange={this.handleChange}
          value={this.state.body}
          id="body"
          rows={3}
        />
      </div>
    </>
  );

  renderClientForm = () => (
    <>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={this.state.name}
          onChange={this.handleChange}
          id="name"
          placeholder="Add new client"
        />
      </div>
      <div className="form-group">
        <label htmlFor="link">Link</label>
        <input
          type="url"
          name="link"
          className="form-control"
          value={this.state.link}
          onChange={this.handleChange}
          id="link"
          placeholder="Add link"
        />
      </div>
    </>
  );

  renderProjectForm = () => (
    <>
      {this.renderRegularForm()}
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className="form-control"
            name="type"
            value={this.state.type}
            onChange={this.handleChange}
          >
            <option value="" disabled selected>
              Choose a type
            </option>
            {types.map(type => (
              <option value={type}> {type} </option>
            ))}
          </select>
        </div>
        <div className="form-group col-6">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            className="form-control"
            value={this.state.country}
            onChange={this.handleChange}
          >
            <option value="" disabled selected>
              Choose country
            </option>
            {countries.map(country => (
              <option value={country}> {country} </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );

  renderImageForm = () => (
    <div className="form-group">
      <label htmlFor="image">Upload Image</label>
      <input
        type="file"
        onChange={this.handleImageInputChange}
        className="form-control-file"
        id="image"
        name="image"
        accept="image/*"
      />
    </div>
  );

  renderImagePreview = () => (
    <section className="img-preview">
      <img
        src={this.state.image}
        className="d-block"
        width="100%"
        alt="Preview"
      />
      <span onClick={this.removeImage} className="preview-dismiss">
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </section>
  );
}
