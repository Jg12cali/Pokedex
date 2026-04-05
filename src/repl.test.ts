import { cleanInput, startREPL } from "./repl.js";
import { expect, test, vi } from "vitest";
import { Cache } from "./pokecache"
import type { State } from "./state.js";
import { commandRareCandy } from "./command_rare_candy.js";

test.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 3));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});


test("startREPL awaits command callbacks and re-prompts after handled errors", async () => {
  const prompt = vi.fn();
  const on = vi.fn((event: string, handler: (input: string) => Promise<void>) => {
    if (event === "line") {
      void handler("catch pikachuu");
    }

    return rl;
  });

  const rl = { prompt, on } as unknown as State["rl"];
  const catchCallback = vi.fn(async () => {
    console.log('Pokemon "pikachuu" was not found.');
  });

  const state = {
    rl,
    commands: {
      catch: {
        name: "catch",
        description: "Attempt to catch a wild pokemon",
        callback: catchCallback,
      },
    },
    pokeAPI: {} as State["pokeAPI"],
    nextLocationsURL: "",
    prevLocationsURL: "",
    caughtPokemon: {},
  } as unknown as State;

  startREPL(state);
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(catchCallback).toHaveBeenCalledWith(state, "pikachuu");
  expect(prompt).toHaveBeenCalledTimes(2);
});

test("ultra-rare-candy boosts each caught pokemon stat by a random percentage", async () => {
  const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0)

  const pikachu = {
    stats: [
      { base_stat: 100, stat: { name: "hp", url: "" } },
      { base_stat: 80, stat: { name: "attack", url: "" } },
    ],
  } as State["caughtPokemon"][string]

  const state = {
    caughtPokemon: {
      pikachu,
    },
  } as unknown as State

  await commandRareCandy(state, "pikachu")

  expect(pikachu.stats[0]?.base_stat).toBe(105)
  expect(pikachu.stats[1]?.base_stat).toBe(84)

  randomSpy.mockRestore()
});

















