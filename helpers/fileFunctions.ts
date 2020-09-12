import Item from "../Item";
const fs = require('fs');

export function fetchDataFromFile(filePath: string):any{
  try {
    let data = fs.readFileSync(filePath, { encoding: 'utf8' });
    let items: Item[] = new Array();
    data = data.split('\n');
    for (let line of data) {
      line = line.split(" ");
      if (line.length > 3) {
        let item: any = getItemFromFile(line);
        if (typeof item === "string") {
          return item;
        }
        items.push(item);
      }
    }
    return items;
  } catch (error) {
    return "no such File or Directory \n";
  }

}
function getItemFromFile(line: String[]) {
  const quantity: number = Number(line.shift());
  const unitPrice: number = Number(line.pop());
  //remove 'at'
  line.pop();
  const name: string = line.join(" ")
  const isImported: boolean = name.includes('Imported') ? true : false;
  if(isNaN(quantity)||isNaN(unitPrice)){
    return "file not Properly Formatted \n"
  }
  return new Item(quantity, isImported, name, unitPrice);

}
