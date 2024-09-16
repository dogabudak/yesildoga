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
            We are dedicated to providing excellent services to our customers. Stay updated by
            following us on social media.
          </p>
        </div>
        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks>
            <FooterLinkItem>
              <a href='#'>Home</a>
            </FooterLinkItem>
            <FooterLinkItem>
              <a href='#'>About</a>
            </FooterLinkItem>
            <FooterLinkItem>
              <a href='#'>Services</a>
            </FooterLinkItem>
            <FooterLinkItem>
              <a href='#'>Contact</a>
            </FooterLinkItem>
          </FooterLinks>
        </div>
        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <p>Email: contact@example.com</p>
          <p>Phone: +123 456 7890</p>
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
