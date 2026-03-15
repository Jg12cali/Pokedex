import type { CLICommand } from "./state.js"
import type { State } from "./state.js"

export function commandHelp(state: State) {
  const { rl, commands } = state;

  console.log();
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log();
  for (const cmd of Object.values(commands)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
  console.log();


}



