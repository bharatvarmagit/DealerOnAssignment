"use strict";
exports.__esModule = true;
exports.getItemsManually = void 0;
var Item_1 = require("../Item");
exports.getItemsManually = function () {
    var items = new Array();
    var input = prompt("want to add an item? press y/Y else n/N : ");
    while (input.match(/y|Y/)) {
        items.push(getItem());
        input = prompt("want to add an item? press y/Y else n/N : ");
    }
    return items;
};
var getItem = function () {
    var name = getName();
    var quantity = getQuantity();
    var isImported = getIsImported();
    name = isImported ? 'Imported ' + name : name;
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
    return Number(unitPrice);
};
var getIsImported = function () {
    var promptIsImported = "is it Imported (Y/N) : ";
    var isImported;
    do {
        isImported = prompt(promptIsImported);
        promptIsImported = "Enter Y/y for yes or N/n for no" + promptIsImported;
    } while (!(isImported.length === 1 && isImported.match(/y|Y|n|N/g)));
    if (isImported.match(/y|Y/g))
        return true;
    return false;
};
