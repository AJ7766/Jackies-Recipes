"use client";

import { useCookieConsent } from "@/config/cookies";
import { useEffect, useState } from "react";

export default function PrivatePolicyPage() {
  const [isChecked, setIsChecked] = useState(false);
  const { cookies, acceptCookies, declineCookies } = useCookieConsent();

  useEffect(() => {
    if (
      cookies.cookieConsent === false ||
      cookies.cookieConsent === undefined
    ) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, []);

  const toggleSlider = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    if (isChecked) {
      declineCookies();
    } else {
      acceptCookies();
    }
  };
  console.log("Cookie consent:", cookies.cookieConsent);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">
        Privacy Policy for Jackies Recipes
      </h1>
      <p className="mb-2">
        <strong>Effective Date:</strong> 2024-10-19
      </p>

      <p className="mb-4">
        At Jackies Recipes, we value your privacy. This policy outlines how we
        collect and use information when you visit our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="mb-2">
        We use Google Analytics to track visitor information, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>IP addresses</li>
        <li>Pages visited</li>
        <li>Time spent on the site</li>
        <li>Referring websites</li>
      </ul>
      <p className="mb-4">
        This data helps us understand how our visitors interact with our website
        and improve our content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
      <p className="mb-4">
        Our website may use cookies to enhance your experience. Cookies are
        small files stored on your device that help us analyze web traffic. You
        can choose to accept or decline cookies through your browser settings.
        By using our website, you consent to the use of cookies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties.
        The data collected via Google Analytics is used solely for internal
        analysis.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
      <p className="mb-4">
        We retain the data collected through Google Analytics for as long as
        necessary to fulfill the purposes outlined in this policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Rights</h2>
      <p className="mb-4">
        Under GDPR, you have the right to access the personal data we hold about
        you, request the deletion of your personal data, and object to the
        processing of your personal data. If you wish to exercise any of these
        rights, please contact us using the information below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this privacy policy occasionally. Any changes will be
        posted on this page with an updated effective date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy, please contact us
        at{" "}
        <a
          href="mailto:jackkie@hotmail.com"
          className="text-blue-600 hover:underline"
        >
          jackkie@hotmail.com
        </a>
        .
      </p>
      <div className="cookieConsentSwitchContainer">
        <label className="sliderContainer text-xl">
          I Accept
          <input type="checkbox" checked={isChecked} onChange={toggleSlider} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}
