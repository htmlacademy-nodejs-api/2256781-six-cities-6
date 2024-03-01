import { SortType } from '../../../types/index.js';

export type TSearchParameters = {
  userId?: string,
  limit?: number,
  sort?: Record<string, SortType>,
  isFavoriteOnly?: boolean,
}
