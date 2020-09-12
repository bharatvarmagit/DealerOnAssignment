import Item from "../Item";
import { TAX, IMPORTTAX } from "./Constants";

interface MapValue{
 totalQuantity:number;
 unitPrice:number;
}

export const printReciept = (mapObject, totalPriceBeforeTax:number, totalSalesTax:number) => {
  const totalPriceAfterTax: number = +(totalPriceBeforeTax + totalSalesTax).toFixed(2);
  mapObject.forEach((value, key) => {
    let multQuantity:string = value.totalQuantity > 1 ? ` (${value.totalQuantity} @ ${value.unitPrice})` : ''
    console.log(key + ' : ' + value.totalQuantity * value.unitPrice + multQuantity);
  })
  console.log('Sales Tax : ' + totalSalesTax);
  console.log('Total : ' + totalPriceAfterTax);
}

//quantCountMap= Map ("name of Product",{total quantity with the same product,Unit Proice of Product}
export const countTotalQuantityPerItem = (items: Item[]) => {
  // have to count quantity for items with same name and isImported
  let totalPriceBeforeTax :number= 0;
  let totalSalesTax :number= 0;
  let quantCountMap:Map<String,MapValue> = new Map();
  items.forEach((item: Item) => {
    totalPriceBeforeTax += item.quantity * item.unitPrice;
    totalSalesTax += item.quantity * item.unitPrice * TAX;
    if (item.isImported) { //item is imported
      //additional tax if imported
      totalSalesTax += item.quantity * item.unitPrice * IMPORTTAX;

      //item exists in map ? then update quantity
      if (quantCountMap.has(item.name)) quantCountMap.get(item.name).totalQuantity += item.quantity;
      //item doesnt exist? add product name as key and {totalQuantity,unitprice} as value
      else quantCountMap.set(item.name, { totalQuantity: item.quantity, unitPrice: item.unitPrice });
    }
    else { //item is not imported
      if (quantCountMap.has(item.name)) quantCountMap.get(item.name).totalQuantity += item.quantity;
      else quantCountMap.set(item.name, { totalQuantity: item.quantity, unitPrice: item.unitPrice });
    }
  });
  totalSalesTax=Number((Math.round(totalSalesTax * 20) / 20).toFixed(2))
  return{quantCountMap, totalPriceBeforeTax,totalSalesTax};
}

export function isErr(items){
  if (typeof items==="string"){
    return true
  }
  return false;
}
