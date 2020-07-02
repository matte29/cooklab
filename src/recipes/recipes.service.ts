import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from './recipes.repository';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { User } from '../auth/user.entity';
import { Recipe } from './recipe.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetRecipeFilterDto } from './dto/get-recipe-filter-dto';

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(RecipeRepository)
        private recipeRepositoy: RecipeRepository,
    ) {}

    async getRecipes(
        filterDto: GetRecipeFilterDto,
        user: User,
    ): Promise<Recipe[]> {
        return this.recipeRepositoy.getRecipes(filterDto, user);
    }

    async getRecipeById(rid: number): Promise<Recipe> {
        const recipeFound = this.recipeRepositoy.findOne({
            where: { rid },
        });

        if (!recipeFound) {
            throw new NotFoundException(`Recipe with rid "${rid}" not found`);
        }

        return recipeFound;
    }

    async createRecipe(
        createRecipeDto: CreateRecipeDto,
        user: User,
    ): Promise<Recipe> {
        return this.recipeRepositoy.createRecipe(createRecipeDto, user);
    }

    async removeRecipe(rid: number, user: User): Promise<void> {
        const result = await this.recipeRepositoy.delete({
            rid,
            userId: user.id,
        });

        if (result.affected === 0) {
            throw new NotFoundException(`Recipe with Id "${rid}" not found`);
        }
    }
}
