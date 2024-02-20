export const USER_FIELD_RESTRICTION = {
  NAME_LENGTH: {
    MIN: 1,
    MAX: 15,
  },
  PASSWORD_LENGTH: {
    MIN: 6,
    MAX: 12
  }
} as const;

export const DEFAULT_AVATAR = 'avatar.svg';
