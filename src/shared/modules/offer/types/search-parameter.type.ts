import { SortType } from '../../../types/index.js';

export type TSearchParameters = {
  userId?: string,
  offerId?: string,
  limit?: number,
  sort?: Record<string, SortType>,
  isFavoriteOnly?: boolean,
}
