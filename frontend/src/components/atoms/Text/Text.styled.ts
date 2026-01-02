import styled from 'styled-components';
import type { TextProps } from 'src/components/atoms/Text/Text';

type TextStyledProps = {
  textStyle: TextProps['style'];
  textWeight: TextProps['weight'];
  children: TextProps['children'];
  className?: string;
};

export const Text = styled.p<TextStyledProps>`
  font-family: 'PT Sans', sans-serif;
  font-style: ${({ textStyle }) => textStyle};
  font-weight: ${({ textWeight }) => textWeight};
`;
