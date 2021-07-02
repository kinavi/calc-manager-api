"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyRateRoutsContext = void 0;
const schema_1 = require("../../schema");
const schema_2 = require("./schema");
const utils_1 = require("../../utils");
async function dailyRateRoutsContext(childServer) {
    if (!childServer.mongo.db) {
        throw new Error('db not connect');
    }
    const dailyRateCollection = childServer.mongo.db.collection('dailyRate');
    childServer.addHook('preHandler', async (req, reply) => {
        const userData = await req.jwtVerify();
        reply.log.info(userData);
        req.user = userData;
    });
    childServer.get('/api/dailyRate', {
        schema: {
            response: {
                200: {
                    status: schema_1.statusResponseSchema,
                    data: schema_2.dailyRateSchema
                }
            }
        }
    }, async function (request, reply) {
        const { id } = request.user || {};
        if (!id) {
            throw new Error('invalid user');
        }
        const result = await dailyRateCollection.findOne({ userId: id });
        reply.send(utils_1.getResponse(result || 'no find daily rates'));
    });
    childServer.post('/api/dailyRate', {
        schema: {
            body: schema_2.createDailyRateSchema,
            response: {
                200: {
                    status: schema_1.statusResponseSchema,
                }
            }
        }
    }, async function (request, reply) {
        const dailyRate = request.body;
        const result = await dailyRateCollection.insertOne(dailyRate);
        if (!result.result.ok && !result.result.n) {
            throw new Error('Not add daily rate');
        }
        reply.send(utils_1.getResponse(undefined));
    });
}
exports.dailyRateRoutsContext = dailyRateRoutsContext;
;
//# sourceMappingURL=index.js.map