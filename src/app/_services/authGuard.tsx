import { getSession } from "@/_utils/session"
import ErrorPage from "../_errors/ErrorPage";

export const AuthGuard = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();
    if (!session.isAuth)
        return <ErrorPage />

    return <>{children}</>
}