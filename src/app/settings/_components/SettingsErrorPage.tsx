import Link from "next/link";

export default function SettingsError(){
    return(
        <div className="errorContainer">
            <h1>You must be logged in to access settings, <Link href="/"><h1 className="text-blue-700 underline">login here</h1></Link></h1>
        </div>
    )
}