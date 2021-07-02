import { FastifyInstance } from "fastify";
import { statusResponseSchema } from "../../schema";
import { createDailyRateSchema, dailyRateSchema } from "./schema";
import { FromSchema } from "json-schema-to-ts";
import { AuthSchema } from "../auth/schema";
import { DailyRate } from "./types";
import { getResponse } from "../../utils";

export async function dailyRateRoutsContext(childServer: FastifyInstance) {
    if (!childServer.mongo.db) {
        throw new Error('db not connect')
    }

    const dailyRateCollection = childServer.mongo.db.collection<DailyRate>('dailyRate');

    childServer.addHook('preHandler', async (
        req,
        reply,
    ) => {
        const userData = await req.jwtVerify<FromSchema<typeof AuthSchema>>();
        reply.log.info(userData)
        req.user = userData
    })

    childServer.get('/api/dailyRate', {
        schema: {
            response: {
                200: {
                    status: statusResponseSchema,
                    data: dailyRateSchema
                }
            }
        }
    },async function (
        request,
        reply
    ) {
        const { id } = request.user as FromSchema<typeof AuthSchema> || {};

        if(!id) {
            throw new Error('invalid user')
        }

        const result = await dailyRateCollection.findOne({ userId: id })

        reply.send(getResponse(result || 'no find daily rates'))
    })

    childServer.post<{
        Body: DailyRate
    }>('/api/dailyRate', {
        schema: {
            body: createDailyRateSchema,
            response: {
                200: {
                    status: statusResponseSchema,
                }
            }
        }
    }, async function (
        request,
        reply
    ) {
        const dailyRate = request.body;

        const result = await dailyRateCollection.insertOne(dailyRate)

        if(!result.result.ok && !result.result.n) {
            throw new Error('Not add daily rate')
        }
        reply.send(getResponse(undefined))
    })
};