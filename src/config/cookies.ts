import { useCookies } from 'react-cookie';

export const useCookieConsent = () => {
    const [cookies, setCookies] = useCookies(["cookieConsent"]);

    const acceptCookies = () => {
        setCookies('cookieConsent', true, { path: '/' });
    };

    const declineCookies = () => {
        setCookies('cookieConsent', false, { path: '/' });
    };

    const resetCookieConsent =() => {
        setCookies('cookieConsent', undefined, { path: '/' });
    }
    return {
        resetCookieConsent,
        cookies,
        acceptCookies,
        declineCookies
    };
};