import type React from "react";

interface PokemonProps {
  name: string;
}

const Pokemon: React.FC<PokemonProps> = ({ name }) => {
  return (
    <div className="w-full p-2 border-4 border-indigo-500 rounded-lg flex justify-center items-center">
      <p className="text-sm font-black">{name}</p>
    </div>
  );
};

export default Pokemon;
