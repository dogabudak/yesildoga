import styled from 'styled-components';
import type { ReactNode } from 'react';

type BadgeStyledProps = {
  children?: ReactNode;
};

export const Badge = styled.div<BadgeStyledProps>`
  background-color: rgba(196, 196, 196, 0.5);
  border: #c4c4c4 1px solid;
  border-radius: 4px;
  display: inline-block;
  padding: 6px 8px;
`;
