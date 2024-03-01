import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
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
import { OFFER_DTO_MESSAGE, OFFER_DTO_VALUE } from '../../index.js';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_DTO_VALUE.TITLE_MIN_VAL, { message: OFFER_DTO_MESSAGE.TITLE_MIN })
  @MaxLength(OFFER_DTO_VALUE.TITLE_MAX_VAL, { message: OFFER_DTO_MESSAGE.TITLE_MAX })
  public title!: string;

  @IsNotEmpty({ message: OFFER_DTO_MESSAGE.DATE })
  public date!: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_DTO_VALUE.DESC_MIN_VAL, { message: OFFER_DTO_MESSAGE.DESC_MIN })
  @MaxLength(OFFER_DTO_VALUE.DESC_MAX_VAL, { message: OFFER_DTO_MESSAGE.DESC_MAX })
  public description!: string;

  @IsNotEmpty()
  @IsEnum(City, { message: OFFER_DTO_MESSAGE.CITY })
  public city!: City;

  @IsNotEmpty()
  @MaxLength(OFFER_DTO_VALUE.PREVIEW_VAL, { message: OFFER_DTO_MESSAGE.PREVIEW })
  public previewImage!: string;

  @IsArray({ message: OFFER_DTO_MESSAGE.IMAGES_FORMAT })
  @ArrayMinSize(OFFER_DTO_VALUE.IMAGES_MIN_SIZE_VAL, { message: OFFER_DTO_MESSAGE.IMAGES_SIZE })
  @ArrayMaxSize(OFFER_DTO_VALUE.IMAGES_MAX_SIZE_VAL, { message: OFFER_DTO_MESSAGE.IMAGES_SIZE })
  public images!: string[];

  @IsNotEmpty()
  @IsBoolean({ message: OFFER_DTO_MESSAGE.PREMIUM })
  public premium!: boolean;

  @IsNotEmpty()
  @IsBoolean({ message: OFFER_DTO_MESSAGE.FAVORITE })
  public favorite!: boolean;

  @IsNotEmpty()
  @IsEnum(OfferType, { message: OFFER_DTO_MESSAGE.TYPE })
  public type!: OfferType;

  @IsNotEmpty()
  @IsInt({ message: OFFER_DTO_MESSAGE.BEDROOMS_FORMAT })
  @Min(OFFER_DTO_VALUE.BEDROOMS_MIN_VAL, { message: OFFER_DTO_MESSAGE.BEDROOMS_MIN })
  @Max(OFFER_DTO_VALUE.BEDROOMS_MAX_VAL, { message: OFFER_DTO_MESSAGE.BEDROOMS_MAX })
  public bedrooms!: number;

  @IsNotEmpty()
  @IsInt({ message: OFFER_DTO_MESSAGE.ADULTS_FORMAT })
  @Min(OFFER_DTO_VALUE.ADULTS_MIN_VAL, { message: OFFER_DTO_MESSAGE.ADULTS_MIN })
  @Max(OFFER_DTO_VALUE.ADULTS_MAX_VAL, { message: OFFER_DTO_MESSAGE.ADULTS_MAX })
  public maxAdults!: number;

  @IsNotEmpty()
  @IsInt({ message: OFFER_DTO_MESSAGE.PRICE_FORMAT })
  @Min(OFFER_DTO_VALUE.PRICE_MIN_VAL, { message: OFFER_DTO_MESSAGE.PRICE_MIN })
  @Max(OFFER_DTO_VALUE.PRICE_MAX_VAL, { message: OFFER_DTO_MESSAGE.PRICE_MAX })
  public price!: number;

  @IsNotEmpty()
  @IsArray({ message: OFFER_DTO_MESSAGE.GOODS_FORMAT })
  @IsEnum(OfferGood, { each: true, message: OFFER_DTO_MESSAGE.GOODS })
  public goods!: OfferGood[];

  public userId!: string;

  @IsNotEmpty()
  public location!: TLocation;
}
