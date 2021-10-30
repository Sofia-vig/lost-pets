"use strict";
exports.__esModule = true;
exports.indexPets = exports.indexUsers = void 0;
var algoliasearch_1 = require("algoliasearch");
var client = (0, algoliasearch_1["default"])("0UE5CAIWZS", "0e457674481462a143776a96da183cd5");
var indexUsers = client.initIndex("users");
exports.indexUsers = indexUsers;
var indexPets = client.initIndex("pets");
exports.indexPets = indexPets;
