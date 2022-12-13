import { Image } from "cloudinary-react";
interface propsDetails {
    messageImg: string,
    messageUsername: string,
    
}
export function DashProps(props: propsDetails) {
    return(
        <div className="dash-props-container">
            <div className="msg-sidebar"></div>
            <Image
                className="dashInputImg"
                cloudName="delktfw1a"
                publicId={props.messageImg}
                />
            <p className="inbox-name">{props.messageUsername}</p>   
        </div>
    )
}
