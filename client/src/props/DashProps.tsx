import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { MouseEventHandler } from "react";
interface propsDetails {
  messageImg: string;
  messageUsername: string;
  openChatById: void | MouseEventHandler;
}
const cld = new Cloudinary({
  cloud: {
    cloudName: "delktfw1a",
  },
});
export function DashProps(props: propsDetails) {
  const myImage = cld.image(props.messageImg);

  return (
    <>
      <div className="dash-props-container" onClick={() => props.openChatById}>
        <div className="msg-sidebar"></div>
        <AdvancedImage
          cldImg={myImage}
          className="dashInputImg"
          cloudName="delktfw1a"
          publicId={props.messageImg}
        />
        <p className="inbox-name">{props.messageUsername}</p>
      </div>
    </>
  );
}
