import * as S from 'src/components/molecules/SearchBar/SearchBar.styled';
import { useState } from 'react';

export const SearchBar = ({ goalId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    try {
      const response = await fetch('/goal/increase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // TODO goal id should come from somewhere
        body: JSON.stringify({
          query: searchQuery,
          goalId: goalId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error calling the server:', error);
    }
    const query = encodeURIComponent(searchQuery);
    window.location.href = `/search?q=${query}`;
  };

  return (
      <S.SearchBarContainer>
        <S.SearchInput
            type='text'
            placeholder='Search and support good causes...'
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <S.SearchButton onClick={handleSearch}>Search</S.SearchButton>
      </S.SearchBarContainer>
  );
};
