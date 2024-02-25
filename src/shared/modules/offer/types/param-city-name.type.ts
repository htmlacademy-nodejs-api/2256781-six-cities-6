import { ParamsDictionary } from 'express-serve-static-core';
import { City } from '../../../types/index.js';

export type ParamCityName =
  | {
    city: City;
  }
  | ParamsDictionary;
