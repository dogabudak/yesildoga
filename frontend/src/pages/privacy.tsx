import React from 'react';
import styled from 'styled-components';

import { Seo } from 'src/components/atoms/Seo/Seo';

/*
 * Kept deliberately close to what the code actually does — every claim here is
 * checkable against `yesil-ext/` and `backend/`. When the extension's data flows
 * change, this page changes in the same PR; a privacy policy that drifts from the
 * code is worse than none, and this URL is the one submitted to the Chrome Web
 * Store (see yesil-ext/STORE_SUBMISSION.md).
 */

const CONTACT_EMAIL = 'dogabudak@gmail.com';

/*
 * KVKK Art. 10 requires the data controller to be identifiable. Replace with the
 * registered entity name if YeşilDoğa is ever incorporated.
 */
const CONTROLLER = 'YeşilDoğa, operated by Doğa Budak';

const LAST_UPDATED = 'September 11, 2026';

const Container = styled.main`
  color: #333;
  line-height: 1.7;
  margin-inline: auto;
  max-inline-size: 800px;
  padding-block: 60px 80px;
  padding-inline: 24px;

  h1 {
    color: #111;
    font-size: 2rem;
    margin-block-end: 8px;
  }

  h2 {
    color: #111;
    font-size: 1.3rem;
    margin-block: 36px 12px;
  }

  h3 {
    color: #111;
    font-size: 1.05rem;
    margin-block: 24px 8px;
  }

  p,
  li {
    font-size: 1rem;
    margin-block-end: 12px;
  }

  ul {
    margin-block-end: 16px;
    padding-inline-start: 24px;
  }

  a {
    color: #0c9346;
    text-decoration: underline;
  }

  .last-updated {
    color: #666;
    font-size: 0.9rem;
    margin-block-end: 32px;
  }
`;

const TableWrapper = styled.div`
  margin-block-end: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.95rem;
  inline-size: 100%;
  min-inline-size: 480px;

  th,
  td {
    border: 1px solid #e0e0e0;
    padding: 10px 12px;
    text-align: start;
    vertical-align: top;
  }

  th {
    background: #f7f7f7;
    font-weight: 700;
  }
`;

