import { createRouter } from "./context";
import { z } from "zod";

// Create API schema
const pokemonSchema = z.object({
  count: z.number(),
  next: z.string().nullish(),
  previous: z.string().nullish(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export const pokemonRouter = createRouter().query("findAll", {
  // Create input schema
  input: z.object({
    offset: z.number(),
  }),
  async resolve({ input }) {
    const res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${input.offset}`)
    ).json();

    // Validate the response
    return pokemonSchema.parse(res);
  },
});
