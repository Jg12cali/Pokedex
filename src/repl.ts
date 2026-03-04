import { createInterface } from "readline"

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex >'
  })



export function startREPL(){

rl.prompt()

rl.on("line", (input => { 

    if(!input) {
        rl.prompt()
        return
        


}

const result = cleanInput(input)

console.log(`Your command was: ${result[0]}`)
rl.prompt()


}))}



export function cleanInput (input: string): string[] {

 let cleaned  = input.toLowerCase().trim().split(' ').filter(item => item !== '')
 return cleaned

}

