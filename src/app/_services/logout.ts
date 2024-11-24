import { NextRouter } from "next/router";
import { fetchGetLogoutAPI } from "./api/fetchLogoutAPI";

export const handleLogoutWithoutJSX = async (router: NextRouter) => {
    const { success, message } = await fetchGetLogoutAPI();
  
    if (!success) {
      console.error(message);
      return;
    }
  
    // After successful logout, trigger navigation
    router.push('/');
  };