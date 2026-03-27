import { TIMEOUT } from "node:dns";

type CacheEntry<T> = {
    createdAt: number,
    val: T

}


export class Cache {

    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout|undefined = undefined
    #interval: number 

    constructor(interval: number) {
        this.#interval = interval
        this.#startReapLoop()
    }
    
    add<T>(key: string, val: T) {
        const date = Date.now()
        let entry = {createdAt: date, val: val }
        this.#cache.set(key, entry)
     }

    get<T>(key: string) {
        if(!this.#cache.has(key)){
        return undefined
        }
        let entry = this.#cache.get(key)
        return entry?.val             
      }

    #reap() {
       for (const [key, value] of this.#cache) {
       if(value.createdAt < Date.now() - this.#interval){
       this.#cache.delete(key)
        
                }
          }
    }

    #startReapLoop() {
                  this.#reapIntervalId = setInterval(() => {
                  this.#reap()
            
                  }, this.#interval);

    }

    stopReapLoop() {
        
        clearInterval(this.#reapIntervalId)
        this.#reapIntervalId = undefined



    }

        
        }













// for (const value of this.#cache.values()){
     
//     if(value.createdAt > Date.now() - this.#interval){

//     this.#cache.delete([key, value])

//     }