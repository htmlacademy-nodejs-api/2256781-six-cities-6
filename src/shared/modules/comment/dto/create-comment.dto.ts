import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { COMMENT_DTO_SETTINGS } from '../../index.js';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(COMMENT_DTO_SETTINGS.TEXT_MIN_VAL, COMMENT_DTO_SETTINGS.TEXT_MAX_VAL)
  public text!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(COMMENT_DTO_SETTINGS.RATING_MIN_VAL)
  @Max(COMMENT_DTO_SETTINGS.RATING_MAX_VAL)
  public rating!: number;

  @IsNotEmpty()
  @IsMongoId()
  public offerId!: string;

  @IsNotEmpty()
  @IsMongoId()
  public userId!: string;
}
