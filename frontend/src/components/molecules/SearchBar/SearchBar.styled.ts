import { colors } from 'src/style/colors';
import styled from 'styled-components';

interface SearchButtonProps {
  children: string;
  onClick: () => Promise<void> | void;
}
interface SearchInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBarContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 40px auto;
  max-width: 600px;
  width: 100%;
`;

export const SearchInput = styled.input.attrs<SearchInputProps>((props: SearchInputProps) => ({
  type: props.type || 'text',
  placeholder: props.placeholder || 'Search...',
}))<SearchInputProps>`
  border: 2px solid ${colors.primary};
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  padding: 12px 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 70%;

  &:focus {
    border-color: ${colors.secondary};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
`;

export const SearchButton = styled.button<SearchButtonProps>`
  background-color: ${colors.primary};
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 12px 24px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
