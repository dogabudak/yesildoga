import * as S from './SearchBar.styled';

export const SearchBar = () => (
  <S.SearchBarContainer>
    <S.SearchInput type='text' placeholder='Search for a cause...' />
    <S.SearchButton>Search</S.SearchButton>
  </S.SearchBarContainer>
);
