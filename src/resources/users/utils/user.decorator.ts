import { Context } from "../../iam/utils/iam.utils";
import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Request } from "express";

interface RequestWithUser extends Request {
    user: User | Context;
}

export const AuthUser = createParamDecorator(
    (param: keyof User, ctx: ExecutionContext) => {
        const req: RequestWithUser = ctx.switchToHttp().getRequest();

        const ctx2: User | Context = req.user;

        if (ctx2 instanceof User) {
            return param ? ctx2[param] : ctx2;
        } else if (ctx2 instanceof Context) {
            return param ? ctx2.user[param] : ctx2.user;
        }

        return null;
    },
);

export const AuthContext = createParamDecorator(
    (param: undefined, ctx: ExecutionContext) => {
        const req: RequestWithUser = ctx.switchToHttp().getRequest();
        return req.user;
    },
);
