import type { FormikFilters, QueryFilters } from 'src/types/Filter.type';

export function queryFilterToFormikFilter(filter: QueryFilters): FormikFilters {
  const result: FormikFilters = {
    type: filter.type,
  };

  return result;
}
