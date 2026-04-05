import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js"
import { PokeAPI } from "./pokeapi.js"
import { Cache } from "./pokecache.js";
import type { pokemon } from "./pokeapi.js";

const cache = new Cache(5000)
const pokeAPI = new PokeAPI(cache)



export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
  };


  export type State = {

    rl: Interface,
    commands: Record<string, CLICommand>,
    pokeAPI : PokeAPI,
    nextLocationsURL: string,
    prevLocationsURL: string,
    caughtPokemon: Record<string, pokemon>

  }

  export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >",
      })

      const commands = getCommands()

      return {
            rl: rl,
            commands: commands,
            pokeAPI: pokeAPI,
            nextLocationsURL: '',
            prevLocationsURL: '',
            caughtPokemon: {

            }


     }
      
       

  }


