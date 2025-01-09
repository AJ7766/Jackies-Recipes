"use client"
import { useCookieConsent } from "@/_utils/client/cookies";
import { useEffect, useState } from "react";

export const CookiesConsent = () => {
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
      window.gtag = function () { };
    }
  }, [cookies.cookieConsent]);

  if (!isClient || cookies.cookieConsent !== undefined)
    return null;

  return (
    <div className="cookie-consent-wrapper">
      <p>
        This website uses cookies to enhance your experience. By clicking
        "Accept," you consent to our use of cookies. You can learn more about our
        cookie policy in our <a className="text-blue-600 hover:underline" href="/privacy-policy">Privacy Policy.</a>
      </p>
      <div className="flex gap-3">
        <button className="accept-btn" onClick={acceptCookies}>
          Accept
        </button>
        <button className="decline-btn" onClick={declineCookies}>
          Decline
        </button>
      </div>
    </div>
  );
}
