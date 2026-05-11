import { applyDecorators, UseGuards } from "@nestjs/common"
import { AdminGuard } from "../guards/admin.guard"

export const Admin = () => {
    return applyDecorators(
        UseGuards(AdminGuard)
    )
}