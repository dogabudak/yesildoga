import { colors } from 'src/style/colors';
import styled from 'styled-components';

export const ImageBadge = styled.div`
  background-color: ${colors.primary};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  color: white;
  display: inline-block;
  padding: 8px 32px 8px 8px;
`;
