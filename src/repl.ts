import type { State } from "./state.js"


export async function startREPL(state: State) {
  const { rl, commands } = state;
 
  rl.prompt()
  
  rl.on("line", async(input) => {
    if (!input) {
      rl.prompt()
      return
    }

    const result = cleanInput(input)
    const command = commands[result[0]]
    if (!command) {
      console.log("Unknown command")
      rl.prompt()
      return
    }

    await command.callback(state, ...result.slice(1))

    if (command.name !== "exit") {
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
