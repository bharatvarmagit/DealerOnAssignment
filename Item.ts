export default class Item {
  quantity: number;    //number of items (defaults 1)
  isImported: boolean; //determines with y or n if item is imported or not
  name: string;        // name of item
  unitPrice: number     // price per 1 unit of item
  constructor(quantity, isImported, name, unitPrice) {
    this.quantity = quantity;
    this.isImported = isImported;
    this.name = name;
    this.unitPrice = unitPrice
  }
}
