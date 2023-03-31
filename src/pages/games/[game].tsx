import { type NextPage } from "next";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <>
      <main className="flex justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            Not a Valid Game
            <Link href="/games">Games</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
