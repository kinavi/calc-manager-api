"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyRateSchema = exports.createDailyRateSchema = void 0;
exports.createDailyRateSchema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        weight: { type: 'string' },
        age: { type: 'string' },
        height: { type: 'string' },
        sex: { type: 'string', enum: ['male', 'female'] },
        activity: { type: 'string', enum: ["low", "medium", 'high'] },
        caloriesPerDay: { type: 'string' },
    },
    additionalProperties: false,
    minProperties: 7
};
exports.dailyRateSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        weight: { type: 'string' },
        age: { type: 'string' },
        height: { type: 'string' },
        sex: { type: 'string', enum: ['male', 'female'] },
        activity: { type: 'string', enum: ["low", "medium", 'high'] },
        caloriesPerDay: { type: 'string' },
    },
    additionalProperties: false,
    minProperties: 8
};
//# sourceMappingURL=schema.js.map