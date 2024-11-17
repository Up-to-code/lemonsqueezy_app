 import {
    getAuthenticatedUser,
    lemonSqueezySetup,
  } from "@lemonsqueezy/lemonsqueezy.js";
  
  lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY,
    onError: (error) => console.error("Error!", error),
  });
 
  export const GET = async () => {
    const { data, error } = await getAuthenticatedUser();
    if (error) {
      console.error("Error!", error);
    } else {
      console.log("Success!", data);
    }
  };
  