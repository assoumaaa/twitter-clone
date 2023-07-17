import { type AppType } from "next/app";
import { api } from " /utils/api";
import " /styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <Component {...pageProps} />{" "}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
