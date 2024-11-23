import { useCookieConsent } from "@/_utils/cookies";
import { useEffect } from "react";

export function CookieConsent() {
  const { cookies, acceptCookies, declineCookies } = useCookieConsent();
  useEffect(()=>{
    console.log(cookies.cookieConsent)
  })

  const handleAccept = () => {
    acceptCookies();
    loadGoogleAnalytics();
  };

  const handleDecline = () => {
    declineCookies();
  };

  const loadGoogleAnalytics = () => {
    if (!cookies.cookieConsent) return;

    if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ"]`)) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ";
      script.async = true;

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());
        window.gtag("config", "G-W37LZK4XFJ", {
          page_path: window.location.pathname,
        });
      };
      document.head.appendChild(script);
    }
  };

  if (cookies.cookieConsent === undefined) {
    loadGoogleAnalytics();
  }

  return (
    <div className="cookie-consent-wrapper">
      <p>
        This website uses cookies to enhance your experience. By clicking "I
        Accept," you consent to our use of cookies. You can learn more about our
        cookie policy in our <a className="text-blue-600 hover:underline" href="/privacy-policy">Privacy Policy.</a>
      </p>
      <div className="flex gap-3">
        <button className="accept-btn" onClick={handleAccept}>
          Accept
        </button>
        <button className="decline-btn" onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  );
}
