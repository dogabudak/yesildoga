import React from 'react';
import {
  FooterContainer,
  FooterGrid,
  FooterHeading,
  FooterLinks,
  FooterLinkItem,
  FooterSocialIcons,
  FooterCopyright,
} from './Footer.styled';

export function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <FooterGrid>
        <div>
          <FooterHeading>About Us</FooterHeading>
          <p>
            At yesildoga, every dollar we earn is dedicated entirely to the impactful projects we
            proudly share with you. Our mission is to create change by transparently funding
            initiatives that matter. Together, we transform support into meaningful action for a
            better future.
          </p>
        </div>
        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <FooterLinkItem>
              <a href='/about'>About</a>
            </FooterLinkItem>
            <FooterLinkItem>
              <a href='/progress'>Progress</a>
            </FooterLinkItem>
          </FooterLinks>
        </div>
        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <p>Email: dogabudak@gmail.com</p>
          <p>Phone: +49 176 432 27 537</p>
          <FooterSocialIcons>
            <a href='#'> {/* Add your social icon */} </a>
            <a href='#'> {/* Add your social icon */} </a>
          </FooterSocialIcons>
        </div>
      </FooterGrid>

      <FooterCopyright>&copy; Piarka All rights reserved.</FooterCopyright>
    </FooterContainer>
  );
}
