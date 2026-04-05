import type { State } from "./state.js"


export async function commandCatch(state: State, Pokemon: string) {
    const { pokeAPI, caughtPokemon } = state;

    if (!Pokemon) {
        console.log("You need to specify a Pokemon name.")
        return
    }

    try {
        console.log(`Throwing a Pokeball at ${Pokemon}...`)
        const result = await pokeAPI.fetchPokemon(Pokemon, caughtPokemon)
        if (result.base_experience > Math.floor(Math.random() * 300)) {
            console.log(`${Pokemon} escaped!`)
            return
        }

        console.log(`${Pokemon} was caught!`)
        caughtPokemon[Pokemon] = result
    } catch (err) {
        console.log((err as Error).message)
    }
}



