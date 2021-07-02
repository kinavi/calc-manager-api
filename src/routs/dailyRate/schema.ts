export const createDailyRateSchema = {
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
} as const;

export const dailyRateSchema = {
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
} as const;