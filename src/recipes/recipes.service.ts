import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from './recipes.repository';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { User } from '../auth/user.entity';
import { Recipe } from './recipe.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(RecipeRepository)
        private recipeRepositoy: RecipeRepository,
    ) {}

    async createRecipe(
        createRecipeDto: CreateRecipeDto,
        user: User,
    ): Promise<Recipe> {
        return this.recipeRepositoy.createRecipe(createRecipeDto, user);
    }
}
