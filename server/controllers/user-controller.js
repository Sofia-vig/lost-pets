"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
var models_1 = require("../models");
var utils_1 = require("../lib/utils");
var jwt = require("jsonwebtoken");
var utils_2 = require("../lib/utils");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, fullname, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, fullname = data.fullname, password = data.password;
                        return [4 /*yield*/, models_1.User.create({
                                fullname: fullname,
                                email: email,
                                password: (0, utils_1.getSHA256)(password)
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserController.prototype.getMe = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.User.findByPk(userId)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, { fullname: user.get("fullname"), email: user.get("email") }];
                        }
                        else {
                            return [2 /*return*/, { message: "not found" }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getToken = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, password = data.password;
                        return [4 /*yield*/, models_1.User.findOne({
                                where: { email: email, password: (0, utils_1.getSHA256)(password) }
                            })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            token = jwt.sign({ id: user.get("id") }, utils_2.SECRET);
                            return [2 /*return*/, { token: token }];
                        }
                        else {
                            return [2 /*return*/, { error: "email or password incorrect" }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.User.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user ? true : false];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (userId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var fullname, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullname = data.fullname, password = data.password;
                        if (!(fullname && password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, models_1.User.update({ fullname: fullname, password: (0, utils_1.getSHA256)(password) }, { where: { id: userId } })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!fullname) return [3 /*break*/, 4];
                        return [4 /*yield*/, models_1.User.update({ fullname: fullname }, { where: { id: userId } })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!password) return [3 /*break*/, 6];
                        return [4 /*yield*/, models_1.User.update({ password: (0, utils_1.getSHA256)(password) }, { where: { id: userId } })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, true];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
