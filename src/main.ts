
import { startREPL } from "./repl.js";
import { initState } from "./state.js"
import type { State } from "./state.js"

const state = initState()

function main(state: State) {
  startREPL(state);
}

main(state);