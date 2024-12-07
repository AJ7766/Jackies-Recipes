import RegisterPage from "./containers/RegisterPage";

export default async function Register() {
  return <RegisterPage />;
}

export async function generateMetadata() {
  return {
    title: 'Register - Jackies Recipes',
    description: 'Create an account at Jackies Recipes',
  };
}