import type { State } from "./state.js"

export async function commandMap(state: State) {
  const { pokeAPI, nextLocationsURL } = state;

  try {
    if (nextLocationsURL) {
      const result = await pokeAPI.fetchLocations(nextLocationsURL)
      state.prevLocationsURL = result.previous
      state.nextLocationsURL = result.next
      for (const ob of result.results) {
        console.log(ob.name)
      }
    } else if (!nextLocationsURL) {
      const result = await pokeAPI.fetchLocations()
      state.prevLocationsURL = result.previous
      state.nextLocationsURL = result.next
      for (const ob of result.results) {
        console.log(ob.name)
      }
    }
  } catch (err) {
    console.log((err as Error).message)
  }
}

export async function commandMapb(state: State) {
  const { prevLocationsURL, pokeAPI } = state;

  try {
    if (prevLocationsURL) {
      const result = await pokeAPI.fetchLocations(prevLocationsURL)
      state.prevLocationsURL = result.previous
      state.nextLocationsURL = result.next

      for (const ob of result.results) {
        console.log(ob.name)
      }
    } else if (!prevLocationsURL) {

      console.log("you're on the first page")
    }
  } catch (err) {
    console.log((err as Error).message)
  }
}
