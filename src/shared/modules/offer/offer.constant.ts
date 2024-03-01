export const DEFAULT_OFFER_VALUE = {
  OFFER_COUNT: 60,
  PREMIUM_COUNT: 3,
} as const;

export const OFFER_DTO_VALUE = {
  TITLE_MIN_VAL: 10,
  TITLE_MAX_VAL: 100,
  DESC_MIN_VAL: 20,
  DESC_MAX_VAL: 1024,
  PREVIEW_VAL: 256,
  IMAGES_MAX_VAL: 256,
  IMAGES_MIN_SIZE_VAL: 6,
  IMAGES_MAX_SIZE_VAL: 6,
  BEDROOMS_MIN_VAL: 1,
  BEDROOMS_MAX_VAL: 8,
  ADULTS_MIN_VAL: 1,
  ADULTS_MAX_VAL: 10,
  PRICE_MIN_VAL: 100,
  PRICE_MAX_VAL: 100_000,
} as const;

export const OFFER_DTO_MESSAGE = {
  DATE: 'The date must be filled in',
  TITLE_MIN: `The minimum length of the title should be ${OFFER_DTO_VALUE.TITLE_MIN_VAL} characters`,
  TITLE_MAX: `The maximum length of the title should be ${OFFER_DTO_VALUE.TITLE_MAX_VAL} characters`,
  DESC_MIN: `The minimum length of the description should be ${OFFER_DTO_VALUE.DESC_MIN_VAL} characters`,
  DESC_MAX: `The maximum length of the description should be ${OFFER_DTO_VALUE.DESC_MAX_VAL} characters`,
  PREVIEW: 'The line is too short',
  IMAGES_FORMAT: 'The images must be an array',
  IMAGES_MAX: `The length of any URL in the array must be no more than ${OFFER_DTO_VALUE.IMAGES_MAX_VAL} characters`,
  IMAGES_SIZE: `The array should always contain ${OFFER_DTO_VALUE.IMAGES_MAX_SIZE_VAL} images`,
  PREMIUM: 'The premium field must be logical',
  FAVORITE: 'The favorite field must be logical',
  CITY: 'The city field must be any of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  TYPE: 'The type must be any of: apartment, house, room, hotel',
  GOODS_FORMAT: 'The goods field must be an array',
  GOODS: 'The goods must be any of: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  BEDROOMS_FORMAT: 'The bedrooms field must be a number',
  BEDROOMS_MIN: `The minimum length of the bedrooms should be ${OFFER_DTO_VALUE.BEDROOMS_MIN_VAL} characters`,
  BEDROOMS_MAX: `The maximum length of the bedrooms should be ${OFFER_DTO_VALUE.BEDROOMS_MAX_VAL} characters`,
  ADULTS_FORMAT: 'The maxAdults field must be a number',
  ADULTS_MIN: `The minimum length of the adults should be ${OFFER_DTO_VALUE.ADULTS_MIN_VAL} characters`,
  ADULTS_MAX: `The maximum length of the adults should be ${OFFER_DTO_VALUE.ADULTS_MAX_VAL} characters`,
  PRICE_MIN: `The minimum value of the price should be ${OFFER_DTO_VALUE.PRICE_MIN_VAL} characters`,
  PRICE_MAX: `The maximum value of the price should be ${OFFER_DTO_VALUE.PRICE_MAX_VAL} characters`,
  PRICE_FORMAT: 'The price field must be a number',
  USER_ID: 'The userId must be a valid ID',
} as const;

export const LOCATION_DTO_SETTINGS = {
  LATITUDE_FORMAT_MSG: 'The latitude field must be a number',
  LONGITUDE_FORMAT_MSG: 'The longitude field must be a number',
} as const;
