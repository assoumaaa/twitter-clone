import Head from "next/head";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Profile View</title>
      </Head>

      <main className="flex min-h-screen w-full justify-center">
        <p>Profile View</p>
      </main>
    </>
  );
}
