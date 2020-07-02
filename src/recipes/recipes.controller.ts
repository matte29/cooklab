import {
    Logger,
    Body,
    Post,
    Controller,
    UseGuards,
    Get,
    Query,
    ValidationPipe,
    Delete,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '@nestjs/passport';
import { GetRecipeFilterDto } from './dto/get-recipe-filter-dto';

@Controller('recipes')
@UseGuards(AuthGuard())
export class RecipesController {
    private logger = new Logger('RecipesController');
    constructor(private recipesService: RecipesService) {}

    @Get('/')
    getTasks(
        @Query(ValidationPipe) filterDto: GetRecipeFilterDto,
        user: User,
    ): Promise<Recipe[]> {
        this.logger.verbose(
            `User "${
                user.username
            }" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`,
        );
        return this.recipesService.getRecipes(filterDto, user);
    }

    @Get('/:rid')
    getRecipeById(@Param('rid', ParseIntPipe) rid: number): Promise<Recipe> {
        return this.recipesService.getRecipeById(rid);
    }

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

    @Delete('/:rid')
    removeRecipe(
        @Param('rid', ParseIntPipe) rid: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.recipesService.removeRecipe(rid, user);
    }
}
