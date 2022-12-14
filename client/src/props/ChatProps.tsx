import { Image } from "cloudinary-react";
interface propsDetails {
  chatImg: string;
  chatMessage: string;
}
export function ChatProps(props: propsDetails) {
  return (
    <>
      <div className="chat-props-container">
        <div className="msg-sidebar"></div>
        <Image
          className="dashInputImg"
          cloudName="delktfw1a"
          publicId={props.chatImg}
        />
        <p className="inbox-name">{props.chatMessage}</p>
      </div>
    </>
  );
}
