import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { HttpMethod } from '../../index.js';
import { IMiddleware } from '../../index.js';

export interface IRoute {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}
