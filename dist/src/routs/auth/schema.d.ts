export declare const AuthSchema: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "string";
        };
        readonly userName: {
            readonly type: "string";
        };
        readonly mail: {
            readonly type: "string";
        };
        readonly auth: {
            readonly type: "string";
            readonly enum: readonly ["initial", "success", "failure"];
        };
    };
    readonly required: readonly ["auth"];
};
export declare const AuthResponseSchema: {
    readonly type: "object";
    readonly properties: {
        readonly status: {
            readonly type: "string";
            readonly enum: readonly ["ok", "error"];
        };
        readonly data: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                };
                readonly userName: {
                    readonly type: "string";
                };
                readonly mail: {
                    readonly type: "string";
                };
                readonly auth: {
                    readonly type: "string";
                    readonly enum: readonly ["initial", "success", "failure"];
                };
            };
            readonly required: readonly ["auth"];
        };
        readonly message: {
            readonly type: "string";
        };
    };
    readonly required: readonly ["status"];
};
//# sourceMappingURL=schema.d.ts.map