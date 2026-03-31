import styled, { css } from 'styled-components';
import { untilTablet, untilMobile } from 'src/style/helpers/mixins/mediaQueries';

export const Hero = styled.div<{ backgroundImage: string }>`
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 70vh;
  position: relative;

  ${untilMobile(css`
    min-height: 50vh;
  `)}
`;

export const HeroOverlay = styled.div`
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const HeroContent = styled.div`
  color: #fff;
  max-width: 720px;
  padding: 40px 48px 48px;
  position: relative;
  z-index: 1;

  ${untilTablet(css`
    padding: 32px 24px 36px;
  `)}
`;

export const HeroTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 12px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);

  ${untilMobile(css`
    font-size: 2rem;
  `)}
`;

export const HeroDescription = styled.p`
  font-size: 1.15rem;
  line-height: 1.6;
  max-width: 520px;
  opacity: 0.92;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);

  ${untilMobile(css`
    font-size: 1rem;
  `)}
`;

export const ProjectSection = styled.div<{ isVisible: boolean }>`
  background: #fff;
  max-height: ${({ isVisible }) => (isVisible ? '2000px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

export const ProjectInner = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 40px 24px;
`;

export const HeroButtons = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
`;

export const DiscoverButton = styled.button<{ accentColor: string }>`
  background: ${({ accentColor }) => accentColor};
  border: none;
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 32px;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export const ChromeStoreButton = styled.a`
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  gap: 8px;
  padding: 10px 28px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }
`;

export const ChromeIcon = styled.img`
  height: 20px;
  width: 20px;
`;
