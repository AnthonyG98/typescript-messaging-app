import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Settings() {
  let url = "https://other-side.herokuapp.com";
  let history = useNavigate();

  const [image, setImage] = useState<FileList | null>();

  const logoutUser = () => {
    history("/");
    localStorage.clear();
  };

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
      <p className="settings-text" onClick={() => logoutUser()}>
        LOGOUT
      </p>
    </div>
  );
}
