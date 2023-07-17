import Head from "next/head";
import { useUser } from "@clerk/nextjs";

export default function SinglePostPage() {
  const { isLoaded: userLoaded } = useUser();

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>post</title>
      </Head>

      <main className="flex min-h-screen w-full justify-center">
        <p>Post with ID</p>
      </main>
    </>
  );
}
