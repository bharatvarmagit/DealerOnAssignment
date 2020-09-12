import Item from "../Item";

export const getItemsManually = () => {
  let items: Item[] = new Array();
  let input = prompt("want to add an item? press y/Y else n/N : ");
  while (input.match(/y|Y/)) {
    items.push(getItem());
    input = prompt("want to add an item? press y/Y else n/N : ");
  }
  return items;
}

 const getItem = (): Item => {
  let name: string = getName();
  const quantity = getQuantity();
  const isImported = getIsImported();
  name = isImported ? 'Imported ' + name : name;
  const unitPrice = getUnitPrice();
  return new Item(quantity, isImported, name, unitPrice);
}
 const getName = (): string => {
  let promptName = "Enter the name of the Product : "
  let name;
  do {
    name = prompt(promptName);
    promptName = "Expected String, Recieved Number! " + promptName;
  }
  while (!isNaN(Number(name)));
  return name;
}

 const getQuantity = (): number => {
  let promptQuantity = "enter the Quantity : "
  let quantity;
  do {
    quantity = prompt(promptQuantity);
    promptQuantity = "Expected Number, Recieved String! " + promptQuantity;
  }
  while (isNaN(Number(quantity)));
  return Number(quantity);
}

 const getUnitPrice = (): number => {
  let promptUnitPrice = "enter the UnitPrice  : "
  let unitPrice;
  do {
    unitPrice = prompt(promptUnitPrice);
    promptUnitPrice = "Expected Number, Recieved String! " + promptUnitPrice;
  }
  while (isNaN(Number(unitPrice)));
  return Number(unitPrice);
}

 const getIsImported = (): boolean => {
  let promptIsImported: string = "is it Imported (Y/N) : "
  let isImported;
  do {
    isImported = prompt(promptIsImported);
    promptIsImported = "Enter Y/y for yes or N/n for no" + promptIsImported;
  }
  while (!(isImported.length === 1 && isImported.match(/y|Y|n|N/g)))
  if (isImported.match(/y|Y/g)) return true;
  return false;
}
