import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import {UserRole} from "../resources/users/types/user.enums";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        if (data) {
            return user && user[data];
        }
        return user;
    },
);


