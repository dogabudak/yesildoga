import React from 'react';
import * as S from './Tile.styled';

export interface AbsenceTileProps {
  absence: any;
  className?: string;
  id?: string;
}

export function Tile({ absence, className, id }: AbsenceTileProps): JSX.Element {
  console.log(absence);

  return (
    <S.Tile className={className} id={id} data-testid='absence'>
      Tile
    </S.Tile>
  );
}
