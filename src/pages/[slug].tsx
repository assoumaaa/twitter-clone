import Head from "next/head";
import { api } from " /utils/api";
import { generateSSGHelper } from " /server/helpers/ssgHelper";
import { PageLayout } from " /components/layout";
import Image from "next/image";
import { PostView } from " /components/postView";
import { LoadingPage } from " /components/loading";
import type { GetStaticProps } from "next";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading: profilePostsLoading } =
    api.posts.getPostByUserId.useQuery({
      userId: props.userId,
    });

  if (profilePostsLoading) return <LoadingPage />;

  if (!data) return <div>User has no posts</div>;

  return (
    <div>
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default function ProfilePage({ userId }: { userId: string }) {
  const { data } = api.profile.getUserById.useQuery({
    userId: userId,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>

      <PageLayout>
        <div className="relative h-36 bg-slate-400">
          <Image
            className="absolute bottom-0 left-0 -mb-16 ml-4 rounded-full border-4 border-black"
            src={data.profilePicture}
            alt="pp"
            width={128}
            height={128}
            priority={true}
          />
        </div>
        <div className="h-[64px]"></div>

        <div className="p-4 text-2xl font-bold">
          {`@ ${data.username ?? ""} `}
        </div>
        <div className="w-full border-b border-gray-300"></div>

        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const userId = context.params?.slug;

  if (typeof userId !== "string") throw new Error("no userId");

  await ssg.profile.getUserById.prefetch({ userId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      userId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
