import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateRecipeDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    dishType: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    steps: string;

    @IsNotEmpty()
    ingredients: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    hours: number;

    @IsNotEmpty()
    @Min(0)
    minutes: number;

    @IsNotEmpty()
    image: string;
}
