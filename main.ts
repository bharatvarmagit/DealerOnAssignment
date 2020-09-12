const prompt = require('prompt-sync')({sigint: true});
import Item from './Item';
const IMPORTTAX:number=0.05;
const TAX:number=0.1;

const printReciept=(mapObject,totalPriceBeforeTax:number,totalSalesTax:number)=>{
  const totalPriceAfterTax:number=totalPriceBeforeTax+totalSalesTax;
  mapObject.forEach((value,key)=>{
    let multQuantity=value.totalQuantity>1?` (${value.totalQuantity} @ ${value.unitPrice}`:''
    console.log(key+' : '+value.totalQuantity*value.unitPrice+multQuantity);
  })
  console.log('Sales Tax : '+totalSalesTax);
  console.log('Total : '+totalPriceAfterTax);
}

const countTotalQuantityPerItem=(items:Item[])=>{
  // have to count quantity for items with same name and isImported
  let totalPriceBeforeTax=0;
  let totalSalesTax=0;
  let quantCountMap=new Map();
  items.forEach((item:Item)=>{
    totalPriceBeforeTax+=item.quantity*item.unitPrice;
    totalSalesTax+=item.quantity*item.unitPrice*TAX;
    if (item.isImported){ //item is imported
      totalSalesTax+=item.quantity*item.unitPrice*IMPORTTAX;
      if (quantCountMap.has('Imported '+item.name))  quantCountMap.get('Imported ' + item.name).totalQuantity += item.quantity;
      else quantCountMap.set('Imported '+item.name,{totalQuantity:item.quantity,unitPrice:item.unitPrice});
    }
    else{ //item is not imported
      if(quantCountMap.has(item.name)) quantCountMap.get(item.name).totalQuantity+=item.quantity;
      else quantCountMap.set(item.name,{totalQuantity:item.quantity,unitPrice:item.unitPrice});
    }
  });
  printReciept(quantCountMap,totalPriceBeforeTax,Number((Math.round(totalSalesTax*20)/20).toFixed(2)));
}
const getItems=()=>{
  let items:Item[]=new Array();
  let input = prompt("want to add an item? press y/Y else n/N : ");
  while(input.match(/y|Y/)){
    items.push(getItem());
    input = prompt("want to add an item? press y/Y else n/N : ");
  }
  countTotalQuantityPerItem(items);
}

const getItem =():Item=>{
  const name=getName();
  const quantity=getQuantity();
  const isImported=getIsImported();
  const unitPrice=getUnitPrice();
  return new Item(quantity,isImported,name,unitPrice);
}
const getName=():string=>{
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

const getQuantity=():number=>{
  let promptQuantity = "enter the Quantity : "
  let quantity;
  do {
    quantity = prompt(promptQuantity);
    promptQuantity= "Expected Number, Recieved String! " + promptQuantity;
  }
  while (isNaN(Number(quantity)));
  return Number(quantity);
}

const getUnitPrice = ():number => {
  let promptUnitPrice = "enter the UnitPrice  : "
  let unitPrice ;
  do {
    unitPrice  = prompt(promptUnitPrice);
    promptUnitPrice = "Expected Number, Recieved String! " + promptUnitPrice ;
  }
  while (isNaN(Number(unitPrice )));
  console.log("UnitPrice  is " + unitPrice );
  return Number(unitPrice );
}

const getIsImported = ():boolean => {
  let promptIsImported:string = "is it Imported (Y/N) : "
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
  getItems();
}

main();










