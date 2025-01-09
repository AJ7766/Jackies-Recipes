import Link from "next/link";
import { NavBar } from "../../components/NavBar";

export default function ErrorPage() {
  return (
    <>
      <NavBar />
      <div className="errorContainer">
        <h1>
          You must be logged in to access this page,
          <Link href="/">
            <h1 className="text-blue-700 underline">login here</h1>
          </Link>
        </h1>
      </div>
    </>
  );
}
