import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/constants/env-variables';
import { Models } from 'src/modules/shared/database/get-models';
import { PROVIDERS } from '../../../constants/providers';
import { UserRegisterDto } from '../users/register.dto';
import { UserModel } from 'src/modules/shared/database/models';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
    private jwtService: JwtService
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

  async validateUser(username: string, password: string) {
    const relatedUser = await this.models.User.findOne({ where: { username } });

    if (!relatedUser) {
      return null;
    }

    const areCredsValid = await compare(password, relatedUser.password);

    if (!areCredsValid) {
      return null;
    }

    return { email: relatedUser.email, username: relatedUser.username, userId: +relatedUser.id };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.userId,
    };
  }
}
