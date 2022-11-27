import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';
import { UserModel } from '../../shared/database/models/user';
import { UserRegisterDto } from './register.dto';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async existsByUsername(username: string): Promise<boolean> {
    return !!(await this.models.User.findOne({ where: { username } }));
  }

  async existsByEmail(email: string): Promise<boolean> {
    return !!(await this.models.User.findOne({ where: { email } }));
  }

  async registerNewUser(data: UserRegisterDto): Promise<UserModel> {
    const created = await this.models.User.create({
      ...data,
    });
    return created;
  }

  async findAll() {
    const users = await this.models.User.findAll({
      order: ['seq'],
    });

    return users;
  }
}
