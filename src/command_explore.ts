import type { State } from "./state.js"


export async function commandExplore(state: State, name: string) {
    const { pokeAPI } = state;

    if (!name) {
      console.log("You need to specify a location name.")
      return
    }

    try {
      const result = await pokeAPI.fetchLocation(name)
      console.log(`Exploring ${name}...`)
      console.log("Found Pokemon:")
      for (const ob of result.pokemon_encounters) {
        console.log(ob.pokemon.name)
      }
    } catch (err) {
      console.log((err as Error).message)
    }
}
