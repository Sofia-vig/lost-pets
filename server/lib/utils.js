"use strict";
exports.__esModule = true;
exports.bodyToItem = exports.SECRET = exports.authMiddleware = exports.getSHA256 = void 0;
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var SECRET = "sofa-secreto-2";
exports.SECRET = SECRET;
var getSHA256 = function (text) {
    return crypto.createHash("sha256").update(text).digest("hex");
};
exports.getSHA256 = getSHA256;
var authMiddleware = function (req, res, next) {
    var token = req.headers.authorization.split(" ")[1];
    try {
        var data = jwt.verify(token, SECRET);
        req._user = data;
        next();
    }
    catch (_a) { }
};
exports.authMiddleware = authMiddleware;
var bodyToItem = function (petId, body) {
    var respuesta = {};
    if (body.name) {
        respuesta.name = body.nombre;
    }
    if (body.image) {
        respuesta.image = body.image;
    }
    if (body.lastGeo_lat && body.lastGeo_lon) {
        respuesta._geoloc = { lat: body.lastGeo_lat, lng: body.lastGeo_lon };
    }
    if (body.founded) {
        respuesta.founded = body.founded;
    }
    if (petId) {
        respuesta.objectID = petId;
    }
    return respuesta;
};
exports.bodyToItem = bodyToItem;
