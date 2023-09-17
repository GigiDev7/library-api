"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, req, res, next) {
    return res.status(500).json({ message: "Something went wrong" });
}
exports.default = default_1;
