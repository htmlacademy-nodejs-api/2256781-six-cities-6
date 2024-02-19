import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { OfferGood, OfferType, City } from '../../../types/index.js';
import { OFFER_DTO } from '../offer.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  public date?: Date;

  @IsOptional()
  @IsString()
  @MinLength(OFFER_DTO.TITLE_MIN_VAL, { message: OFFER_DTO.TITLE_MIN_MSG })
  @MaxLength(OFFER_DTO.TITLE_MAX_VAL, { message: OFFER_DTO.TITLE_MAX_MSG })
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(OFFER_DTO.DESC_MIN_VAL, { message: OFFER_DTO.DESC_MIN_MSG })
  @MaxLength(OFFER_DTO.DESC_MAX_VAL, { message: OFFER_DTO.DESC_MAX_MSG })
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: OFFER_DTO.CITY_MSG })
  public city?: City;

  @IsOptional()
  @MaxLength(OFFER_DTO.PREVIEW_VAL, { message: OFFER_DTO.PREVIEW_MSG })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: OFFER_DTO.IMAGES_FORMAT_MSG })
  @ArrayMinSize(OFFER_DTO.IMAGES_MIN_SIZE_VAL, { message: OFFER_DTO.IMAGES_SIZE_MSG })
  @ArrayMaxSize(OFFER_DTO.IMAGES_MAX_SIZE_VAL, { message: OFFER_DTO.IMAGES_SIZE_MSG })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: OFFER_DTO.PREMIUM_MSG })
  public premium?: boolean;

  @IsOptional()
  @IsBoolean({ message: OFFER_DTO.FAVORITE_MSG })
  public favorite?: boolean;

  @IsOptional()
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: OFFER_DTO.TYPE_MSG })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: OFFER_DTO.BEDROOMS_FORMAT_MSG })
  @Min(OFFER_DTO.BEDROOMS_MIN_VAL, { message: OFFER_DTO.BEDROOMS_MIN_MSG })
  @Max(OFFER_DTO.BEDROOMS_MAX_VAL, { message: OFFER_DTO.BEDROOMS_MAX_MSG })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: OFFER_DTO.ADULTS_FORMAT_MSG })
  @Min(OFFER_DTO.ADULTS_MIN_VAL, { message: OFFER_DTO.ADULTS_MIN_MSG })
  @Max(OFFER_DTO.ADULTS_MAX_VAL, { message: OFFER_DTO.ADULTS_MAX_MSG })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: OFFER_DTO.PRICE_FORMAT_MSG })
  @Min(OFFER_DTO.PRICE_MIN_VAL, { message: OFFER_DTO.PRICE_MIN_MSG })
  @Max(OFFER_DTO.PRICE_MAX_VAL, { message: OFFER_DTO.PRICE_MAX_MSG })
  public price?: number;

  @IsOptional()
  @IsArray({ message: OFFER_DTO.GOODS_FORMAT_MSG })
  @IsEnum(OfferGood, { each: true, message: OFFER_DTO.GOODS_MSG })
  public goods?: OfferGood[];

  @IsOptional()
  public commentCount?: number;

  @IsOptional()
  public location?: string;
}
