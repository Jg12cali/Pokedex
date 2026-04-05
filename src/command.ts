import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js"
import { commandMapb } from "./command_map.js"
import { commandExplore } from "./command_explore.js"
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandSimulate } from "./command_simulate.js";
import { commandRareCandy } from "./command_rare_candy.js";
import type { CLICommand } from "./state.js"

  export function getCommands(): Record<string, CLICommand> {
    return {
   
      exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
    },

      help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp, 
      
      },  

      map: {
          name: "map",
          description: "Get the next page of locations",
          callback: commandMap,
        },

      mapb: {
          name: "mapb",
          description: "Get the previous page of locations",
          callback: commandMapb,

        },

        explore: {
          name: "explore",
          description: "See the Pokemon in a specific location",
          callback: commandExplore,


        },

        catch: {
          name: "catch",
          description: "Attempt to catch a wild pokemon",
          callback: commandCatch


        },

        inspect: {
          name: "inspect",
          description: "Inspect a caught pokemon",
          callback: commandInspect
        },

        pokedex: {
          name: "pokedex",
          description: "See the list of pokemon you have caught",
          callback: commandPokedex

        },

        rarecandy: {
          name: "rarecandy",
          description: "Boost a caught pokemon's stats by random percentages",
          callback: commandRareCandy,
        },

        simulate: {
          name: "simulate",
          description:
            "Battle simulation via Gemini (2.5 Flash-Lite by default; set GEMINI_MODEL to override)",
          callback: commandSimulate,
        },


      }}

 
