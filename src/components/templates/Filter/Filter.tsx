// @ts-nocheck
import React from 'react';
import { Button } from '@atoms/Button/Button';
import { ToArray } from '@helpers/enumToArray';
import { buildFilters } from '@helpers/filterBuilder';
import { Select } from '@molecules/Select/Select';
import { Donations } from '@type/Donations';
import type { Filters, FormikFilters, QueryFilters } from '@type/Filter.type';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as S from './Filter.styled';
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
