export const checkNavBar = (pathname: string, isAuth: boolean) => {
    return !((pathname === "/" && !isAuth) || pathname === "/register");
}