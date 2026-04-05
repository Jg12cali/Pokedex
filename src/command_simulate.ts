import { GoogleGenAI } from "@google/genai";
import type { pokemon } from "./pokeapi.js";
import type { State } from "./state.js";


const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash-lite";

function pokemonSimPayload(p: pokemon) {
  return {
    id: p.id,
    name: p.name,
    base_experience: p.base_experience,
    height: p.height,
    weight: p.weight,
    is_default: p.is_default,
    order: p.order,
    stats: p.stats.map((s) => ({
      name: s.stat.name,
      base_stat: s.base_stat,
      effort: s.effort,
    })),
    types: p.types.map((t) => ({ slot: t.slot, name: t.type.name })),
    abilities: p.abilities.map((a) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden,
      slot: a.slot,
    })),
  };
}

export async function commandSimulate(
  state: State,
  pokemonA: string,
  pokemonB: string,
) {
  const { caughtPokemon } = state;

  if (!pokemonA || !pokemonB) {
    console.log("Usage: simulate <pokemon1> <pokemon2>");
    return;
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.log("Set GEMINI_API_KEY in your environment to use simulate.");
    return;
  }

  const a = caughtPokemon[pokemonA];
  const b = caughtPokemon[pokemonB];

  if (!a) {
    console.log(`You have not caught ${pokemonA}`);
    return;
  }
  if (!b) {
    console.log(`You have not caught ${pokemonB}`);
    return;
  }

  const payload = {
    pokemon1: pokemonSimPayload(a),
    pokemon2: pokemonSimPayload(b),
  };

  const prompt = `You are a Pokémon battle analyst. Below is JSON with two caught Pokémon and their full base stats (hp, attack, defense, special-attack, special-defense, speed), types, and abilities from the PokéAPI-shaped data.

Using only this data (you may reason about type matchups and stat trends), simulate a single battle between them and describe the flow and likely winner in a couple concise sentences (max 6).

${JSON.stringify(payload)}`;

  const ai = new GoogleGenAI({ apiKey: key });

  try {
    console.log("Simulating battle...");
    const stream = await ai.models.generateContentStream({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        maxOutputTokens: 400,
        
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    let anyText = false;
    for await (const chunk of stream) {
      const piece = chunk.text;
      if (piece) {
        anyText = true;
        process.stdout.write(piece);
      }
    }
    if (anyText) {
      console.log();
    } else {
      console.log("No response text from Gemini.");
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log(`Gemini request failed: ${message}`);
  }
}
