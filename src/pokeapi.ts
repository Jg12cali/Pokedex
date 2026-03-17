export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
            if(pageURL){
            let result = await fetch(pageURL)
            return await result.json()
            } 
            let result = await fetch(`${PokeAPI.baseURL}/location-area/`)
            return await result.json()
                
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
            let result = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}/`)
            return await result.json()
           
    }
  }

    let x = new PokeAPI()

    console.log(await x.fetchLocations())
  

// ****  types start here 

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
      name: string;
      url: string;
    }[];
  };
  
  export type Location = {
    encounter_method_rates: {
      encounter_method: {
        name: string;
        url: string;
      };
      version_details: {
        rate: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
    game_index: number;
    id: number;
    location: {
      name: string;
      url: string;
    };
    name: string;
    names: {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }[];
    pokemon_encounters: {
      pokemon: {
        name: string;
        url: string;
      };
      version_details: {
        encounter_details: {
          chance: number;
          condition_values: any[];
          max_level: number;
          method: {
            name: string;
            url: string;
          };
          min_level: number;
        }[];
        max_chance: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };
  
      