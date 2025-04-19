import type { QueryFilters } from 'src/types/Filter.type';

export function queryFilterToHTTPFilter(filter: QueryFilters) {
  return {
    type: filter?.type,
  };
}
