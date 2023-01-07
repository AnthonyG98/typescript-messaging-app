import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
interface propsDetails {
  searchImg: string;
  searchUsername: string;
  messageBtn: () => void;
}
const cld = new Cloudinary({
  cloud: {
    cloudName: "delktfw1a",
  },
});
export function SearchProps(props: propsDetails) {
  const myImage = cld.image(props.searchImg);
  return (
    <>
      <div className="search-background" id="props-container">
        <div className="search-props-container">
          <AdvancedImage
            cldImg={myImage}
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
