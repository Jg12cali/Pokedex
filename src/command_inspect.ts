import type { State } from "./state.js"

export async function commandInspect(state: State, Pokemon: string) {

const { caughtPokemon } = state


if(caughtPokemon[Pokemon]){

const pokeData = caughtPokemon[Pokemon]

console.log(`Name: ${pokeData.name}`)
console.log(`Height: ${pokeData.height}`)
console.log(`Weight: ${pokeData.weight}`)
const [hp, attack, defense, specialattack, specialdefense, speed] = pokeData.stats
console.log("Stats:")
console.log(`-hp: ${hp.base_stat}`)
console.log(`-attack: ${attack.base_stat} `)
console.log(`-defense: ${defense.base_stat}`)
console.log(`-special-attack: ${specialattack.base_stat}`)
console.log(`-special-defense: ${specialdefense.base_stat}`)
console.log(`-speed: ${speed.base_stat}`)
console.log("Types:")
for (const type of pokeData.types) {
    console.log(`-${type.type.name}`)

}

return

}

 console.log(`You have not caught ${Pokemon}`)




}



