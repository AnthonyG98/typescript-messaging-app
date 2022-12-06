import { Image } from "cloudinary-react";

interface propsDetails {
    searchImg: string,
    searchUsername: string,
}
export function SearchProps(props: propsDetails){
    return(
        <div className="search-container">
            <Image
            className="search-img"
            cloudName="delktfw1a"
            publicId={props.searchImg}
            />
            <h1 className="search-username">{props.searchUsername}</h1>
            <button className="msg-user-btn"></button>
        </div>
    )
}