import {FastifyInstance} from "fastify";
import crypto from "crypto";
import {ENV} from "../../config";
import {IAuthGetRout, IAuthPostRout, IUserSchema} from "./types";
import {AuthResponseSchema} from "./schema";
import {getResponse, getResponseError,} from "../../utils";

export async function authRoutsContext(childServer: FastifyInstance) {
    if (!childServer.mongo.db) {
        throw new Error('db not connect')
    }

    const usersCollections = childServer.mongo.db.collection<IUserSchema>('users')

    childServer.get<IAuthGetRout>('/api/auth', {
        schema: {
            querystring: {
                type: 'object',
                mail: { type: 'string' },
                password: { type: 'string' },
                require: ['mail', 'password']
            },
            response: {
                200: AuthResponseSchema
            }
        },
    } , async function (
        request,
        reply
    ){
        const { password, mail } = request.query;
        const user = await usersCollections.findOne({ mail });
        if(user) {
            const _hash = crypto.pbkdf2Sync(
                password,
                user.salt,
                10000,
                512,
                'sha512',
            ).toString('hex');
            if (_hash === user.hash) {
                const token = await reply.jwtSign(user)
                reply
                    .setCookie('jwt', token, {
                        domain: ENV.DOMAIN,
                        path: '/',
                        secure: true, // send cookie over HTTPS only
                        httpOnly: true,
                        sameSite: true // alternative CSRF protection
                    })
                    .cookie('test', 'hello')
                    .code(200)
                    .send(getResponse({
                        id: String(user._id),
                        mail: user.mail,
                        userName: user.userName,
                        auth: 'success'
                    }));
            }
        }
        reply.code(404).send(getResponseError('failure'))

    })

    childServer.post<IAuthPostRout>('/api/auth', {
        schema: {
            response: {
                200: AuthResponseSchema
            },
            body: {
                type: 'object',
                mail: { type: 'string' },
                userName: { type: 'string' },
                password: { type: 'string' },
                required: ['mail', 'userName', 'password']
            },
        },
    },async function (
        request,
        reply
    ) {
        const {mail, userName, password} = request.body;

        console.log(request.body)

        const isMailBusy = !! await usersCollections.findOne({ mail })

        if (isMailBusy) {
            reply.code(400).send(getResponseError('Email is busy'))
        } else {
            const salt = crypto.randomBytes(16).toString('hex');
            const result = await usersCollections.insertOne({
                userName,
                mail,
                createDate: new Date(),
                salt,
                hash: crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex'),
            })

            if (!result.result.ok && !result.result.n) {
                throw new Error('not save')
            }

            reply.send(getResponse())
        }
    })
}

