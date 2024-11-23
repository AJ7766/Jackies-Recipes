"use client"
import { useCookieConsent } from "@/_utils/cookies";
import { useEffect, useState } from "react";
import { CookieConsentComponent } from "../_components/CookieConsentComponent";

export function CookieConsent() {
  const { cookies, acceptCookies, declineCookies } = useCookieConsent();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (
      !document.querySelector(
        `script[src="https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ"]`
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-W37LZK4XFJ";
      script.async = true;

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());

        if (cookies.cookieConsent) {
          window.gtag("config", "G-W37LZK4XFJ", {
            page_path: window.location.pathname,
          });
        }
      };
      document.head.appendChild(script);
    } else if (window.gtag && cookies.cookieConsent) {
      window.gtag("config", "G-W37LZK4XFJ", {
        page_path: window.location.pathname,
      });
    }
  }, [cookies.cookieConsent]);

  if (!isClient || cookies.cookieConsent !== undefined)
    return null;

  return <CookieConsentComponent acceptCookies={acceptCookies} declineCookies={declineCookies}/>
}
