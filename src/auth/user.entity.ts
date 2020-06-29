import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Recipe } from 'src/recipes/recipe.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(
        type => Recipe,
        recipe => recipe.user,
        { eager: true },
    )
    recipes: Recipe[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
