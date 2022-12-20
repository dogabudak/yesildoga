import type {QueryFilters} from '../types/Filter.type';

export function queryFilterToHTTPFilter(filter: QueryFilters) {
  return  {
    startDate: filter?.startDate,
    endDate: filter?.endDate,
    type: filter?.type,
  }
}
