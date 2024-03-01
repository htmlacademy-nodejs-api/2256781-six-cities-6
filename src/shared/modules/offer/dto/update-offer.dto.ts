import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  OfferGood,
  OfferType,
  City,
} from '../../../types/index.js';
import { OFFER_DTO_VALUE, OFFER_DTO_MESSAGE } from '../../index.js';

export class UpdateOfferDto {
  @IsOptional()
  public date?: Date;

  @IsOptional()
  @IsString()
  @MinLength(OFFER_DTO_VALUE.TITLE_MIN_VAL, { message: OFFER_DTO_MESSAGE.TITLE_MIN })
  @MaxLength(OFFER_DTO_VALUE.TITLE_MAX_VAL, { message: OFFER_DTO_MESSAGE.TITLE_MAX })
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(OFFER_DTO_VALUE.DESC_MIN_VAL, { message: OFFER_DTO_MESSAGE.DESC_MIN })
  @MaxLength(OFFER_DTO_VALUE.DESC_MAX_VAL, { message: OFFER_DTO_MESSAGE.DESC_MAX })
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: OFFER_DTO_MESSAGE.CITY })
  public city?: City;

  @IsOptional()
  @MaxLength(OFFER_DTO_VALUE.PREVIEW_VAL, { message: OFFER_DTO_MESSAGE.PREVIEW })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: OFFER_DTO_MESSAGE.IMAGES_FORMAT })
  @ArrayMinSize(OFFER_DTO_VALUE.IMAGES_MIN_SIZE_VAL, { message: OFFER_DTO_MESSAGE.IMAGES_SIZE })
  @ArrayMaxSize(OFFER_DTO_VALUE.IMAGES_MAX_SIZE_VAL, { message: OFFER_DTO_MESSAGE.IMAGES_SIZE })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: OFFER_DTO_MESSAGE.PREMIUM })
  public premium?: boolean;

  @IsOptional()
  @IsBoolean({ message: OFFER_DTO_MESSAGE.FAVORITE })
  public favorite?: boolean;

  @IsOptional()
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: OFFER_DTO_MESSAGE.TYPE })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: OFFER_DTO_MESSAGE.BEDROOMS_FORMAT })
  @Min(OFFER_DTO_VALUE.BEDROOMS_MIN_VAL, { message: OFFER_DTO_MESSAGE.BEDROOMS_MIN })
  @Max(OFFER_DTO_VALUE.BEDROOMS_MAX_VAL, { message: OFFER_DTO_MESSAGE.BEDROOMS_MAX })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: OFFER_DTO_MESSAGE.ADULTS_FORMAT })
  @Min(OFFER_DTO_VALUE.ADULTS_MIN_VAL, { message: OFFER_DTO_MESSAGE.ADULTS_MIN })
  @Max(OFFER_DTO_VALUE.ADULTS_MAX_VAL, { message: OFFER_DTO_MESSAGE.ADULTS_MAX })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: OFFER_DTO_MESSAGE.PRICE_FORMAT })
  @Min(OFFER_DTO_VALUE.PRICE_MIN_VAL, { message: OFFER_DTO_MESSAGE.PRICE_MIN })
  @Max(OFFER_DTO_VALUE.PRICE_MAX_VAL, { message: OFFER_DTO_MESSAGE.PRICE_MAX })
  public price?: number;

  @IsOptional()
  @IsArray({ message: OFFER_DTO_MESSAGE.GOODS_FORMAT })
  @IsEnum(OfferGood, { each: true, message: OFFER_DTO_MESSAGE.GOODS })
  public goods?: OfferGood[];

  @IsOptional()
  public commentCount?: number;

  @IsOptional()
  public location?: string;
}
