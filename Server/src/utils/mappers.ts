import { ArrayResponse } from '../interfaces';

const mapToArrayResponse = <T>(
  data: T[],
  {
    count,
    limit,
    offset,
  }: {
    count: number;
    limit: number;
    offset: number;
  },
): ArrayResponse<T> => {
  return {
    data,
    metadata: {
      count,
      limit,
      offset,
    },
  };
};

export const mapTo = {
  arrayResponse: mapToArrayResponse,
};
