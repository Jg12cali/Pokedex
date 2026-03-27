import { createInterface } from "readline"
import { getCommands } from "./command.js"
import type { State } from "./state.js"


export async function startREPL(state: State) {
  const { rl, commands, pokeAPI } = state;
 
  rl.prompt()
  
  rl.on("line", async(input) => {
    if (!input) {
      rl.prompt()
      return
    }

    const result = cleanInput(input)

    if (result[0] === "exit") {
      try {
        commands.exit.callback(state)
      } catch (err) {
        console.log((err as Error).message)
      }
    } else if (result[0] === "help") {
      try {
        commands.help.callback(state)
      } catch (err) {
        console.log((err as Error).message)
      }
    } else if (result[0] === "map") {
      try {
        commands.map.callback(state)
      } catch (err) {
        console.log((err as Error).message)
      }
    } else if (result[0] === "mapb") {
      try {
        commands.mapb.callback(state)
      } catch (err) {
        console.log((err as Error).message)
      }
    } else {
      console.log("Unknown command")
      rl.prompt()
    }
  })
}


export function cleanInput(input: string): string[] {
  const cleaned = input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((item) => item !== "")

  return cleaned
}



