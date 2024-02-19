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
  TLocation
} from '../../../types/index.js';
import { OFFER_CREATE_DTO } from '../../index.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_CREATE_DTO.TITLE_MIN_VAL, { message: OFFER_CREATE_DTO.TITLE_MIN_MSG })
  @MaxLength(OFFER_CREATE_DTO.TITLE_MAX_VAL, { message: OFFER_CREATE_DTO.TITLE_MAX_MSG })
  public title!: string;

  @IsNotEmpty({ message: OFFER_CREATE_DTO.DATE_MSG })
  public date!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_CREATE_DTO.DESC_MIN_VAL, { message: OFFER_CREATE_DTO.DESC_MIN_MSG })
  @MaxLength(OFFER_CREATE_DTO.DESC_MAX_VAL, { message: OFFER_CREATE_DTO.DESC_MAX_MSG })
  public description!: string;

  @IsNotEmpty()
  @IsEnum(City, { message: OFFER_CREATE_DTO.CITY_MSG })
  public city!: City;

  @IsNotEmpty()
  @MaxLength(OFFER_CREATE_DTO.PREVIEW_VAL, { message: OFFER_CREATE_DTO.PREVIEW_MSG })
  public previewImage!: string;

  @IsArray({ message: OFFER_CREATE_DTO.IMAGES_FORMAT_MSG })
  @ArrayMinSize(OFFER_CREATE_DTO.IMAGES_MIN_SIZE_VAL, { message: OFFER_CREATE_DTO.IMAGES_SIZE_MSG })
  @ArrayMaxSize(OFFER_CREATE_DTO.IMAGES_MAX_SIZE_VAL, { message: OFFER_CREATE_DTO.IMAGES_SIZE_MSG })
  public images!: string[];

  @IsNotEmpty()
  @IsBoolean({ message: OFFER_CREATE_DTO.PREMIUM_MSG })
  public premium!: boolean;

  @IsNotEmpty()
  @IsBoolean({ message: OFFER_CREATE_DTO.FAVORITE_MSG })
  public favorite!: boolean;

  @IsNotEmpty()
  @IsEnum(OfferType, { message: OFFER_CREATE_DTO.TYPE_MSG })
  public type!: OfferType;

  @IsNotEmpty()
  @IsInt({ message: OFFER_CREATE_DTO.BEDROOMS_FORMAT_MSG })
  @Min(OFFER_CREATE_DTO.BEDROOMS_MIN_VAL, { message: OFFER_CREATE_DTO.BEDROOMS_MIN_MSG })
  @Max(OFFER_CREATE_DTO.BEDROOMS_MAX_VAL, { message: OFFER_CREATE_DTO.BEDROOMS_MAX_MSG })
  public bedrooms!: number;

  @IsNotEmpty()
  @IsInt({ message: OFFER_CREATE_DTO.ADULTS_FORMAT_MSG })
  @Min(OFFER_CREATE_DTO.ADULTS_MIN_VAL, { message: OFFER_CREATE_DTO.ADULTS_MIN_MSG })
  @Max(OFFER_CREATE_DTO.ADULTS_MAX_VAL, { message: OFFER_CREATE_DTO.ADULTS_MAX_MSG })
  public maxAdults!: number;

  @IsNotEmpty()
  @IsInt({ message: OFFER_CREATE_DTO.PRICE_FORMAT_MSG })
  @Min(OFFER_CREATE_DTO.PRICE_MIN_VAL, { message: OFFER_CREATE_DTO.PRICE_MIN_MSG })
  @Max(OFFER_CREATE_DTO.PRICE_MAX_VAL, { message: OFFER_CREATE_DTO.PRICE_MAX_MSG })
  public price!: number;

  @IsNotEmpty()
  @IsArray({ message: OFFER_CREATE_DTO.GOODS_FORMAT_MSG })
  @IsEnum(OfferGood, { each: true, message: OFFER_CREATE_DTO.GOODS_MSG })
  public goods!: OfferGood[];

  @IsNotEmpty()
  @IsMongoId({ message: OFFER_CREATE_DTO.USER_ID_MSG })
  public userId!: string;

  @IsNotEmpty()
  public location!: TLocation;
}
