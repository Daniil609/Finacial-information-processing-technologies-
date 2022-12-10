import { ApiResponse as ApiRes, ApiResponseOptions } from '@nestjs/swagger';

export const ApiResponse = {
  success: (overrides: ApiResponseOptions) => ApiRes({ status: 200, ...overrides }),

  unauthorized: (overrides?: ApiResponseOptions) =>
    ApiRes({ status: 401, description: 'Unauthorized', ...overrides }),

  forbidden: (overrides?: ApiResponseOptions) =>
    ApiRes({ status: 403, description: 'Forbidden', ...overrides }),

  internal: (overrides?: ApiResponseOptions) =>
    ApiRes({ status: 500, description: 'Internal Server', ...overrides }),
};
