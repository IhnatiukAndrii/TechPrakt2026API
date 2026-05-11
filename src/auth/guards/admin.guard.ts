import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Role } from "src/users/enums/role.enum";

@Injectable()
export class AdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const role: Role = request['role']

        if (!role) {
            throw new UnauthorizedException();
        }

        if (role !== Role.ADMIN) {
            throw new ForbiddenException("Access denied")
        }
        return true;
    }
}
