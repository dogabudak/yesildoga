export type Filters = {
  startDate: string[];
  endDate: string[];
  type: string[];
};

export type QueryFilters = {
  type?: string;
  startDate?: string;
  endDate?: string;
};

export type FormikFilters = {
  startDate?: string,
  endDate?: string,
  type?: string;
};
export type HTTPFilterBody = {
  startDate?: string;
  endDate?: string;
  type?: string;
};