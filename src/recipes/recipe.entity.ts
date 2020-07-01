import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    Entity,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Recipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    rid: number;

    @Column()
    title: string;

    @Column()
    dishType: string;

    @Column()
    description: string;

    @Column()
    steps: string;

    @Column()
    hours: number;

    @Column()
    minutes: number;

    @Column()
    ingredients: string;

    @Column()
    image: string;

    @ManyToOne(
        type => User,
        user => user.recipes,
        { eager: false },
    )
    user: User;

    @Column()
    userId: number;
}
