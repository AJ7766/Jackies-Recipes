"use client";

import { useCookieConsent } from "@/_utils/client/cookies";
import { useEffect, useState } from "react";
import PrivacyPolicyComponent from "../components/PrivacyPolicyComponent";

export default function PrivacyPolicy() {
  const { cookies, acceptCookies, declineCookies } = useCookieConsent();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSlider = () => {
    if (isClient) {
      if (cookies.cookieConsent) {
        declineCookies();
      } else {
        acceptCookies();
      }
    }
  };

  return <PrivacyPolicyComponent cookiesConsent={cookies.cookieConsent} toggleSlider={toggleSlider}/>
}