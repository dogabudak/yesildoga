import styled from 'styled-components';

export const ButtonLink = styled.a<{ accentColor: string }>`
  align-items: center;
  background: ${({ accentColor }) => accentColor};
  border: none;
  border-radius: 999px;
  color: #fff;
  display: inline-flex;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  gap: 8px;
  justify-content: center;
  padding: 14px 36px;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;
