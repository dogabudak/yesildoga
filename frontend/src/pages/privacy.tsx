import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px 80px;
  line-height: 1.7;
  color: #333;

  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    color: #111;
  }

  h2 {
    font-size: 1.3rem;
    margin-top: 36px;
    margin-bottom: 12px;
    color: #111;
  }

  p,
  li {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  ul {
    padding-left: 24px;
    margin-bottom: 16px;
  }

  a {
    color: #0c9346;
    text-decoration: underline;
  }

  .last-updated {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 32px;
  }
`;

export default function PrivacyPolicy(): JSX.Element {
  return (
    <>
      <Head>
        <title>Privacy Policy - YesilDoga Green Score</title>
        <meta
          property='og:title'
          content='Privacy Policy - YesilDoga Green Score'
        />
      </Head>
      <Container>
        <h1>Privacy Policy</h1>
        <p className='last-updated'>Last updated: March 27, 2026</p>

        <p>
          YesilDoga Green Score (&quot;we&quot;, &quot;our&quot;, or &quot;the
          extension&quot;) is a Chrome browser extension that displays
          sustainability and environmental data about the websites you visit. We
          are committed to protecting your privacy.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          <strong>We do not collect any personal information.</strong>
        </p>
        <p>
          When you visit a website, the extension reads the domain name of the
          current tab (e.g., &quot;example.com&quot;) and sends it to our API to
          look up publicly available sustainability data about that company.
          That is the only data transmitted.
        </p>
        <p>We do not collect, store, or transmit:</p>
        <ul>
          <li>Your browsing history</li>
          <li>Page content or URLs beyond the domain name</li>
          <li>Cookies or authentication tokens</li>
          <li>Personal information (name, email, IP address, location)</li>
          <li>Form data or user input on any website</li>
          <li>Any data that could identify you personally</li>
        </ul>

        <h2>2. Local Storage</h2>
        <p>
          The extension caches company sustainability data locally on your
          device using the Chrome Storage API. This cache is used solely to
          reduce repeated API calls and improve performance. Cached data
          expires after 24 hours and is never transmitted to any third party.
        </p>

        <h2>3. API Communication</h2>
        <p>
          The extension communicates with our backend API hosted at{' '}
          <strong>yesildoga-api.onrender.com</strong> exclusively to retrieve
          publicly available company sustainability information. The only data
          sent in each request is the domain name of the website you are
          currently visiting. Our API does not log IP addresses or track
          individual users.
        </p>

        <h2>4. Permissions</h2>
        <p>The extension requests the following browser permissions:</p>
        <ul>
          <li>
            <strong>activeTab</strong> — to read the domain of the website in
            the currently active tab
          </li>
          <li>
            <strong>tabs</strong> — to detect when you navigate to a new page
            and update the sustainability score
          </li>
          <li>
            <strong>storage</strong> — to cache company data locally for
            performance
          </li>
        </ul>

        <h2>5. Third-Party Services</h2>
        <p>
          We do not use any analytics, advertising, or tracking services. We do
          not share any data with third parties. The sustainability data
          displayed by the extension is sourced from publicly available company
          reports and environmental disclosures.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          Since we do not collect personal data, there is nothing to retain.
          Locally cached sustainability data on your device is automatically
          cleared after 24 hours or when you uninstall the extension.
        </p>

        <h2>7. Children&apos;s Privacy</h2>
        <p>
          The extension does not knowingly collect any information from anyone,
          including children under the age of 13.
        </p>

        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will
          be reflected on this page with an updated date. Continued use of the
          extension after changes constitutes acceptance of the revised policy.
        </p>

        <h2>9. Contact</h2>
        <p>
          If you have questions about this privacy policy, contact us at:{' '}
          <a href='mailto:dogabudak@gmail.com'>dogabudak@gmail.com</a>
        </p>
      </Container>
    </>
  );
}
