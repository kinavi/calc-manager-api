"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutsContext = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config");
const schema_1 = require("./schema");
const utils_1 = require("../../utils");
async function authRoutsContext(childServer) {
    if (!childServer.mongo.db) {
        throw new Error('db not connect');
    }
    const usersCollections = childServer.mongo.db.collection('users');
    childServer.get('/api/auth', {
        schema: {
            querystring: {
                type: 'object',
                mail: { type: 'string' },
                password: { type: 'string' },
                require: ['mail', 'password']
            },
            response: {
                200: schema_1.AuthResponseSchema
            }
        },
    }, async function (request, reply) {
        const { password, mail } = request.query;
        const user = await usersCollections.findOne({ mail });
        if (user) {
            const _hash = crypto_1.default.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
            if (_hash === user.hash) {
                const token = await reply.jwtSign(user);
                reply
                    .setCookie('jwt', token, {
                    domain: config_1.ENV.DOMAIN,
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    sameSite: true // alternative CSRF protection
                })
                    .cookie('test', 'hello')
                    .code(200)
                    .send(utils_1.getResponse({
                    id: String(user._id),
                    mail: user.mail,
                    userName: user.userName,
                    auth: 'success'
                }));
            }
        }
        reply.code(404).send(utils_1.getResponseError('failure'));
    });
    childServer.post('/api/auth', {
        schema: {
            response: {
                200: schema_1.AuthResponseSchema
            },
            body: {
                type: 'object',
                mail: { type: 'string' },
                userName: { type: 'string' },
                password: { type: 'string' },
                required: ['mail', 'userName', 'password']
            },
        },
    }, async function (request, reply) {
        const { mail, userName, password } = request.body;
        console.log(request.body);
        const isMailBusy = !!await usersCollections.findOne({ mail });
        if (isMailBusy) {
            reply.code(400).send(utils_1.getResponseError('Email is busy'));
        }
        else {
            const salt = crypto_1.default.randomBytes(16).toString('hex');
            const result = await usersCollections.insertOne({
                userName,
                mail,
                createDate: new Date(),
                salt,
                hash: crypto_1.default.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex'),
            });
            if (!result.result.ok && !result.result.n) {
                throw new Error('not save');
            }
            reply.send(utils_1.getResponse());
        }
    });
}
exports.authRoutsContext = authRoutsContext;
//# sourceMappingURL=index.js.map