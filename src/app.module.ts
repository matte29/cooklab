import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RecipesModule } from './recipes/recipes.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, RecipesModule],
})
export class AppModule {}
