import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { uploadImage } from "shared/services/uploadImage.service";

interface Prop {
  setImageUpload: (status: boolean, imageUrl?: string) => void;
  imgUrl: string;
  name?: string;
}

interface State {
  isImageUploaded: boolean;
  image: string;
}

export default class ImageInput extends Component<Prop, State> {
  state = {
    isImageUploaded: false,
    image: "",
  };

  handleImageInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    let { setImageUpload } = this.props;
    let { files } = e.currentTarget;

    setImageUpload(true);
    uploadImage(files && files[0]).then((res) => {
      this.setState({
        isImageUploaded: true,
        image: res.data.secure_url,
      });

      setImageUpload(false, res.data.secure_url);
    });
  };

  renderImageUpload = () => (
    <div className="form-group">
      <label htmlFor="cover">Upload Image</label>
      <input
        type="file"
        onChange={this.handleImageInputChange}
        className="form-control-file"
        id="cover"
        accept="image/*"
        name={this.props.name || "cover"}
      />
    </div>
  );

  renderImagePreview = () => (
    <section className="img-preview">
      <img
        src={this.state.image || this.props.imgUrl}
        className="d-block"
        width="100%"
        alt="Preview"
      />
      <span onClick={this.removeImage} className="preview-dismiss">
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </section>
  );

  removeImage = () => {
    this.setState({ isImageUploaded: false, image: "" });
  };

  componentDidUpdate(prevProps: any) {
    if (
      this.props.imgUrl !== this.state.image &&
      this.props.imgUrl !== prevProps.imgUrl
    ) {
      this.setState({ image: this.props.imgUrl });
    }
  }

  render() {
    let { isImageUploaded, image } = this.state;
    return (
      <>
        {!isImageUploaded && !image
          ? this.renderImageUpload()
          : this.renderImagePreview()}
      </>
    );
  }
}
