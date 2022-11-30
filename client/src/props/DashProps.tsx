import { Image } from "cloudinary-react";

export function DashProps() {
    return(
        <div className="dash-props-container">
            <div className="msg-sidebar"></div>
            <Image
                className="dashInputImg"
                cloudName="delktfw1a"
                publicId={localStorage.getItem("profile_picture")}
                />
            <p className="inbox-name">{localStorage.getItem("username")}</p>   
        </div>
    )
}
