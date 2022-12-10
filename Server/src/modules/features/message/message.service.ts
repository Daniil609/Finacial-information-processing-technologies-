import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Injectable()
export class MessageService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async findMessagesByUserId(userId: number) {
    //@ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT m.*
        FROM trpo.messages m
      where m.user_from_id = :userId or m.user_to_id = :userId ;`,
      { replacements: { userId } },
    );

    if (!results || !results[0]) {
      return [];
    }

    return results;
  }

  async addMessage(params: { text: string; user_from_id: number; user_to_id: number }) {
    const { text, user_from_id, user_to_id } = params;

    //@ts-ignore
    const [results] = await this.models.Profile.sequelize?.query(
      `INSERT INTO trpo.messages (id, text, user_from_id, user_to_id, created_at, updated_at)
        VALUES (DEFAULT, :text, :user_from_id, :user_to_id, DEFAULT, DEFAULT) RETURNING *;
      `,
      {
        replacements: { text, user_from_id, user_to_id },
      },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('could not create message');
    }

    return results[0];
  }

  async checkUser(userId: number) {
    //@ts-ignore
    const [results] = await this.models.Region.sequelize?.query(
      `SELECT u.* FROM trpo.users u where u.id = :userId;
      `,
      { replacements: { userId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('User with such id does not exist');
    }

    return results[0];
  }
}
