"use strict";
exports.__esModule = true;
exports.isErr = exports.countTotalQuantityPerItem = exports.printReciept = void 0;
var Constants_1 = require("./Constants");
exports.printReciept = function (mapObject, totalPriceBeforeTax, totalSalesTax) {
    var totalPriceAfterTax = +(totalPriceBeforeTax + totalSalesTax).toFixed(2);
    mapObject.forEach(function (value, key) {
        var multQuantity = value.totalQuantity > 1 ? " (" + value.totalQuantity + " @ " + value.unitPrice + ")" : '';
        console.log(key + ' : ' + value.totalQuantity * value.unitPrice + multQuantity);
    });
    console.log('Sales Tax : ' + totalSalesTax);
    console.log('Total : ' + totalPriceAfterTax);
};
//quantCountMap= Map ("name of Product",{total quantity with the same product,Unit Proice of Product}
exports.countTotalQuantityPerItem = function (items) {
    // have to count quantity for items with same name and isImported
    var totalPriceBeforeTax = 0;
    var totalSalesTax = 0;
    var quantCountMap = new Map();
    items.forEach(function (item) {
        totalPriceBeforeTax += item.quantity * item.unitPrice;
        totalSalesTax += item.quantity * item.unitPrice * Constants_1.TAX;
        if (item.isImported) { //item is imported
            //additional tax if imported
            totalSalesTax += item.quantity * item.unitPrice * Constants_1.IMPORTTAX;
            //item exists in map ? then update quantity
            if (quantCountMap.has(item.name))
                quantCountMap.get(item.name).totalQuantity += item.quantity;
            //item doesnt exist? add product name as key and {totalQuantity,unitprice} as value
            else
                quantCountMap.set(item.name, { totalQuantity: item.quantity, unitPrice: item.unitPrice });
        }
        else { //item is not imported
            if (quantCountMap.has(item.name))
                quantCountMap.get(item.name).totalQuantity += item.quantity;
            else
                quantCountMap.set(item.name, { totalQuantity: item.quantity, unitPrice: item.unitPrice });
        }
    });
    totalSalesTax = Number((Math.round(totalSalesTax * 20) / 20).toFixed(2));
    return { quantCountMap: quantCountMap, totalPriceBeforeTax: totalPriceBeforeTax, totalSalesTax: totalSalesTax };
};
function isErr(items) {
    if (typeof items === "string") {
        return true;
    }
    return false;
}
exports.isErr = isErr;
