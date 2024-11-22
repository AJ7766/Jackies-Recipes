export default function UserAccountPolicyPage() {

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">
        User Account Policy for Jackies Recipes
      </h1>
      <p className="mb-2">
        <strong>Effective Date:</strong> 2024-10-29
      </p>

      <p className="mb-4">
        At Jackies Recipes, we are committed to protecting your personal data. This policy outlines the information we collect, store, and use when you create an account on our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="mb-4">
        When you create an account with us, we collect and store the following information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Username</li>
        <li>Full name</li>
        <li>Email address</li>
        <li>Password (encrypted)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We use this information to manage your account, facilitate login, and provide a personalized experience on our platform. We do not share your personal information with third parties without your consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="mb-4">
        Your personal information is securely stored in our database. Passwords are encrypted to ensure your security, and we implement necessary technical measures to protect your data against unauthorized access.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
      <p className="mb-4">
        We retain your account information for as long as your account is active or as needed to provide services. You may request account deletion, after which your data will be permanently removed from our systems, unless required by law.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Rights</h2>
      <p className="mb-4">
        Under GDPR, you have the right to access, update, or request deletion of your personal data. You may also object to data processing or request data portability. To exercise these rights, please contact us using the information below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4">
        For any questions regarding this policy, please contact us at{" "}
        <a
          href="mailto:jackkie@hotmail.com"
          className="text-blue-600 hover:underline"
        >
          jackkie@hotmail.com
        </a>
        .
      </p>
    </div>
  );
}
