import { ProfileProps } from "../types/types";

export default function ProfilePage(props: ProfileProps){
    const { username, email } = props;

    return(
    <div className="profileWrapper">
        <div className="profileContainer">
        <div className="profileInfo">
            <p>{username}</p>
            <p>{email}</p>
            </div>
        <div className="bookContainer">
        <div className="frontPage"></div>
        <div className="page"></div>
        </div>
        </div>
    </div>
    )
}