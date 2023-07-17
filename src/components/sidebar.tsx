import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function SideBar() {
  const user = useUser();
  console.log(user);

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <p> Logo</p>
      <p>
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
      </p>
    </div>
  );
}
