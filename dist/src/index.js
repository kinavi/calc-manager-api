"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const config_1 = require("./config");
const fastify_mongodb_1 = __importDefault(require("fastify-mongodb"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const fastify_cookie_1 = __importDefault(require("fastify-cookie"));
const auth_1 = require("./routs/auth");
const dailyRate_1 = require("./routs/dailyRate");
const utils_1 = require("./utils");
class Server {
    constructor() {
        this.App = fastify_1.default(config_1.fastifyConfig);
        this.App.register(fastify_cors_1.default);
        this.App.register(fastify_cookie_1.default);
        this.App.register(fastify_mongodb_1.default, config_1.mongodbConfig);
        this.App.register(fastify_jwt_1.default, config_1.jwtConfig);
        this.App.register(auth_1.authRoutsContext);
        this.App.register(dailyRate_1.dailyRateRoutsContext);
        this.App.decorate('getResponse', utils_1.getResponse);
        this.App.ready().then(() => { console.log('successfully booted!'); }, err => { console.log('an error happened', err); });
        // this.setHooks();
        // this.setRouts();
    }
    // public setHooks() {
    //     this.App.addHook('preHandler', async (
    //         req,
    //         reply,
    //     ) => {
    //         const userData = await req.jwtVerify<FromSchema<typeof AuthSchema>>();
    //         reply.log.info(userData)
    //         this.App.decorateRequest('user', userData)
    //     })
    // }
    // public setRouts() {
    //     setAuthRouts(this.App);
    // }
    async run() {
        const address = await this.App.listen(config_1.ENV.PORT);
        console.log(`Server listening on ${address}`);
    }
}
const App = new Server();
App.run();
//# sourceMappingURL=index.js.map