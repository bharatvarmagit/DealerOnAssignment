"use strict";
exports.__esModule = true;
var prompt = require('prompt-sync')({ sigint: true });
var Item_1 = require("./Item");
var IMPORTTAX = 0.05;
var TAX = 0.1;
var printReciept = function (mapObject, totalPriceBeforeTax, totalSalesTax) {
    var totalPriceAfterTax = totalPriceBeforeTax + totalSalesTax;
    mapObject.forEach(function (value, key) {
        var multQuantity = value.totalQuantity > 1 ? " (" + value.totalQuantity + " @ " + value.unitPrice : '';
        console.log(key + ' : ' + value.totalQuantity * value.unitPrice + multQuantity);
    });
    console.log('Sales Tax : ' + totalSalesTax);
    console.log('Total : ' + totalPriceAfterTax);
};
var countTotalQuantityPerItem = function (items) {
    // have to count quantity for items with same name and isImported
    var totalPriceBeforeTax = 0;
    var totalSalesTax = 0;
    var quantCountMap = new Map();
    items.forEach(function (item) {
        totalPriceBeforeTax += item.quantity * item.unitPrice;
        totalSalesTax += item.quantity * item.unitPrice * TAX;
        if (item.isImported) { //item is imported
            totalSalesTax += item.quantity * item.unitPrice * IMPORTTAX;
            if (quantCountMap.has('Imported ' + item.name))
                quantCountMap.get('Imported ' + item.name).totalQuantity += item.quantity;
            else
                quantCountMap.set('Imported ' + item.name, { totalQuantity: item.quantity, unitPrice: item.unitPrice });
        }
        else { //item is not imported
            if (quantCountMap.has(item.name))
                quantCountMap.get(item.name).totalQuantity += item.quantity;
            else
                quantCountMap.set(item.name, { totalQuantity: item.quantity, unitPrice: item.unitPrice });
        }
    });
    printReciept(quantCountMap, totalPriceBeforeTax, Number((Math.round(totalSalesTax * 20) / 20).toFixed(2)));
};
var getItems = function () {
    var items = new Array();
    var input = prompt("want to add an item? press y/Y else n/N : ");
    while (input.match(/y|Y/)) {
        items.push(getItem());
        input = prompt("want to add an item? press y/Y else n/N : ");
    }
    countTotalQuantityPerItem(items);
};
var getItem = function () {
    var name = getName();
    var quantity = getQuantity();
    var isImported = getIsImported();
    var unitPrice = getUnitPrice();
    return new Item_1["default"](quantity, isImported, name, unitPrice);
};
var getName = function () {
    var promptName = "Enter the name of the Product : ";
    var name;
    do {
        name = prompt(promptName);
        promptName = "Expected String, Recieved Number! " + promptName;
    } while (!isNaN(Number(name)));
    console.log("name is " + name);
    return name;
};
var getQuantity = function () {
    var promptQuantity = "enter the Quantity : ";
    var quantity;
    do {
        quantity = prompt(promptQuantity);
        promptQuantity = "Expected Number, Recieved String! " + promptQuantity;
    } while (isNaN(Number(quantity)));
    return Number(quantity);
};
var getUnitPrice = function () {
    var promptUnitPrice = "enter the UnitPrice  : ";
    var unitPrice;
    do {
        unitPrice = prompt(promptUnitPrice);
        promptUnitPrice = "Expected Number, Recieved String! " + promptUnitPrice;
    } while (isNaN(Number(unitPrice)));
    console.log("UnitPrice  is " + unitPrice);
    return Number(unitPrice);
};
var getIsImported = function () {
    var promptIsImported = "is it Imported (Y/N) : ";
    var isImported;
    do {
        isImported = prompt(promptIsImported);
        promptIsImported = "Enter Y/y for yes or N/n for no" + promptIsImported;
    } while (!(isImported.length === 1 && isImported.match(/y|Y|n|N/g)));
    console.log("isImported is : ", isImported);
    if (isImported.match(/y|Y/g))
        return true;
    return false;
};
function main() {
    getItems();
}
main();
