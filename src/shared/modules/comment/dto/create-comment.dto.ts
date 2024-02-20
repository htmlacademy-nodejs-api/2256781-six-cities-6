import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { COMMENT_DTO } from '../../index.js';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(COMMENT_DTO.TEXT_MIN_VAL, COMMENT_DTO.TEXT_MAX_VAL)
  public text!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(COMMENT_DTO.RATING_MIN_VAL)
  @Max(COMMENT_DTO.RATING_MAX_VAL)
  public rating!: number;

  @IsNotEmpty()
  @IsMongoId()
  public offerId!: string;

  @IsNotEmpty()
  @IsMongoId()
  public userId!: string;
}
