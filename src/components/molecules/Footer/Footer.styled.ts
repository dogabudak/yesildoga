import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

export const FooterGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FooterLinkItem = styled.li`
  margin-bottom: 8px;

  a {
    color: #bbb;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #fff;
    }
  }
`;

export const FooterSocialIcons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;

  a {
    color: #bbb;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #fff;
    }
  }
`;

export const FooterCopyright = styled.div`
  color: #999;
  font-size: 0.9rem;
  margin-top: 20px;
`;
