import { Text } from '../../atoms/Text/Text';
import styled from 'styled-components';

export const Filter = styled.div`
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 16px;
`;

export const Header = styled(Text)`
  font-size: 24px;
`;

export const Divider = styled.hr`
  width: 100%;
`;
