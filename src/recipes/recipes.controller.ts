import { Logger, Body, Post, Controller, UseGuards } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
@UseGuards(AuthGuard())
export class RecipesController {
    private logger = new Logger('RecipesController');
    constructor(private recipesService: RecipesService) {}

    @Post('/')
    createRecipe(
        @Body() createRecipeDto: CreateRecipeDto,
        @GetUser() user: User,
    ): Promise<Recipe> {
        this.logger.verbose(
            `User "${
                user.username
            }" creating a new recipe. Data: ${JSON.stringify(createRecipeDto)}`,
        );

        return this.recipesService.createRecipe(createRecipeDto, user);
    }
}
