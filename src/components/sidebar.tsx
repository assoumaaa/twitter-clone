import React from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { PiUserCirclePlusLight } from "react-icons/pi";

export default function SideBar() {
  const user = useUser();

  if (!user) return <div>404</div>;

  return (
    user.isLoaded && (
      <div className="flex h-full flex-col items-center justify-between p-2">
        <Image
          className="cursor-pointer"
          src={"/logo.png"}
          alt="pp"
          width={92}
          height={92}
          priority={true}
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <div>
          {user.isSignedIn ? (
            <div className="group relative flex justify-center">
              <span className="absolute bottom-11 left-0 flex w-32 scale-0 items-center justify-center rounded-xl bg-primary p-4 text-sm text-black transition-all duration-300 group-hover:scale-100">
                <SignOutButton>
                  <p className="cursor-pointer">
                    Logout @{user.user?.firstName}
                  </p>
                </SignOutButton>
              </span>
              <Image
                className="z-10 cursor-pointer rounded-full"
                src={user.user?.imageUrl}
                alt="pp"
                width={56}
                height={56}
              />
            </div>
          ) : (
            <div className="cursor-pointer">
              <SignInButton>
                <PiUserCirclePlusLight className="h-12 w-12" />
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    )
  );
}
