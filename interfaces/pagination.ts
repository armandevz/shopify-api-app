export interface IDBPaginatedResponse<T> {
  items: T[];
  count: number;
  limit: number;
  current_page: number;
  has_more: boolean;
  total_count: number;
  error: boolean;
}

export interface IPaginatedResponseOptions<T> {
  items?: () => T[];
  count?: () => number;
  limit?: () => number;
  current_page?: () => number;
  has_more?: () => boolean;
  total_count?: () => number;
  error?: () => boolean;
}