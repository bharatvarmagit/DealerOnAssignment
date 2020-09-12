"use strict";
exports.__esModule = true;
var prompt = require('prompt-sync')({ sigint: true });
var Constants_1 = require("./helpers/Constants");
var fileFunctions_1 = require("./helpers/fileFunctions");
var manualFunctions_1 = require("./helpers/manualFunctions");
var commonFunctions_1 = require("./helpers/commonFunctions");
function fileFlow(filePath) {
    var items = fileFunctions_1.fetchDataFromFile(filePath);
    if (commonFunctions_1.isErr(items)) { //check if path is correct or file has acceptable format
        main(items + " " + Constants_1.MainPrompt); // re-enter main function wih error message
        return;
    }
    return items; //if everything is good, get the items from file
}
function main(MainPrompt) {
    var items;
    var filePath = process.argv[2]; //get filepath from command lin args
    if (filePath) { //check if filepath is entered on command line
        items = fileFlow(filePath); //then get items from fileFlow
    }
    else {
        //if filepath not found ask if user wants to provide file or enter data manually
        var flowInput = prompt(MainPrompt);
        switch (flowInput) {
            case '1': // user chose to provide file path
                filePath = prompt("enter the file name or path relative to main.js : ");
                items = fileFlow(filePath);
                break;
            case '2':
                items = manualFunctions_1.getItemsManually();
                break;
            default:
                main('Incorrect Input! \n' + MainPrompt);
                return;
        }
    }
    var _a = commonFunctions_1.countTotalQuantityPerItem(items), quantCountMap = _a.quantCountMap, totalPriceBeforeTax = _a.totalPriceBeforeTax, totalSalesTax = _a.totalSalesTax;
    commonFunctions_1.printReciept(quantCountMap, totalPriceBeforeTax, totalSalesTax);
}
//program starts here
main(Constants_1.MainPrompt);
