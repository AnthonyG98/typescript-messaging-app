import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

interface propsDetails {
  chatImg: string;
  chatMessage: string;
}
//For cloudinary to work with Typescript
const cld = new Cloudinary({
  cloud: {
    cloudName: "delktfw1a",
  },
});

export function ChatProps(props: propsDetails) {
  const myImage = cld.image(props.chatImg);
  return (
    <>
      <div className="chat-props-container">
        <div className="msg-sidebar"></div>
        <AdvancedImage
          cldImg={myImage}
          className="dashInputImg"
          cloudName="delktfw1a"
          publicId={props.chatImg}
        />
        <p className="inbox-name">{props.chatMessage}</p>
      </div>
    </>
  );
}
