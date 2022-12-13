import { Image } from "cloudinary-react";

interface propsDetails {
  searchImg: string;
  searchUsername: string;
  messageBtn: () => void;
}
export function SearchProps(props: propsDetails) {
  return (
    <>
      <div className="search-background" id="props-container">
        <div className="search-props-container">
          <Image
            className="search-img"
            cloudName="delktfw1a"
            publicId={props.searchImg}
          />
          <h1 className="search-username">{props.searchUsername}</h1>
          <button className="search-btn" onClick={props.messageBtn}>
            MESSAGE
          </button>
        </div>
      </div>
    </>
  );
}
