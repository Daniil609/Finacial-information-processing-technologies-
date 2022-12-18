import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Injectable()
export class CommentService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async findCommentsByProductId(productId: string) {
    //@ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT c.*
        FROM trpo.comments c
      where c.product_id = :productId ;`,
      { replacements: { productId } },
    );

    if (!results || !results[0]) {
      return [];
    }

    return results;
  }

  async addComment(params: { text: string; product_id: string; user_id: number }) {
    const { product_id, text, user_id } = params;

    //@ts-ignore
    const [results] = await this.models.Profile.sequelize?.query(
      `INSERT INTO trpo.comments (id, text, user_id, product_id, created_at, updated_at)
        VALUES (DEFAULT, :text, :user_id, :product_id, DEFAULT, DEFAULT) RETURNING *;
      `,
      {
        replacements: { text, product_id, user_id },
      },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('could not create comment');
    }

    return results[0];
  }

  async checkProduct(productId: string) {
    //@ts-ignore
    const [results] = await this.models.Region.sequelize?.query(
      `SELECT pr.* FROM trpo.products pr where pr.id = :productId;
      `,
      { replacements: { productId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('Product with such id does not exist');
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

  async deleteCommentByProductId(productId: string, userId: number, commentId: string) {
    //@ts-ignore
    await this.models.Region.sequelize?.query(
      `DELETE FROM trpo.comments c where c.product_id = :productId and c.user_id = :userId and c.id = :commentId;
      `,
      { replacements: { userId, productId, commentId } },
    );
  }
}
