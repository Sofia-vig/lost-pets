"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Report = void 0;
var sequelize_1 = require("sequelize");
var db_1 = require("./db");
var Report = /** @class */ (function (_super) {
    __extends(Report, _super);
    function Report() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Report;
}(sequelize_1.Model));
exports.Report = Report;
Report.init({
    reporter_name: sequelize_1.DataTypes.STRING,
    phone_number: sequelize_1.DataTypes.STRING,
    message: sequelize_1.DataTypes.STRING,
    petId: sequelize_1.DataTypes.STRING
}, { sequelize: db_1.sequelize, modelName: "report" });
