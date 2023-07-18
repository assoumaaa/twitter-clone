import Link from "next/link";
import { RouterOutputs, api } from " /utils/api";
import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

dayjs.extend(relativeTime);

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <Link href={`/post/${post.id}`}>
      <div
        key={post.id}
        className="border-gray-30 flex w-full items-center gap-3 border-b p-4"
      >
        <Link href={`/${author.id}`}>
          <Image
            className="rounded-full"
            src={author.profilePicture}
            alt="pp"
            width={56}
            height={56}
          />
        </Link>

        <div className="flex  flex-col ">
          <div className="flex w-full flex-row">
            <Link href={`/${author.id}`}>
              <span>@{author?.username}</span>
            </Link>
            <span className="text-slate-500">
              . {dayjs(post.createdAt).fromNow()}
            </span>
          </div>
          <span>{post.content}</span>
        </div>
      </div>
    </Link>
  );
};
