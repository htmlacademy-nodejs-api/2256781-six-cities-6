import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
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
  TLocation,
} from '../../../types/index.js';
import { OFFER_DTO_SETTINGS } from '../../index.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_DTO_SETTINGS.TITLE_MIN_VAL, { message: OFFER_DTO_SETTINGS.TITLE_MIN_MSG })
  @MaxLength(OFFER_DTO_SETTINGS.TITLE_MAX_VAL, { message: OFFER_DTO_SETTINGS.TITLE_MAX_MSG })
  public title!: string;

  @IsNotEmpty({ message: OFFER_DTO_SETTINGS.DATE_MSG })
  public date!: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_DTO_SETTINGS.DESC_MIN_VAL, { message: OFFER_DTO_SETTINGS.DESC_MIN_MSG })
  @MaxLength(OFFER_DTO_SETTINGS.DESC_MAX_VAL, { message: OFFER_DTO_SETTINGS.DESC_MAX_MSG })
  public description!: string;

  @IsNotEmpty()
  @IsEnum(City, { message: OFFER_DTO_SETTINGS.CITY_MSG })
  public city!: City;

  @IsNotEmpty()
  @MaxLength(OFFER_DTO_SETTINGS.PREVIEW_VAL, { message: OFFER_DTO_SETTINGS.PREVIEW_MSG })
  public previewImage!: string;

  @IsArray({ message: OFFER_DTO_SETTINGS.IMAGES_FORMAT_MSG })
  @ArrayMinSize(OFFER_DTO_SETTINGS.IMAGES_MIN_SIZE_VAL, { message: OFFER_DTO_SETTINGS.IMAGES_SIZE_MSG })
  @ArrayMaxSize(OFFER_DTO_SETTINGS.IMAGES_MAX_SIZE_VAL, { message: OFFER_DTO_SETTINGS.IMAGES_SIZE_MSG })
  public images!: string[];

  @IsNotEmpty()
  @IsBoolean({ message: OFFER_DTO_SETTINGS.PREMIUM_MSG })
  public premium!: boolean;

  @IsNotEmpty()
  @IsBoolean({ message: OFFER_DTO_SETTINGS.FAVORITE_MSG })
  public favorite!: boolean;

  @IsNotEmpty()
  @IsEnum(OfferType, { message: OFFER_DTO_SETTINGS.TYPE_MSG })
  public type!: OfferType;

  @IsNotEmpty()
  @IsInt({ message: OFFER_DTO_SETTINGS.BEDROOMS_FORMAT_MSG })
  @Min(OFFER_DTO_SETTINGS.BEDROOMS_MIN_VAL, { message: OFFER_DTO_SETTINGS.BEDROOMS_MIN_MSG })
  @Max(OFFER_DTO_SETTINGS.BEDROOMS_MAX_VAL, { message: OFFER_DTO_SETTINGS.BEDROOMS_MAX_MSG })
  public bedrooms!: number;

  @IsNotEmpty()
  @IsInt({ message: OFFER_DTO_SETTINGS.ADULTS_FORMAT_MSG })
  @Min(OFFER_DTO_SETTINGS.ADULTS_MIN_VAL, { message: OFFER_DTO_SETTINGS.ADULTS_MIN_MSG })
  @Max(OFFER_DTO_SETTINGS.ADULTS_MAX_VAL, { message: OFFER_DTO_SETTINGS.ADULTS_MAX_MSG })
  public maxAdults!: number;

  @IsNotEmpty()
  @IsInt({ message: OFFER_DTO_SETTINGS.PRICE_FORMAT_MSG })
  @Min(OFFER_DTO_SETTINGS.PRICE_MIN_VAL, { message: OFFER_DTO_SETTINGS.PRICE_MIN_MSG })
  @Max(OFFER_DTO_SETTINGS.PRICE_MAX_VAL, { message: OFFER_DTO_SETTINGS.PRICE_MAX_MSG })
  public price!: number;

  @IsNotEmpty()
  @IsArray({ message: OFFER_DTO_SETTINGS.GOODS_FORMAT_MSG })
  @IsEnum(OfferGood, { each: true, message: OFFER_DTO_SETTINGS.GOODS_MSG })
  public goods!: OfferGood[];

  public userId!: string;

  @IsNotEmpty()
  public location!: TLocation;
}
