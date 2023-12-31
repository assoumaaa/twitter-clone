import type { PropsWithChildren } from "react";
import SideBar from "./sidebar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <div className="sticky left-0 top-0 h-svh">
        <SideBar />
      </div>
      <div className="w-full max-w-3xl border-x border-gray-300">
        {props.children}
      </div>
    </main>
  );
};
