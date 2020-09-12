const prompt = require('prompt-sync')({sigint: true});
import Item from './Item';
import {MainPrompt} from './helpers/Constants';
import { fetchDataFromFile} from './helpers/fileFunctions';
import {getItemsManually} from './helpers/manualFunctions'
import {countTotalQuantityPerItem, isErr, printReciept} from './helpers/commonFunctions';


 function fileFlow(filePath:string){
   const items: any = fetchDataFromFile(filePath);
   if (isErr(items)) { //check if path is correct or file has acceptable format
     main(items + " " + MainPrompt); // re-enter main function wih error message
     return
   }
   return items;    //if everything is good, get the items from file
 }



 function main(MainPrompt:string){
   let items:Item[];
  let filePath:string=process.argv[2]; //get filepath from command lin args
  if (filePath){      //check if filepath is entered on command line
    items=fileFlow(filePath) //then get items from fileFlow
  }
  else{
    //if filepath not found ask if user wants to provide file or enter data manually
    let flowInput:string = prompt(MainPrompt);
    switch (flowInput) {
      case '1':  // user chose to provide file path
        filePath=prompt("enter the file name or path relative to main.js : ");
        items=fileFlow(filePath);
        break;
      case '2':
        items=getItemsManually();
        break;
      default:
        main('Incorrect Input! \n' + MainPrompt);
        return;
    }
  }
    const { quantCountMap, totalPriceBeforeTax, totalSalesTax } = countTotalQuantityPerItem(items);
    printReciept(quantCountMap, totalPriceBeforeTax, totalSalesTax);

}

//program starts here
main(MainPrompt);










