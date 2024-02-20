import { IsNumber } from 'class-validator';
import { LOCATION_DTO } from '../../index.js';

export class LocationDto {
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false
    },
    {
      message: LOCATION_DTO.LATITUDE_FORMAT_MSG
    },
  )
  public latitude!: number;

  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false
    },
    {
      message: LOCATION_DTO.LONGITUDE_FORMAT_MSG
    },
  )
  public longitude!: number;
}
