import { FastifyJWTOptions } from "fastify-jwt";
export declare const ENV: {
    KEY_JWT: string;
    PORT: number;
    DOMAIN: string;
    DB_NAME: string;
    DB_URL: string;
};
export declare const fastifyConfig: {
    logger: boolean;
    ignoreTrailingSlash: boolean;
    connectionTimeout: number;
    caseSensitive: boolean;
    genReqId: () => string;
};
export declare const mongodbConfig: {
    forceClose: boolean;
    url: string;
};
export declare const jwtConfig: FastifyJWTOptions;
//# sourceMappingURL=config.d.ts.map