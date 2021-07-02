"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseError = exports.getResponse = void 0;
const getResponse = (data) => {
    return {
        status: 'ok',
        data,
    };
};
exports.getResponse = getResponse;
const getResponseError = (message) => {
    return {
        status: 'error',
        message,
    };
};
exports.getResponseError = getResponseError;
//# sourceMappingURL=utils.js.map