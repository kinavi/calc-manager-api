export declare const createDailyRateSchema: {
    readonly type: "object";
    readonly properties: {
        readonly userId: {
            readonly type: "string";
        };
        readonly weight: {
            readonly type: "string";
        };
        readonly age: {
            readonly type: "string";
        };
        readonly height: {
            readonly type: "string";
        };
        readonly sex: {
            readonly type: "string";
            readonly enum: readonly ["male", "female"];
        };
        readonly activity: {
            readonly type: "string";
            readonly enum: readonly ["low", "medium", "high"];
        };
        readonly caloriesPerDay: {
            readonly type: "string";
        };
    };
    readonly additionalProperties: false;
    readonly minProperties: 7;
};
export declare const dailyRateSchema: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
        };
        readonly userId: {
            readonly type: "string";
        };
        readonly weight: {
            readonly type: "string";
        };
        readonly age: {
            readonly type: "string";
        };
        readonly height: {
            readonly type: "string";
        };
        readonly sex: {
            readonly type: "string";
            readonly enum: readonly ["male", "female"];
        };
        readonly activity: {
            readonly type: "string";
            readonly enum: readonly ["low", "medium", "high"];
        };
        readonly caloriesPerDay: {
            readonly type: "string";
        };
    };
    readonly additionalProperties: false;
    readonly minProperties: 8;
};
//# sourceMappingURL=schema.d.ts.map