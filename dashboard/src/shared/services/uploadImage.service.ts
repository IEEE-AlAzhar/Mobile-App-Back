import axios from "axios";

export let uploadImage = (image: Blob | null) => {
  let url = "https://api.cloudinary.com/v1_1/dykflps8g/image/upload";
  let fd = new FormData();
  fd.append("file", image as Blob);
  fd.append("api_key", 293517195754478 as any);
  fd.append("upload_preset", "z1ti5v7g");
  fd.append(
    "api_secret",
    process.env.REACT_APP_CLOUDINARY_SECRET_API_KEY as string
  );

  return axios.post(url, fd);
};
