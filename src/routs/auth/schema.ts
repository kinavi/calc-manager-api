import {statusResponseSchema} from "../../schema";

export const AuthSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        userName: { type: 'string' },
        mail: { type: 'string' },
        auth: { type: 'string', enum: [ 'initial' , 'success' , 'failure' ] }
    },
    required: [ 'auth' ]
} as const;

export const AuthResponseSchema = {
    type: 'object',
    properties: {
        status: statusResponseSchema,
        data: AuthSchema,
        message: { type: "string" }
    },
    required: [ 'status' ]
} as const;

