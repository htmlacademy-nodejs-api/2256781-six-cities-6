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
import { OFFER_DTO_SETTINGS } from '../../index.js';

export class UpdateOfferDto {
  @IsOptional()
  public date?: Date;

  @IsOptional()
  @IsString()
  @MinLength(OFFER_DTO_SETTINGS.TITLE_MIN_VAL, { message: OFFER_DTO_SETTINGS.TITLE_MIN_MSG })
  @MaxLength(OFFER_DTO_SETTINGS.TITLE_MAX_VAL, { message: OFFER_DTO_SETTINGS.TITLE_MAX_MSG })
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(OFFER_DTO_SETTINGS.DESC_MIN_VAL, { message: OFFER_DTO_SETTINGS.DESC_MIN_MSG })
  @MaxLength(OFFER_DTO_SETTINGS.DESC_MAX_VAL, { message: OFFER_DTO_SETTINGS.DESC_MAX_MSG })
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: OFFER_DTO_SETTINGS.CITY_MSG })
  public city?: City;

  @IsOptional()
  @MaxLength(OFFER_DTO_SETTINGS.PREVIEW_VAL, { message: OFFER_DTO_SETTINGS.PREVIEW_MSG })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: OFFER_DTO_SETTINGS.IMAGES_FORMAT_MSG })
  @ArrayMinSize(OFFER_DTO_SETTINGS.IMAGES_MIN_SIZE_VAL, { message: OFFER_DTO_SETTINGS.IMAGES_SIZE_MSG })
  @ArrayMaxSize(OFFER_DTO_SETTINGS.IMAGES_MAX_SIZE_VAL, { message: OFFER_DTO_SETTINGS.IMAGES_SIZE_MSG })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: OFFER_DTO_SETTINGS.PREMIUM_MSG })
  public premium?: boolean;

  @IsOptional()
  @IsBoolean({ message: OFFER_DTO_SETTINGS.FAVORITE_MSG })
  public favorite?: boolean;

  @IsOptional()
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: OFFER_DTO_SETTINGS.TYPE_MSG })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: OFFER_DTO_SETTINGS.BEDROOMS_FORMAT_MSG })
  @Min(OFFER_DTO_SETTINGS.BEDROOMS_MIN_VAL, { message: OFFER_DTO_SETTINGS.BEDROOMS_MIN_MSG })
  @Max(OFFER_DTO_SETTINGS.BEDROOMS_MAX_VAL, { message: OFFER_DTO_SETTINGS.BEDROOMS_MAX_MSG })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: OFFER_DTO_SETTINGS.ADULTS_FORMAT_MSG })
  @Min(OFFER_DTO_SETTINGS.ADULTS_MIN_VAL, { message: OFFER_DTO_SETTINGS.ADULTS_MIN_MSG })
  @Max(OFFER_DTO_SETTINGS.ADULTS_MAX_VAL, { message: OFFER_DTO_SETTINGS.ADULTS_MAX_MSG })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: OFFER_DTO_SETTINGS.PRICE_FORMAT_MSG })
  @Min(OFFER_DTO_SETTINGS.PRICE_MIN_VAL, { message: OFFER_DTO_SETTINGS.PRICE_MIN_MSG })
  @Max(OFFER_DTO_SETTINGS.PRICE_MAX_VAL, { message: OFFER_DTO_SETTINGS.PRICE_MAX_MSG })
  public price?: number;

  @IsOptional()
  @IsArray({ message: OFFER_DTO_SETTINGS.GOODS_FORMAT_MSG })
  @IsEnum(OfferGood, { each: true, message: OFFER_DTO_SETTINGS.GOODS_MSG })
  public goods?: OfferGood[];

  @IsOptional()
  public commentCount?: number;

  @IsOptional()
  public location?: string;
}
