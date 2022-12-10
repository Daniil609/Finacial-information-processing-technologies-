export enum RESPONSE_CODE {
  VALIDATION_ERROR = 'validation_error',
}

export enum LOG_LEVEL {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  DEBUG = 'debug',
}

// TODO: move permission constants to separate file
export enum PERMISSION_LEVEL {
  OFF = 0,
  READ = 1,
  WRITE = 5,
  DELETE = 10,
}

export enum PERMISSION_LEVEL_TEXT {
  OFF = 'Off',
  ON = 'On',
  READ = 'Read',
  WRITE = 'Write',
  DELETE = 'Delete',
}

export const PERMISSION_TEXT_TO_LEVEL = {
  [PERMISSION_LEVEL_TEXT.OFF]: PERMISSION_LEVEL.OFF,
  [PERMISSION_LEVEL_TEXT.ON]: PERMISSION_LEVEL.READ,
  [PERMISSION_LEVEL_TEXT.READ]: PERMISSION_LEVEL.READ,
  [PERMISSION_LEVEL_TEXT.WRITE]: PERMISSION_LEVEL.WRITE,
  [PERMISSION_LEVEL_TEXT.DELETE]: PERMISSION_LEVEL.DELETE,
};

export const PERMISSION_CODE = {
  POSITIONS: 'positions',
  SKILLS: 'skills',
  USERS: 'users',
  ASSIGN_EMPLOYEES: 'assign_employees',
  MANAGER: 'manager',
  PERMISSIONS: 'permissions',
};

export const jwtConstants = {
  secret: 'secretKey',
};

export const stripe_wh_secret = ''
