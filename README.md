# Pokedex CLI

A TypeScript command-line Pokedex that lets users explore the Pokemon world, catch and inspect Pokemon, power them up with Rare Candy, and even simulate battles with an LLM API call.

This project was built as a terminal-first experience with a focus on clean command design, external API integration, stateful gameplay, and resilient error handling.

## special sauce

- Built in TypeScript with a modular command architecture instead of one large script
- Integrates with the [PokeAPI](https://pokeapi.co/) to fetch real Pokemon and location data
- Includes in-memory caching to reduce repeated API calls and improve responsiveness
- Handles invalid input gracefully, including misspelled Pokemon and missing command arguments
- Adds an AI-powered battle simulation feature using Gemini

## Features

- `map`: Browse Pokemon world locations page by page
- `mapb`: Navigate backward through location pages
- `explore <location>`: See which Pokemon can be found in a specific area
- `catch <pokemon>`: Attempt to catch a wild Pokemon
- `inspect <pokemon>`: View detailed stats and typing for a caught Pokemon
- `pokedex`: List every Pokemon you have caught during the session
- `rarecandy <pokemon>`: Increase a caught Pokemon's stats by random percentages
- `simulate <pokemon1> <pokemon2>`: Use Gemini to generate a battle analysis between two caught Pokemon

## Tech Stack

- TypeScript
- Node.js
- Vitest
- PokeAPI
- Google Gemini API

## What I Practiced Here

- Designing a REPL-style CLI application
- Organizing features into focused command modules
- Managing shared application state across commands
- Consuming and validating third-party API data
- Writing tests for parsing, caching, and command behavior

## Project Structure

```text
src/
  main.ts               App entrypoint
  repl.ts               REPL loop and command resolution
  command.ts            Command registry
  command_*.ts          Individual command handlers
  pokeapi.ts            PokeAPI client and Pokemon types
  pokecache.ts          In-memory cache implementation
  state.ts              Shared app state
```

## Getting Started

### What you need first

Before running this project, make sure you have:

- `Node.js` installed
- `npm` installed

If you install Node.js, `npm` usually comes with it.

You do not need a database or any extra software.

The core Pokedex commands work right away after install.

The only optional extra is a `GEMINI_API_KEY` if you want to use the `simulate` battle command.

### 1. Install project dependencies

This downloads the packages the app needs in order to run:

```bash
npm install
```

### 2. Run the project

This starts the app in your terminal:

```bash
npm run dev
```

### 3. Build for production

If you want to compile the TypeScript code first and then run the built version:

```bash
npm run build
npm start
```

## Environment Variables

The base Pokedex features do not require any environment variables.

To use AI battle simulation, set this first:

```bash
export GEMINI_API_KEY=your_api_key_here
```

This is only needed for:

- `simulate <pokemon1> <pokemon2>`

Optional:

```bash
export GEMINI_MODEL=gemini-2.5-flash-lite
```

## Example Flow

```text
Pokedex > map
Pokedex > explore canalave-city-area
Pokedex > catch pikachu
Pokedex > inspect pikachu
Pokedex > rarecandy pikachu
Pokedex > simulate pikachu bulbasaur
```

## Testing

```bash
npm test
```

