import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RecipeRepository } from './recipes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
    imports: [TypeOrmModule.forFeature([RecipeRepository]), AuthModule],
    controllers: [RecipesController],
    providers: [RecipesService],
})
export class RecipesModule {}
