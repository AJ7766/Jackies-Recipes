import Image from "next/image";
import { Loginform } from "./components/LoginForm";
const logo = "https://res.cloudinary.com/denumkkcx/image/upload/v1735085066/ekq1eigibe9h5xfgi6rp.webp";

export default function LoginPage() {
    return (
        <div className="startingPageBg" data-testid="starting-page-bg">
            <div className="loginFormContainer">
                <div className="loginHeaderContainer">
                    <Image
                        className="loginLogo"
                        src={logo}
                        width={150}
                        height={150}
                        fetchPriority="high"
                        alt="logo"
                        priority
                    />
                </div>
                <Loginform />
            </div>
        </div>
    );
}
