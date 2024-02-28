import { TTokenPayload } from './src/shared/modules/index.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TTokenPayload;
  }
}
