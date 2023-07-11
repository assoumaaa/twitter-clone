import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from " /utils/api";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { ClerkProvider, useUser, SignIn, SignedOut } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { LoadingPage } from " /components/loading";
import { useContext, useState } from "react";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const [input, SetInput] = useState("");
  const user = useUser();
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      SetInput("");
      void ctx.posts.getAll.invalidate();
    },
  });

  if (!user.user) return null;

  return (
    <div className="flex gap-3 p-4">
      <Image
        className="rounded-full"
        src={user.user?.imageUrl}
        alt="pp"
        width={56}
        height={56}
      />
      <input
        className="w-full p-1 outline-none"
        placeholder="What's on your mind?"
        type="text"
        value={input}
        onChange={(e) => SetInput(e.target.value)}
        disabled={isPosting}
      />
      <button onClick={() => mutate({ content: input })}>Post</button>
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div
      key={post.id}
      className="flex w-full items-center gap-3 border-b border-gray-300 p-4"
    >
      <Image
        className="rounded-full"
        src={author.profilePicture}
        alt="pp"
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex flex-row ">
          <span>@{author?.username}</span>
          <span className="text-slate-500">
            . {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();
  if (postsLoading) return <LoadingPage />;
  if (!data) return null;

  return (
    <div>
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;
  return (
    <>
      <Head>
        <title>GGtwitter</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen w-full justify-center">
        <div className=" w-full max-w-2xl content-center border-x border-gray-300">
          <p className="p-4 text-2xl font-bold">Home</p>
          <div className="flex w-full  border-b border-gray-300 text-xl">
            <button className="w-full justify-center p-4 font-bold decoration-blue-600  hover:bg-slate-200 focus:underline">
              All
            </button>
            <button className="w-full justify-center p-4 font-bold decoration-blue-600  hover:bg-slate-200 focus:underline">
              Following
            </button>
          </div>
          {isSignedIn ? <CreatePostWizard /> : <SignInButton />}
          <SignOutButton />
          <Feed />
        </div>
      </main>
    </>
  );
}
