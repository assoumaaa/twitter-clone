import { type AppType } from "next/app";
import { api } from " /utils/api";
import " /styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Head>
        <title>GGtwitter</title>
        <meta
          name="description"
          content="GGtwitter: Engage, share, and express freely without fear of judgment or bans!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" reverseOrder={true} />
      <Component {...pageProps} />{" "}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
