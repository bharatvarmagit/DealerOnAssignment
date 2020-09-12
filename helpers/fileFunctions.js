"use strict";
exports.__esModule = true;
exports.fetchDataFromFile = void 0;
var Item_1 = require("../Item");
var fs = require('fs');
function fetchDataFromFile(filePath) {
    try {
        var data = fs.readFileSync(filePath, { encoding: 'utf8' });
        var items = new Array();
        data = data.split('\n');
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var line = data_1[_i];
            line = line.split(" ");
            if (line.length > 3) {
                var item = getItemFromFile(line);
                if (typeof item === "string") {
                    return item;
                }
                items.push(item);
            }
        }
        return items;
    }
    catch (error) {
        return "no such File or Directory \n";
    }
}
exports.fetchDataFromFile = fetchDataFromFile;
function getItemFromFile(line) {
    var quantity = Number(line.shift());
    var unitPrice = Number(line.pop());
    //remove 'at'
    line.pop();
    var name = line.join(" ");
    var isImported = name.includes('Imported') ? true : false;
    if (isNaN(quantity) || isNaN(unitPrice)) {
        return "file not Properly Formatted \n";
    }
    return new Item_1["default"](quantity, isImported, name, unitPrice);
}
