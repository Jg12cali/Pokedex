export function cleanInput (input: string): string[] {

 let cleaned  = input.toLowerCase().trim().split(' ').filter(item => item !== '')
 return cleaned

}



