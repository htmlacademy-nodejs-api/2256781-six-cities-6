export const OFFER_FIELD_RESTRICTION = {
  TITLE_LENGTH: {
    MIN: 10,
    MAX: 100,
  },
  DESCRIPTION_LENGTH: {
    MIN: 20,
    MAX: 1024,
  },
  BEDROOMS_COUNT: {
    MIN: 1,
    MAX: 8,
  },
  ADULTS_COUNT: {
    MIN: 1,
    MAX: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 100_000,
  }
} as const;
