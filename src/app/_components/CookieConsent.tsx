import { useCookieConsent } from "@/_utils/cookies";

export function CookieConsent() {
  const { acceptCookies, declineCookies } = useCookieConsent();

  return (
    <div className="cookie-consent-wrapper">
      <p>
        This website uses cookies to enhance your experience. By clicking "I
        Accept," you consent to our use of cookies. You can learn more about our
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
