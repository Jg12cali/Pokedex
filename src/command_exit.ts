
import type { CLICommand } from "./state.js"


export function commandExit(commands : Record<string, CLICommand>) {

   console.log("Closing the Pokedex... Goodbye!") 
   process.exit(0)
}




