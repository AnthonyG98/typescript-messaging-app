import { useState } from "react";
import axios from "axios";

export function Settings() {
  let url = "http://localhost:3001";

  const [image, setImage] = useState<FileList | null>();

  const changeProfileImg = () => {
    const imgFormData = new FormData();
    imgFormData.append("file", image);
    imgFormData.append("upload_preset", "fy5ahm9g");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/delktfw1a/image/upload`,
        imgFormData
      )
      .then((response) => {
        const fileName = response.data.public_id;
        const imageData = {
          profile_picture: fileName,
        };
        const postImageData = {
          profile_picture: fileName,
        };
        axios
          .put(
            `${url}/users/profile/${localStorage.getItem("id")}`,
            postImageData
          )
          .then((response) => {
            console.log(response);
          });
        axios
          .put(
            `${url}/users/profile/profile/${localStorage.getItem("id")}`,
            imageData
          )
          .then((response) => {
            console.log(response);
          });
      });
  };

  return (
    <div className="settings-container" id="settings">
      <input
        type="file"
        className="change-img"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <p className="settings-text" onClick={() => changeProfileImg()}>
        CHANGE PROFILE PICTURE
      </p>
      <p className="settings-text">LOGOUT</p>
    </div>
  );
}
