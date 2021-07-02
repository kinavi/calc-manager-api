"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.mongodbConfig = exports.fastifyConfig = exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const hyperid_1 = __importDefault(require("hyperid"));
dotenv_1.default.config();
// const certOptions = {
//   key: fs.readFileSync(require('path').resolve('key.pem')),
//   cert: fs.readFileSync(require('path').resolve('cert.pem'))
// }
exports.ENV = {
    KEY_JWT: process.env['KEY_JWT'],
    PORT: Number(process.env['PORT']),
    DOMAIN: process.env['DOMAIN'],
    DB_NAME: process.env['DB_NAME'],
    DB_URL: process.env['DB_URL'],
};
exports.fastifyConfig = {
    // https: {
    //   key: certOptions.key,
    //   cert: certOptions.cert
    // },
    logger: true,
    ignoreTrailingSlash: true,
    connectionTimeout: 30000,
    caseSensitive: false,
    genReqId: () => { return hyperid_1.default().uuid; }
};
exports.mongodbConfig = {
    forceClose: true,
    url: `${exports.ENV.DB_URL}/${exports.ENV.DB_NAME}`,
};
exports.jwtConfig = {
    secret: {
        public: fs.readFileSync(path_1.default.resolve('jwtRS256.key.pub')),
        private: fs.readFileSync(path_1.default.resolve('jwtRS256.key'))
    },
    sign: {
        algorithm: 'RS256',
        expiresIn: '1h'
    },
    cookie: {
        cookieName: 'jwt',
        signed: false
    }
};
//# sourceMappingURL=config.js.map