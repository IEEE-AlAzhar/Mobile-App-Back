import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faTimes,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export default class AdminTable extends Component {
  state = {};

  renderTableHeaders = () => {};

  renderTableBody = () => {};

  renderEditBtn = () => {};

  renderShowBtn = () => {}

  formatDate = () => {
    let currentDateTime = new Date();
    let formattedDate =
      currentDateTime.getFullYear() +
      "-" +
      (currentDateTime.getMonth() + 1) +
      "-" +
      currentDateTime.getDate();

    this.setState({
      date: formattedDate,
    });
  };

  removeImage = () => {
    this.setState({ image: "" });
  };

  componentDidMount() {
    this.formatDate();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  deleteItem = () => {}

  handleImageInputChange = (e) => {
    // this.setState({ isImageUploading: true });
    // uploadImage(e.target.files[0]).then((res) => {
    //   this.setState({
    //     isImageUploading: false,
    //     isImageUploaded: true,
    //     image: res.data.secure_url,
    //   });
    // });
  };

  saveEdit = (e) => {
    e.preventDefault();

    // this.setState({ isSubmitting: true });

  };

  render() {
    // let { headers, body, className } = this.props;
    return (
      <>
        <table className={`${className} table`}>
          {/* <thead>
            <tr>
              {this.renderTableHeaders(headers)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody(body)}</tbody> */}
        </table>
      </>
    );
  }

  // renderImagePreview = () => (
  //   <section className="img-preview">
  //     <img
  //       src={this.state.image}
  //       className="d-block"
  //       width="100%"
  //       alt="Preview"
  //     />
  //     <span onClick={this.removeImage} className="preview-dismiss">
  //       <FontAwesomeIcon icon={faTimes} />
  //     </span>
  //   </section>
  // );

  // renderImageUpload = () => (
  //   <div className="form-group">
  //     <label htmlFor="image">Upload Image</label>
  //     <input
  //       type="file"
  //       onChange={this.handleImageInputChange}
  //       className="form-control-file"
  //       id="image"
  //       accept="image/*"
  //       name="image"
  //     />
  //   </div>
  // );
}
