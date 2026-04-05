import type { State } from "./state.js";

export async function commandPokedex(state: State){
    const { caughtPokemon } = state

    if(Object.keys(caughtPokemon).length === 0){
        console.log("You haven't caught any pokemon yet!")
        return 
    }

    console.log("Your Pokedex:")
    for (const key in caughtPokemon){

        console.log(`- ${key}`)
    }


}
