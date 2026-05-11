import { Role } from "src/users/enums/role.enum";

export interface JwtPayload {
    role: Role
}
