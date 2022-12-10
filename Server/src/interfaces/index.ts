import winston from 'winston';
import { PERMISSION_LEVEL } from '../constants';

export interface ArrayResponse<T> {
  data: T[];
  metadata: {
    count: number;
    limit: number;
    offset: number;
  };
}

export type PermissionCode = string;

export type UserPermissionMap = { [code: PermissionCode]: PERMISSION_LEVEL };
export type UserPermissionItem = [PermissionCode, PERMISSION_LEVEL];

export interface JwtUser {
  id: string;
  permissionMap: UserPermissionMap;
}

export interface RequestLocals {
  logger: winston.Logger;
  traceId: string;
  user: JwtUser;
}

export interface Pagination {
  limit?: number;
  offset?: number;
}

interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}
export default RequestWithRawBody;
