import {ObjectId} from "mongodb";

export interface IUserSchema {
    _id: ObjectId;
    mail: string;
    userName: string;
    createDate: Date;
    salt: string;
    hash: string;
}

export interface IAuthGetRout {
    Querystring: { mail: string, password: string },
}

export interface IAuthPostRout {
    Body: { userName: string, password: string, mail: string }
}
