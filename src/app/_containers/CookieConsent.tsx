"use client"
import { useCookieConsent } from "@/_utils/client/cookies";
import { useEffect, useState } from "react";
import { CookieConsentComponent } from "../_components/CookieConsentComponent";

export function CookieConsent() {
  const { cookies, acceptCookies, declineCookies } = useCookieConsent();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (cookies.cookieConsent) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag("config", "G-W37LZK4XFJ", {
        page_path: window.location.pathname,
      });
    } else if (cookies.cookieConsent === false) {
      window.dataLayer = [];
      window.gtag = function () {};
    }
  }, [cookies.cookieConsent]);

  if (!isClient || cookies.cookieConsent !== undefined)
    return null;

  return <CookieConsentComponent acceptCookies={acceptCookies} declineCookies={declineCookies} />
}
