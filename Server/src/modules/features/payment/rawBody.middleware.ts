import { Request, Response } from 'express';
import { json } from 'body-parser';

function rawBodyMiddleware() {
  return json({
    verify: (request: Request, response: Response, buffer: Buffer) => {
      if (request.url === '/api/v1/payment/webhook' && Buffer.isBuffer(buffer)) {
        // @ts-ignore
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}
export default rawBodyMiddleware;
