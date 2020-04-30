import axios from "axios";

export let uploadImage = (image: Blob) => {
  let url = "https://api.cloudinary.com/v1_1/daxwa9yg1/image/upload";
  let fd = new FormData();
  fd.append("file", image);
  fd.append("api_key", "663851929125264");
  fd.append("upload_preset", "b3thdgfk");
  fd.append("api_secret", process.env.REACT_APP_CLOUDINARY_SECRET_API_KEY as string);

  return axios.post(url, fd);
};
