import { useCallback, useState } from 'react';
import styled from 'styled-components';

import Button from './Button.tsx';

const currentYear = new Date().getFullYear();

interface AboutProps {
  setVisible: (show: boolean) => void;
}

export default function About({ setVisible }: AboutProps) {
  const official = window.location.hostname === 'pastes.dev';
  const [notice, setNotice] = useState<'tos' | 'privacy' | null>(null);

  const closeNotice = useCallback(() => {
    setNotice(null);
  }, [setNotice]);

  const closeAbout = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  if (notice == 'tos') {
    return <Tos close={closeNotice} />;
  } else if (notice == 'privacy') {
    return <Privacy close={closeNotice} />;
  }

  return (
    <AboutPanel>
      <CloseButton callback={closeAbout} />
      <BannerContainer>
        <Banner>{'{paste}'}</Banner>
      </BannerContainer>
      <p>
        <b>paste is a simple web app for writing & sharing code</b>. It's a
        different take on conventional pastebin sites like pastebin.com or
        hastebin.
      </p>
      {official && (
        <>
          <p>
            <b>pastes.dev</b> is the official, publicly accessible paste
            instance, and can be used by anyone, subject to the{' '}
            <a
              href="#"
              onClick={e => {
                setNotice('tos');
                e.preventDefault();
              }}
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              onClick={e => {
                setNotice('privacy');
                e.preventDefault();
              }}
            >
              Privacy Policy
            </a>
            .
          </p>
          <p>
            To access pastes.dev programmatically, please use the{' '}
            <a
              href="https://github.com/lucko/paste/blob/master/API.md"
              target="_blank"
            >
              API
            </a>
            . :)
          </p>
          <p>
            Please{' '}
            <b>
              <a href="mailto:report-abuse@pastes.dev" target="_blank">
                report
              </a>
            </b>{' '}
            illegal, malicious, or abusive content so it can be removed.
          </p>
        </>
      )}
      <p style={{ textAlign: 'center' }}>
        <a href="https://github.com/lucko/paste" target="_blank">
          paste
        </a>{' '}
        is free & open source on GitHub.
        <br />
        Copyright &copy; 2021-{currentYear}{' '}
        <a href="https://github.com/lucko" target="_blank">
          lucko
        </a>{' '}
        & other paste{' '}
        <a
          href="https://github.com/lucko/paste/graphs/contributors"
          target="_blank"
        >
          contributors
        </a>
        .
      </p>
    </AboutPanel>
  );
}

const Tos = ({ close }: { close: () => void }) => {
  return (
    <AboutPanel>
      <CloseButton callback={close} />
      <h1>Terms of Service</h1>
      <p>
        <em>Last updated: 30 October 2026</em>
      </p>
      <p>
        Welcome to pastes.dev. By using this service, you agree to the following
        terms:
      </p>
      <ol>
        <li>
          <b>No Illegal Use:</b> You may not use pastes.dev to share, store, or
          distribute any content that is illegal, harmful, or violates any laws
          or regulations.
        </li>
        <li>
          <b>No Malicious Content:</b> Do not upload or share content intended
          to harm others, including but not limited to malware or phishing
          links.
        </li>
        <li>
          <b>No Personal Data:</b> Do not upload personal data about other
          people, or secrets such as passwords, API keys or tokens. Pastes can
          be viewed by anyone with the link, and may be copied or cached by
          others before they expire.
        </li>
        <li>
          <b>Content Responsibility:</b> You are solely responsible for the
          content you post. We do not review content and are not liable for what
          users choose to share.
        </li>
        <li>
          <b>Moderation:</b> We reserve the right to remove any content at our
          discretion, and to restrict or terminate access to the service for
          abuse or violations of these terms.
        </li>
        <li>
          <b>No Liability:</b> This service is provided "as is" with no
          warranties. We do not guarantee uptime, data retention, or
          availability.
        </li>
      </ol>
      <p>
        By using pastes.dev, you accept these terms. If you do not agree, please
        do not use the service.
      </p>
      <h2>Reporting Abuse</h2>
      <p>
        If you encounter content that violates these terms, please report it by
        email to{' '}
        <a href="mailto:report-abuse@pastes.dev" target="_blank">
          report-abuse@pastes.dev
        </a>{' '}
        so that it can be removed.
      </p>
    </AboutPanel>
  );
};

const Privacy = ({ close }: { close: () => void }) => {
  return (
    <AboutPanel>
      <CloseButton callback={close} />
      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: 30 October 2026</em>
      </p>
      <h2>What We Process</h2>
      <ul>
        <li>
          <b>Pastes:</b> Content you upload. <b>Pastes are public.</b> Anyone
          with the link can view or download them. Do not upload personal data
          or secrets (passwords, tokens).
        </li>
        <li>
          <b>Request Logs:</b> Technical data (IP address, user agent,
          timestamps) processed for security, rate-limiting, and abuse
          prevention.
        </li>
      </ul>
      <h2>Service Providers</h2>
      <p>
        We use third-party hosting, storage, and CDN providers in Germany, the
        Netherlands, and globally, relying on GDPR-compliant safeguards (e.g.,
        Standard Contractual Clauses) for international transfers. We do not
        sell your data or use it for advertising.
      </p>
      <h2>Retention</h2>
      <p>
        Pastes are automatically deleted after a limited period (currently up to
        180 days for web pastes; 30 days for API pastes). Logs are kept only as
        necessary. We cannot recall third-party cached copies.
      </p>
      <h2>Your Rights</h2>
      <p>
        Under UK/EU GDPR, processing is based on our legitimate interests in
        securing and delivering the service. You may have rights to access,
        delete, or object to processing. To request removal or exercise rights,{' '}
        <a href="mailto:report-abuse@pastes.dev" target="_blank">
          contact us
        </a>{' '}
        with the paste link. We may update this policy by publishing a revised
        version.
      </p>
    </AboutPanel>
  );
};

const CloseButton = ({ callback }: { callback: () => void }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
      }}
    >
      <Button style={{ padding: '5px' }} onClick={callback}>
        [X]
      </Button>
    </div>
  );
};

const AboutPanel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  padding: 10px;
  max-width: 650px;
  max-height: 100vh;
  overflow-y: auto;

  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.secondary};

  span {
    color: ${props => props.theme.logo};
  }

  a {
    color: ${props => props.theme.logo};
  }
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Banner = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.logo};
  border-radius: 20px;
  font-size: 70px;
  letter-spacing: -5px;
  padding: 10px;
  font-weight: bold;
`;
