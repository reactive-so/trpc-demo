import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Pokemon from "../components/Pokemon";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [offset, setOffset] = useState(0);
  const { data, refetch } = trpc.useQuery(["pokemon.findAll", { offset }]);

  useEffect(() => {
    refetch();
  }, [offset]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-6 text-5xl font-black text-indigo-500">
          Pokemon list with Next
        </h1>
        {data?.results ? (
          <>
            <div className="w-full grid grid-cols-2 gap-4">
              {data.results.map((pokemon) => (
                <Pokemon key={pokemon.name} name={pokemon.name} />
              ))}
            </div>
            <div className="w-full flex justify-evenly items-center">
              {data.previous && (
                <button
                  onClick={() => setOffset((prev) => prev - 20)}
                  className="mt-4 font-extrabold"
                >
                  Previous page
                </button>
              )}
              {data.next && (
                <button
                  onClick={() => setOffset((prev) => prev + 20)}
                  className="mt-4 font-extrabold"
                >
                  Next page
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="font-black">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
