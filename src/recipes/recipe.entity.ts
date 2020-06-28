import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    // ManyToOne,
    Entity,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Recipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    dishType: string;

    @Column()
    description: string;

    @Column()
    steps: string;

    @Column()
    ingredients: string[];

    @Column()
    hours: number;

    @Column()
    minutes: number;

    // @ManyToOne(
    //     type => User,
    //     user => user.recipes,
    //     { eager: false },
    // )
    author: User;

    @Column()
    image: string;
}
