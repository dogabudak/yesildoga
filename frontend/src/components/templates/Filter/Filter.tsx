import React from 'react';
import { Button } from 'src/components/atoms/Button/Button';
import { ToArray } from 'src/helpers/enumToArray';
import { buildFilters } from 'src/helpers/filterBuilder';
import { Select } from 'src/components/molecules/Select/Select';
import { Donations } from 'src/types/Donations';
import type { Filters, FormikFilters, QueryFilters } from 'src/types/Filter.type';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as S from 'src/components/templates/Filter/Filter.styled';
import 'react-datepicker/dist/react-datepicker.css';

export interface FilterBarProps {
  filters: Filters;
  onSubmit: (filters) => void;
  queryFilters: QueryFilters;
}

/**
 * Filter Sidebar
 */
export function Filter({ onSubmit, queryFilters }: FilterBarProps): JSX.Element {
  const router = useRouter();

  const update = async (values: FormikFilters): Promise<void> => {
    const { generatedFilters, queryParams } = buildFilters(values);
    onSubmit(generatedFilters);
    await router.push({
      query: queryParams,
    });
  };

  const formik = useFormik<FormikFilters>({
    initialValues: {
      type: '',
    },
    onSubmit: update,
    validate: update,
    validateOnBlur: true,
  });

  return (
    <S.Filter data-testid='filterbar'>
      <S.Header weight={700}>Filter</S.Header>
      <S.Divider />
      <Select
        // TODO this is quite wrong, create tabs for different donations maybe
        defaultValue=''
        options={ToArray(Donations)}
        name='type'
        localizedName='type'
        initField={true}
        onChange={formik.handleChange}
      />
      <Button secondary onClick={() => formik.handleSubmit()} type='submit'>
        Search & Plant Trees
      </Button>
    </S.Filter>
  );
}
