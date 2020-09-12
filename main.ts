
const prompt = require('prompt-sync')({sigint: true});
import { isString } from 'util';
import Item from './Item';


const getItems=()=>{
  let items:Item[];
}

const getItem=async()=>{
  let name=getName();
  let quantity=getQuantity();
  let isImported=getIsImported();
  console.log("is impoerted boolean : ",isImported);

  // let isImported=prompt("is it imported? (y/n) : ");
  // let unitPrice=prompt(`unit price of ${name} : `);
}
const getName=()=>{
  let promptName="Enter the name of the Product : "
  let name ;
  do{
    name= prompt(promptName);
    promptName="Expected String, Recieved Number! "+promptName;
  }
  while(!isNaN(Number(name)));
  console.log("name is " + name);
  return name;
}

const getQuantity=()=>{
  let promptQuantity = "enter the Quantity : "
  let quantity;
  do {
    quantity = prompt(promptQuantity);
    promptQuantity= "Expected Number, Recieved String! " + promptQuantity;
  }
  while (isNaN(Number(quantity)));
  console.log("QTY is " + quantity);
  return quantity;
}




const getIsImported = () => {
  let promptIsImported = "is it Imported (Y/N) : "
  let isImported;
  do {
    isImported = prompt(promptIsImported);
    promptIsImported = "Enter Y/y for yes or N/n for no" + promptIsImported;
  }
  while (!(isImported.length === 1 && isImported.match(/y|Y|n|N/g)))
  console.log("isImported is : ",isImported );
  if (isImported.match(/y|Y/g)) return true;
  return false;
}


function main(){
  getItem();
}

main();










