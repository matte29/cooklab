import { Repository, EntityRepository } from 'typeorm';
import {
    ConflictException,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private logger = new Logger('UserRepository');

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const user = this.create();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                this.logger.error(
                    `The username "${user.username}" already exists`,
                );
                throw new ConflictException('Username already exists');
            } else {
                this.logger.error(`Failed to signup user "${user.username}" .`);
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<string> {
        const { username, password } = authCredentialsDto;

        const user = await this.findOne({ username });

        if (user && (await user.validatePassword(password))) {
            return user.username;
        } else {
            return null;
        }
    }
}
