import type { State } from "./state.js"

const MIN_BOOST_PERCENT = 5
const MAX_BOOST_PERCENT = 30

function getRandomBoostPercent(): number {
  return Math.floor(Math.random() * (MAX_BOOST_PERCENT - MIN_BOOST_PERCENT + 1)) + MIN_BOOST_PERCENT
}

export async function commandRareCandy(state: State, pokemonName: string) {
  const { caughtPokemon } = state

  if (!pokemonName) {
    console.log("You need to specify a Pokemon name.")
    return
  }

  const pokemon = caughtPokemon[pokemonName]
  if (!pokemon) {
    console.log(`You have not caught ${pokemonName}`)
    return
  }

  console.log(`Feeding a Rare Candy to ${pokemonName}...`)
  console.log("Stat boosts:")

  for (const stat of pokemon.stats) {
    const boostPercent = getRandomBoostPercent()
    const originalValue = stat.base_stat
    const increasedAmount = Math.max(1, Math.floor(originalValue * (boostPercent / 100)))

    stat.base_stat += increasedAmount
    console.log(`-${stat.stat.name}: ${originalValue} -> ${stat.base_stat} (+${boostPercent}%)`)
  }
}
