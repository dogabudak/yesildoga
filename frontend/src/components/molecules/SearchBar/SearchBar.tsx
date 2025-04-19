import * as S from 'src/components/molecules/SearchBar/SearchBar.styled';
import { useState } from 'react'; // Import useState to manage input state

export const SearchBar = ({ goalId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch('/goal/increase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
  };

  return (
    <S.SearchBarContainer>
      <S.SearchInput
        type='text'
        placeholder='Search for a cause...'
        value={searchQuery}
        onChange={(e: any) => setSearchQuery(e.target.value)}
      />
      <S.SearchButton onClick={handleSearch}>Search</S.SearchButton>
    </S.SearchBarContainer>
  );
};
