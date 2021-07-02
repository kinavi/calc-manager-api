"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = void 0;
// const pino = require('pino')();
const pino_1 = __importDefault(require("pino"));
exports.customLogger = {
    info: function (o, ...n) { },
    warn: function (o, ...n) { },
    error: function (o, ...n) { },
    fatal: function (o, ...n) { },
    trace: function (o, ...n) { },
    debug: function (o, ...n) { },
    child: function () {
        const child = Object.create(this);
        child.pino = pino_1.default.child(...arguments);
        return child;
    },
};
//# sourceMappingURL=pino.js.map