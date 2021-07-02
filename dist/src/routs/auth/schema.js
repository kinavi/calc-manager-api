"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseSchema = exports.AuthSchema = void 0;
const schema_1 = require("../../schema");
exports.AuthSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        userName: { type: 'string' },
        mail: { type: 'string' },
        auth: { type: 'string', enum: ['initial', 'success', 'failure'] }
    },
    required: ['auth']
};
exports.AuthResponseSchema = {
    type: 'object',
    properties: {
        status: schema_1.statusResponseSchema,
        data: exports.AuthSchema,
        message: { type: "string" }
    },
    required: ['status']
};
//# sourceMappingURL=schema.js.map