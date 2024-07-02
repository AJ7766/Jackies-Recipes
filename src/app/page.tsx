import { getPosts } from "../../_actions/postActions";
import LoginForm from "./_components/LoginForm";

export default async function Home() {
  const res = await getPosts();

  console.log(res)
  return (
    <div className="bgContainer">
      <LoginForm />
    </div>
  );
}
