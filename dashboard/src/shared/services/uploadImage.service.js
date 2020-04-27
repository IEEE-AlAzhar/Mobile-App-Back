import axios from "axios";

export let uploadImage = image => {
  let url = "https://api.cloudinary.com/v1_1/daxwa9yg1/image/upload";
  let fd = new FormData();
  fd.append("file", image);
  fd.append("api_key", 663851929125264);
  fd.append("upload_preset", "b3thdgfk");
  fd.append("api_secret", "Ig5KG7sOwxLfnU1a72jKrZli_ME");

  return axios.post(url, fd);
};
