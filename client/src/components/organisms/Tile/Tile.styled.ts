import { ImageBadge as ImageBadgeComp } from '../../atoms/ImageBadge/ImageBadge';
import { Text } from '../../atoms/Text/Text';
import styled from 'styled-components';

export const Tile = styled.div`
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  padding: 8px 16px;
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  position: relative;
`;

export const Image = styled.img`
  border-radius: 16px;
  max-height: 200px;
  width: auto;
`;

export const ImageBadge = styled(ImageBadgeComp)`
  align-items: center;
  bottom: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: absolute;
  right: -16px;
`;

export const Header = styled(Text)`
  font-size: 22px;
  margin-bottom: 8px;
`;

export const Combined = styled.span`
  font-size: 10px;
`;

export const Actions = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

export const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;
