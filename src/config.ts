import dotenv from 'dotenv';
import * as fs from "fs";
import path from 'path'
import { FastifyJWTOptions } from "fastify-jwt";
import hyperid from "hyperid";

dotenv.config();

// const certOptions = {
//   key: fs.readFileSync(require('path').resolve('key.pem')),
//   cert: fs.readFileSync(require('path').resolve('cert.pem'))
// }

export const ENV = {
  KEY_JWT: process.env['KEY_JWT'] as string,
  PORT: Number(process.env['PORT']),
  DOMAIN: process.env['DOMAIN'] as string,
  DB_NAME: process.env['DB_NAME'] as string,
  DB_URL: process.env['DB_URL'] as string,
};

export const fastifyConfig = {
  // https: {
  //   key: certOptions.key,
  //   cert: certOptions.cert
  // },
  logger: true,
  ignoreTrailingSlash: true,
  connectionTimeout: 30000,
  caseSensitive: false,
  genReqId: () => { return hyperid().uuid }
}

export const mongodbConfig = {
  forceClose: true,
  url: `${ENV.DB_URL}/${ENV.DB_NAME}`,
}

export const jwtConfig: FastifyJWTOptions = {
  secret: {
    public: fs.readFileSync(path.resolve('jwtRS256.key.pub')),
    private: fs.readFileSync(path.resolve('jwtRS256.key'))
  },
  sign: {
    algorithm: 'RS256',
    expiresIn: '1h'
  },
  cookie: {
    cookieName: 'jwt',
    signed: false
  }
}
