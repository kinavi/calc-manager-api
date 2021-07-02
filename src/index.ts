import fastify, { FastifyInstance } from 'fastify'
import {
    ENV,
    fastifyConfig,
    jwtConfig,
    mongodbConfig
} from "./config";
import mongodb from 'fastify-mongodb'
import cors from 'fastify-cors';
import jwt from 'fastify-jwt'
import cookie from 'fastify-cookie';

import {authRoutsContext} from "./routs/auth";
import {dailyRateRoutsContext} from "./routs/dailyRate";
import {getResponse} from "./utils";

class Server {
    public App: FastifyInstance;
    constructor() {
        this.App =  fastify(fastifyConfig)
        this.App.register(cors)
        this.App.register(cookie)
        this.App.register(mongodb, mongodbConfig)
        this.App.register(jwt, jwtConfig)
        this.App.register(authRoutsContext)
        this.App.register(dailyRateRoutsContext)
        this.App.decorate('getResponse', getResponse)
        this.App.ready().then(
            () => { console.log('successfully booted!') },
            err => { console.log('an error happened', err) }
        );
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

    public async run() {
        const address = await this.App.listen(ENV.PORT);
        console.log(`Server listening on ${address}`);
    }
}

const App = new Server();

App.run();