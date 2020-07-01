import { Repository, EntityRepository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from '../auth/user.entity';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { GetRecipeFilterDto } from './dto/get-recipe-filter-dto';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    private logger = new Logger('RecipeRepository');

    async getRecipes(
        filterDto: GetRecipeFilterDto,
        user: User,
    ): Promise<Recipe[]> {
        const { title, type, hours, author } = filterDto;
        const query = this.createQueryBuilder('recipe');

        if (title) {
            query.andWhere('(recipe.title LIKE :title)', {
                title: `%${title}%`,
            });
        }
        if (type) {
            query.andWhere('(recipe.dishType LIKE :type)', {
                type: `%${type}%`,
            });
        }
        if (hours) {
            query.andWhere('(recipe.hours LIKE :hours)', {
                hours: `%${hours}%`,
            });
        }
        // if (author) {
        //     query.andWhere('(recipe.user LIKE :author)', {
        //         author: `%${author}%`,
        //     });
        // }

        try {
            const recipes = await query.getMany();
            return recipes;
        } catch (error) {
            this.logger.error(
                `User "${
                    user.username
                }", failed to get recipes. Filters: ${JSON.stringify(
                    filterDto,
                )}`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }
    }
    async createRecipe(
        createRecipeDto: CreateRecipeDto,
        user: User,
    ): Promise<Recipe> {
        const {
            title,
            dishType,
            description,
            steps,
            ingredients,
            hours,
            minutes,
            image,
        } = createRecipeDto;

        const recipe = new Recipe();
        recipe.title = title;
        recipe.dishType = dishType;
        recipe.description = description;
        recipe.steps = steps;
        recipe.ingredients = ingredients;
        recipe.hours = hours;
        recipe.minutes = minutes;
        recipe.image = image;
        recipe.user = user;
        try {
            await recipe.save();
        } catch (error) {
            this.logger.error(
                `Failed to create a recipe for author "${user.username}". Recipe: ${createRecipeDto}`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }

        delete recipe.user;

        return recipe;
    }
}
