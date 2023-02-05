import type { QueryFilters } from '@type/Filter.type';

export function queryFilterToHTTPFilter(filter: QueryFilters) {
  return {
    type: filter?.type,
  };
}