export default function PrivacyPolicy(): JSX.Element {
  return (
    <>
      <Seo
        title='Privacy Policy - YesilDoga Green Score'
        description='How the YeşilDoğa Green Score extension and website handle your data: no visit tracking, no advertising, no analytics, and an optional account you control.'
        path='/privacy'
      />
      <Container>
        <h1>Privacy Policy</h1>
        <p className='last-updated'>Last updated: {LAST_UPDATED}</p>

        <p>
          YeşilDoğa Green Score (&quot;we&quot;, &quot;our&quot;, or &quot;the
          extension&quot;) is a Chrome browser extension that shows
          sustainability and environmental data about the companies behind the
          websites you visit. This policy explains exactly what the extension
          and the website at yesildoga.onrender.com do with data.
        </p>
        <p>
          We do not run analytics, advertising, or tracking of any kind, and we
          never sell data. The sections below describe the data that
          <em> is </em> handled, so that this page matches the software rather
          than flattering it.
        </p>

        <h2>1. Data Controller</h2>
        <p>
          The data controller (<em>veri sorumlusu</em>) for the purposes of the
          Turkish Personal Data Protection Law (KVKK, Law No. 6698) and the
          GDPR is {CONTROLLER}, reachable at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>2. What We Handle, and Why</h2>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Why</th>
                <th>Where it goes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Domain name of the active tab (e.g. &quot;example.com&quot;)</td>
                <td>To look up public sustainability data for that company</td>
                <td>Our API. Never the full URL, page content, or form input</td>
              </tr>
              <tr>
                <td>Email address and password (only if you create an account)</td>
                <td>To create and sign you in to an optional account</td>
                <td>Supabase, our authentication and database provider</td>
              </tr>
              <tr>
                <td>Session tokens</td>
                <td>To keep you signed in between uses</td>
                <td>Stored on your device only</td>
              </tr>
              <tr>
                <td>Your chosen campaign and interface language</td>
                <td>To theme the extension and show it in your language</td>
                <td>Chrome storage on your device (see section 5)</td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
        <p>We do not collect, store, or transmit:</p>
        <ul>
          <li>Your browsing history</li>
          <li>Page content, URLs beyond the domain name, or form input</li>
          <li>Your location, or any advertising or device identifier</li>
          <li>Anything at all from websites you visit while signed out, beyond the domain name</li>
        </ul>

        <h2>3. The Optional Account</h2>
        <p>
          The extension can be used entirely without an account, and this is the
          default. Company lookups do not require signing in.
        </p>
        <p>
          If you do create an account, we collect your <strong>email address</strong>{' '}
          and a password. Passwords are never stored by us in readable form —
          authentication is handled by Supabase (GoTrue), which stores a hash.
          A profile record is created holding your email, a display name derived
          from it, and your preferences.
        </p>
        <p>
          After signing in, an access token and a refresh token are stored in
          Chrome&apos;s local extension storage on your device so that you stay
          signed in. Signing out deletes them from your device and revokes the
          session on the server.
        </p>

        <h2>4. Failed Lookups Are Recorded</h2>
        <p>
          When you visit a site we have no data for, that domain is recorded on
          our server together with a counter of how many times it has been
          requested. This is how we decide which companies to research next.
        </p>
        <p>
          These records contain <strong>only the domain and a count</strong>.
          They are not linked to you, to an account, to an IP address, or to any
          other request, and they cannot be used to reconstruct one person&apos;s
          browsing. Domains that we already have data for are not recorded at
          all.
        </p>

        <h2>5. Storage on Your Device</h2>
        <p>The extension uses Chrome&apos;s storage APIs:</p>
        <ul>
          <li>
            <strong>Local storage</strong> — company and campaign data cached to
            avoid repeat API calls (company data expires after 24 hours), your
            interface language, and session tokens if you are signed in. This
            never leaves your device.
          </li>
          <li>
            <strong>Synced storage</strong> — your selected campaign and overlay
            preference. Chrome syncs these across devices where you are signed
            in to Chrome, which means they pass through your Google account.
            They contain no personal data beyond the preference itself.
          </li>
        </ul>
        <p>Uninstalling the extension removes all of it.</p>

        <h2>6. Server Logs</h2>
        <p>
          Our application logs record the request method, path, response status
          and duration. Because the path of a lookup contains the domain being
          looked up, domains appear in those logs. They do not contain your IP
          address, and we do not build profiles from them.
        </p>
        <p>
          Our hosting providers operate their own infrastructure logs, which do
          record IP addresses as a normal part of serving traffic. We do not
          control the contents of those logs, and we do not use them to identify
          users.
        </p>

        <h2>7. Processors and International Transfers</h2>
        <p>
          We do not sell or share your data with third parties for their own
          purposes. We do rely on service providers who process data on our
          behalf:
        </p>
        <ul>
          <li>
            <strong>Render</strong> — hosts the API and this website. Our
            services run in Render&apos;s Frankfurt (EU) region.
          </li>
          <li>
            <strong>Supabase</strong> — provides the database and, if you create
            an account, authentication.
          </li>
        </ul>
        <p>
          These providers may process data outside Türkiye. Where that happens,
          it is done on the basis of your explicit consent under KVKK Art. 9, or
          under the applicable safeguards for international transfers.
        </p>

        <h2>8. Legal Basis for Processing</h2>
        <ul>
          <li>
            <strong>Domain lookups</strong> — necessary to provide the service
            you asked for by installing the extension.
          </li>
          <li>
            <strong>Account data</strong> — your explicit consent
            (<em>açık rıza</em>), given by choosing to create an account. You may
            withdraw it at any time by deleting your account, and withdrawing it
            does not affect your ability to use the rest of the extension.
          </li>
        </ul>

        <h2>9. Retention and Deletion</h2>
        <ul>
          <li>
            <strong>Cached data on your device</strong> — 24 hours for company
            data, or until you uninstall.
          </li>
          <li>
            <strong>Account data</strong> — kept until you ask us to delete it.
          </li>
          <li>
            <strong>Failed-lookup records</strong> — kept until the company is
            added to our database. They contain no personal data.
          </li>
        </ul>
        <p>
          To delete your account and everything attached to it, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the
          address you signed up with. We action deletion requests within 30 days.
        </p>

        <h2>10. Your Rights</h2>
        <p>
          Under KVKK Art. 11 and the GDPR you have the right to learn whether
          your personal data is being processed, to request access to it and
          information about how it is used, to have inaccurate data corrected,
          to request erasure, to object to processing, and to request that any
          correction or erasure be communicated to third parties the data was
          transferred to.
        </p>
        <p>
          Exercise any of these by emailing{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We respond
          within 30 days. If you are not satisfied, you may lodge a complaint
          with the Turkish Personal Data Protection Authority (KVKK Kurumu) or
          your local supervisory authority.
        </p>

        <h2>11. Browser Permissions</h2>
        <p>The extension requests the following permissions:</p>
        <ul>
          <li>
            <strong>activeTab</strong> — to read the domain of the site in the
            active tab
          </li>
          <li>
            <strong>tabs</strong> — to notice when you navigate so the score can
            update
          </li>
          <li>
            <strong>storage</strong> — to cache data and remember preferences,
            as described in section 5
          </li>
          <li>
            <strong>access to all websites</strong> — the extension is meant to
            work on any site you visit, so it must be able to run there. It uses
            this only to read the domain and display the overlay; it does not
            read page content
          </li>
        </ul>

        <h2>12. Children&apos;s Privacy</h2>
        <p>
          The extension is not directed at children and we do not knowingly
          collect data from anyone under 13.
        </p>

        <h2>13. Changes to This Policy</h2>
        <p>
          We may update this policy. Material changes will be reflected here with
          a new date at the top, and where the change concerns data we process
          on the basis of your consent, we will ask for it again rather than
          assume it.
        </p>

        <h2>14. Contact</h2>
        <p>
          Questions about this policy or about your data:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </Container>
    </>
  );
}
