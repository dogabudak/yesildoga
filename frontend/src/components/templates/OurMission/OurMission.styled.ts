import styled, { css } from 'styled-components';
import { untilTablet, untilMobile } from 'src/style/helpers/mixins/mediaQueries';

export const Section = styled.section`
  background: #f5f9f5;
  padding: 80px 20px;
`;

export const Inner = styled.div`
  margin: 0 auto;
  max-width: 1080px;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2.4rem;
  margin-bottom: 16px;
  text-align: center;

  ${untilMobile(css`
    font-size: 1.8rem;
  `)}
`;

export const Subtitle = styled.p`
  color: #555;
  font-size: 1.15rem;
  line-height: 1.7;
  margin: 0 auto 24px;
  max-width: 720px;
  text-align: center;

  ${untilMobile(css`
    font-size: 1rem;
  `)}
`;

export const Highlight = styled.span`
  color: #0c9346;
  font-weight: bold;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 2px solid #0c934620;
  margin: 40px auto 48px;
  width: 60px;
`;

export const CategoriesGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);

  ${untilTablet(css`
    grid-template-columns: repeat(2, 1fr);
  `)}

  ${untilMobile(css`
    grid-template-columns: 1fr;
    gap: 16px;
  `)}
`;

export const CategoryCard = styled.div<{ accentColor: string }>`
  background: #fff;
  border-left: 4px solid ${({ accentColor }) => accentColor};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
`;

export const CategoryIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 12px;
`;

export const CategoryName = styled.h3`
  color: #333;
  font-size: 1.05rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const CategoryDescription = styled.p`
  color: #666;
  font-size: 0.88rem;
  line-height: 1.5;
`;

export const TransparencyBanner = styled.div`
  align-items: center;
  background: #fff;
  border: 2px solid #0c9346;
  border-radius: 12px;
  display: flex;
  gap: 20px;
  margin-top: 48px;
  padding: 28px 32px;

  ${untilTablet(css`
    flex-direction: column;
    text-align: center;
    padding: 24px 20px;
  `)}
`;

export const BannerIcon = styled.div`
  flex-shrink: 0;
  font-size: 2.4rem;
`;

export const BannerContent = styled.div`
  flex: 1;
`;

export const BannerTitle = styled.h4`
  color: #333;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 6px;
`;

export const BannerText = styled.p`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
`;
