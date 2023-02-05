import type { FormikFilters, QueryFilters } from '@type/Filter.type';

export function queryFilterToFormikFilter(filter: QueryFilters): FormikFilters {
  const result: FormikFilters = {
    type: filter.type,
  };

  return result;
}
