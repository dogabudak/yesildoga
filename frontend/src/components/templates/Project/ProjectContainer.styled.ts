import styled from 'styled-components';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export const ProjectContainer = styled.div<{ isVisible: boolean; children?: ReactNode }>`
  max-height: ${({ isVisible }) => (isVisible ? '50vh' : '0')};
  overflow-y: auto;
  transition: max-height 1s ease;
`; 

export const DiscoverButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  background: #fff;
  color: #24493e;
  padding: 16px 40px;
  border: none;
  border-radius: 999px;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 400;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(36, 73, 62, 0.08);

  &:hover {
    box-shadow: 0 4px 16px rgba(36, 73, 62, 0.18);
    transform: scale(1.03);
  }
`;