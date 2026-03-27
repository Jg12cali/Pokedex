import type { State } from "./state.js"

export async function commandMap(state: State) {
  const { pokeAPI, nextLocationsURL } = state;

  if (nextLocationsURL) {
    let result = await pokeAPI.fetchLocations(nextLocationsURL)
    state.prevLocationsURL = result.previous
    state.nextLocationsURL = result.next
    for (let ob of result.results) {
      console.log(ob.name)
    }
  } else if (!nextLocationsURL) {
    let result = await pokeAPI.fetchLocations()
    state.prevLocationsURL = result.previous
    state.nextLocationsURL = result.next
    for (let ob of result.results) {
      console.log(ob.name)
    }
  }
}

export async function commandMapb(state: State) {
  const { rl, commands, prevLocationsURL, pokeAPI } = state;

  if (prevLocationsURL) {
    let result = await pokeAPI.fetchLocations(prevLocationsURL)
    state.prevLocationsURL = result.previous
    state.nextLocationsURL = result.next

    for (let ob of result.results) {
      console.log(ob.name)
    }
  } else if(!prevLocationsURL){

  console.log("you're on the first page")
  }
}