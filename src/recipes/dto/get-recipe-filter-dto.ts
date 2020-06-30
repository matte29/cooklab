import { IsOptional, IsNotEmpty, Min } from 'class-validator';

export class GetRecipeFilterDto {
    @IsOptional()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsNotEmpty()
    type: string;

    @IsOptional()
    @Min(0)
    hours: number;

    @IsOptional()
    @Min(0)
    user: number;
}
