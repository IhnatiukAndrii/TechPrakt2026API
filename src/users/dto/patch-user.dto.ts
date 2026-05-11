import { IsNotEmpty, IsOptional } from 'class-validator';

export class PatchUserDto {
    @IsNotEmpty()
    @IsOptional()
    name: string
}
