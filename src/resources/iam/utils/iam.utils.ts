import {User} from "../../users/entities/user.entity";


export class Context {
    constructor(public user: User, public env: "test" | "live") {}
}