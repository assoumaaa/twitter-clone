import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function SideBar() {
  const user = useUser();

  if (!user) return <div>404</div>;

  return (
    user.isLoaded && (
      <div className="flex h-full flex-col items-center justify-between">
        <div> Logo</div>
        <div>
          {user.isSignedIn ? (
            <div>
              <Image
                className="rounded-full"
                src={user.user?.imageUrl}
                alt="pp"
                width={56}
                height={56}
              />
            </div>
          ) : (
            <div>
              <AiOutlineUserAdd className="h-10 w-10" />
            </div>
          )}
        </div>
      </div>
    )
  );
}
