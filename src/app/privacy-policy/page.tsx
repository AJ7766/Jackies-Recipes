import PrivacyPolicy from "./containers/PrivacyPolicy";

export default async function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}

export async function generateMetadata() {
  return {
    title: `Privacy Policy - Jackies Recipes`,
    description: `Review the Privacy Policy for Jackies Recipes, including how we collect and use information, cookies, and your rights under GDPR.`,
  };
}