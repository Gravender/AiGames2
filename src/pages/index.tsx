import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "npm/utils/api";
import { LoadingPage } from "npm/components/loading";
import toast from "react-hot-toast";

const Home: NextPage = () => {
  const { data: hello, isLoading } = api.example.hello.useQuery({
    text: "from tRPC",
  });
  if (isLoading) return <LoadingPage />;
  return (
    <>
      <main className="flex justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData?.user && (
          <div>
            <p>Logged In as:</p>
            <div className="flex gap-2 border-b border-slate-300 p-8 font-bold">
              <Image
                width="56"
                height="56"
                src={sessionData.user?.image ? sessionData.user?.image : ""}
                alt={`${
                  sessionData.user?.name ? sessionData.user?.name : ""
                }'s profile picture`}
                className="h-14 w-14 rounded-full"
              />
              <span>{sessionData.user?.name}</span>
              <button
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                onClick={() => toast.success("Toast Test")}
              >
                Toast Test
              </button>
              <Link href="/games">games</Link>
            </div>
          </div>
        )}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
