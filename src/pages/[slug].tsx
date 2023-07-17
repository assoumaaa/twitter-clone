import Head from "next/head";
import { api } from " /utils/api";
import { GetStaticProps } from "next";
import { generateSSGHelper } from " /server/helpers/ssgHelper";
import { PageLayout } from " /components/layout";
import Image from "next/image";

export default function ProfilePage({ userId }: { userId: string }) {
  const { data } = api.profile.getUserById.useQuery({
    userId: userId,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>Profile View</title>
      </Head>

      <PageLayout>
        <div className=" relative flex h-1/4 flex-col bg-slate-400">
          <Image
            className="absolute bottom-0 left-0 -mb-16 ml-4 rounded-full border-4 border-black"
            src={data.profilePicture}
            alt="pp"
            width={128}
            height={128}
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@ ${
          data.username ?? ""
        } `}</div>
        <div className="w-full border-b border-gray-300"></div>
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
