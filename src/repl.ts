import { createInterface } from "readline"
import { getCommands } from "./command.js"
import { commandExit } from "./command_exit.js";
import { commandHelp }from "./command_help.js";




const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex >",
})

export function startREPL() {
  rl.prompt()

  rl.on("line", (input) => {
    if (!input) {
      rl.prompt()
      return
    }

    const result = cleanInput(input)
    const commands = getCommands()

    if (result[0] === "exit") {
      try {
        commands.exit.callback(commands)
      } catch (err) {
        console.log((err as Error).message)
      }
    } else if (result[0] === "help") {
      try {
        commands.help.callback(commands)
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