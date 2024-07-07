import { ProfileProps } from "../types/types";

export default function ProfilePage(props: ProfileProps){
    const { username, email } = props;

    return(
    <div className="profileWrapper">
        <div>
            <p>{username}</p>
            <p>{email}</p>

        </div>
    </div>
    )
}