import {IDBPaginatedResponse, IPaginatedResponseOptions} from '../interfaces/pagination';

export default abstract class BaseController {
  protected logError(error, className, methodName): void {
    console.log(`${className} :: ${methodName} :: error`, error);
    throw new Error(error);
  }

  protected paginatedResponse<T>(
    collection: any,
    options?: IPaginatedResponseOptions<Promise<T> | T>
  ): IDBPaginatedResponse<T> {
    return {
        items: options && options.items ? options.items() : collection.toJSON(),
        count: options && options.count ? options.count() : collection.toJSON().length,
        limit: options && options.limit ? options.limit() : collection.pagination.pageSize,
        current_page: options && options.current_page ? options.current_page() : collection.pagination.page,
        has_more: options && options.has_more ? options.has_more() : (collection.pagination.pageCount > collection.pagination.page),
        total_count: options && options.total_count ? options.total_count() : collection.pagination.rowCount,
        error: options && options.error ? options.error() : false
    };
  }
}