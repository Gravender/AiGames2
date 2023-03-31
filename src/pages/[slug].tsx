import { type NextPage } from "next";
const Home: NextPage = () => {
  return (
    <>
      <main className="flex justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Hi!</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
