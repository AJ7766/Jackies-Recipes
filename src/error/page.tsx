import Link from "next/link";

export default function ErrorPage() {
  return (
      <div className="errorContainer">
        <h1>
          You must be logged in to access this page,
          <Link href="/login">
            <h1 className="text-blue-600">login here</h1>
          </Link>
        </h1>
      </div>
  );
}
