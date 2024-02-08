export const USER_FIELD_RESTRICTION = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 15,
  EMAIL_VALIDATION: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,5})?$/,
} as const;
