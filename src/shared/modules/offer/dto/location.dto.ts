import { IsNumber } from 'class-validator';
import { LOCATION_DTO_SETTINGS } from '../../index.js';

export class LocationDto {
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false
    },
    {
      message: LOCATION_DTO_SETTINGS.LATITUDE_FORMAT_MSG
    },
  )
  public latitude!: number;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false
    },
    {
      message: LOCATION_DTO_SETTINGS.LONGITUDE_FORMAT_MSG
    },
  )
  public longitude!: number;
}
