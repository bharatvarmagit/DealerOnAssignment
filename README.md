# DealerOnAssignment
coding assignment for 2nd Problem.

### Design :
   Followed a Modular approach by isolating each individual functionality(intermediate output) for testing purposes
  I provided user with two flows
  1. either enter a path to file via command line or in the prompt when asked by the program and get the results
  2. enter detials manually 
  (i.e) for each item ,enter all the properties with option to continure adding new items.
  when user enters n/N when prompts asks user if user wants to add items. it will generate the reciept
  
### Assumptions:
  #### user provides 
  1. name : string
  2. quantity: number
  3. isImported: string (y/Y for true and n/N for false) converted to boolean
  4. unitPrice: number
  #### file should have this format for each line: 
  1. should have minimun of three strings 
  2. each line can contain at most info about one unique item name
  3. quantity is the first string
  4. name is second string ( can have composite names like "alphonso mango")
  5. price should be the last string before reqching end of line
  7. cannot have any symbols or strings other than "at" to indicate price. (see sample lines Below)
  6 can enter an item multiple times in different lines 
  
      * sample 1:  2 imported Apple at 3.49
      * sample 2:  1 apple 5.5
      * sample 3:  Imported apple 5.99

## run `npm i` to install packages 

if you dont have typesript 

## run `npm i -g typescript`

before you compile beacuse the import will have name conflicts with js and ts files having same name after tsc transpiles to js
## run `npm test`

## run `tsc main && node main` 
