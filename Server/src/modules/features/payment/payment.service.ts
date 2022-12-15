import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { EnvironmentVariables } from '../../../constants/env-variables';
import { PROVIDERS } from '../../../constants/providers';
import { Models } from '../../shared/database/get-models';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(
  'sk_test_51MDUS9GwvNJiVotBQL7Tg6goqylK4DeXOdNFr7VC10nSWvtvz1WN2EnbzPJs97TWPgEvLCvgkLJ6NRXBgLA6hPUv000nB832HV',
);

@Injectable()
export class PaymentService {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(PROVIDERS.MODELS) private models: Models,
  ) {}

  async createCheckoutSession(
    price: number,
    userId: number,
    productId: string,
  ): Promise<Stripe.Checkout.Session> {
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://trpo-item-selling-service.herokuapp.com',
      cancel_url: 'https://trpo-item-selling-service.herokuapp.com',
      line_items: [
        {
          price_data: {
            unit_amount: price,
            currency: 'usd',
            product_data: {
              name: 'Test Product',
            },
          },
          quantity: 1,
        },
      ],
      metadata: { userId, productId },
      mode: 'payment',
    });

    return session;
  }

  async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WH_SECRET');
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }

  async handlePaymentWebhook(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const data = event.data.object as Stripe.Checkout.Session;
      const userId = data.metadata!.userId;
      const productId = data.metadata!.productId;

      // @ts-ignore
      const [results] = await this.models.Product.sequelize?.query(
        `UPDATE trpo.products
        SET buyer_user_id = :userId
        WHERE id = :productId RETURNING *;
        `,
        { replacements: { productId, userId } },
      );

      if (!results || !results[0]) {
        throw new NotFoundException('Product with such id was not found');
      }

      // @ts-ignore
      await this.models.Product.sequelize?.query(
        `INSERT INTO trpo.payments (id, amount, user_id, status, currency, payment_details, payment_type, created_at, updated_at)
        VALUES (DEFAULT, :price, :userId, :status, :currency, :paymentDetails, :paymentType, DEFAULT, DEFAULT);
        `,
        {
          replacements: {
            price: +(data.amount_total || 0),
            userId: +userId,
            status: data.status,
            currency: data.currency,
            paymentDetails: JSON.stringify(data),
            paymentType: 'deposit',
          },
        },
      );

      if (!results || !results[0]) {
        throw new NotFoundException('Could not create payment row');
      }
    }
  }

  async getPaymentsHistoryByUserId(userId: number) {
    // @ts-ignore
    const [results] = await this.models.Product.sequelize?.query(
      `SELECT id, amount, status, currency, payment_type from trpo.payments where user_id = :userId;
      `,
      { replacements: { userId } },
    );

    if (!results || !results[0]) {
      return [];
    }

    return results;
  }
}
