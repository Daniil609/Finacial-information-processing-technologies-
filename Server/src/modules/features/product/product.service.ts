import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

@Injectable()
export class ProductService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async findProductsById(userId: number) {
    //@ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT pr.*
        FROM trpo.products pr
      where pr.user_id = :userId ;`,
      { replacements: { userId } },
    );

    if (!results || !results[0]) {
      return [];
    }

    return results;
  }

  async findProductByProductId(productId: string) {
    //@ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT pr.*
        FROM trpo.products pr
      where pr.id = :productId LIMIT 1 ;`,
      { replacements: { productId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('Product with such id was not found');
    }

    return results[0];
  }

  async findAddressById(addressId: string) {
    //@ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT r.*
        FROM trpo.regions r
      where r.id = :addressId LIMIT 1 ;`,
      { replacements: { addressId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('Address with such id was not found');
    }

    return results[0];
  }

  async getAllProducts() {
    //@ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT pr.*
        FROM trpo.products pr;`,
    );

    if (!results || !results[0]) {
      return [];
    }

    return results;
  }

  async addProduct(params: {
    address_id: string;
    condition: string;
    image: string;
    manufactureDate: Date;
    name: string;
    price: number;
    type_id: string;
    userId: number;
    minAge: number;
    maxAge: number;
  }) {
    const {
      name,
      address_id,
      condition,
      image,
      manufactureDate,
      price,
      type_id,
      userId,
      maxAge,
      minAge,
    } = params;

    //@ts-ignore
    const [results] = await this.models.Profile.sequelize?.query(
      `INSERT INTO trpo.products (id, name, "manufactureDate", price, image, type_id, condition, "minAge", "maxAge",
              address_id, user_id, created_at, updated_at)
        VALUES (DEFAULT, :name, :manufactureDate, :price, :image, :type_id, :condition, :minAge, :maxAge, :address_id, :user_id, DEFAULT,
        DEFAULT) RETURNING *;
      `,
      {
        replacements: {
          name,
          address_id,
          condition,
          image,
          manufactureDate,
          price,
          type_id,
          user_id: userId,
          minAge,
          maxAge,
        },
      },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('could not create product');
    }

    return results[0];
  }

  async addAddress(address: string) {
    //@ts-ignore
    const [results] = await this.models.Region.sequelize?.query(
      `INSERT INTO trpo.regions (id, name, type, parent_id, created_at, updated_at)
      VALUES (DEFAULT, :address, 'address', null, DEFAULT, DEFAULT) RETURNING *;
      `,
      { replacements: { address } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('cannot create new region');
    }

    return results[0];
  }

  async checkTypeId(typeId: string) {
    //@ts-ignore
    const [results] = await this.models.Region.sequelize?.query(
      `SELECT pt.* FROM trpo.product_type pt where id = :typeId;
      `,
      { replacements: { typeId } },
    );

    if (!results || !results[0]) {
      throw new NotFoundException('Cannot find proper type id');
    }

    return results[0];
  }
}
