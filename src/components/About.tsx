import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Privacy from '../content/privacy.md';
import Tos from '../content/tos.md';
import Button from './Button.tsx';

const currentYear = new Date().getFullYear();

interface AboutProps {
  setVisible: (show: boolean) => void;
}

const notices = { tos: Tos, privacy: Privacy };
type NoticeKey = keyof typeof notices;

export default function About({ setVisible }: AboutProps) {
  const official = true || window.location.hostname === 'pastes.dev';
  const [notice, setNotice] = useState<NoticeKey | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (notice) {
        setNotice(null);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [notice, setVisible]);

  if (notice) {
    const Notice = notices[notice];
    return (
      <NoticePanel>
        <CloseButton callback={() => setNotice(null)} />
        <Notice />
      </NoticePanel>
    );
  }

  return (
    <AboutPanel>
      <CloseButton callback={() => setVisible(false)} />
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
            <NoticeLink to="tos" show={setNotice}>
              Terms of Service
            </NoticeLink>{' '}
            and{' '}
            <NoticeLink to="privacy" show={setNotice}>
              Privacy Policy
            </NoticeLink>
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
      <Footer>
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
      </Footer>
    </AboutPanel>
  );
}

const NoticeLink = ({
  to,
  show,
  children,
}: {
  to: NoticeKey;
  show: (notice: NoticeKey) => void;
  children: string;
}) => (
  <a
    href="#"
    onClick={e => {
      show(to);
      e.preventDefault();
    }}
  >
    {children}
  </a>
);

const CloseButton = ({ callback }: { callback: () => void }) => (
  <CloseButtonContainer>
    <CloseButtonInner onClick={callback}>[X]</CloseButtonInner>
  </CloseButtonContainer>
);

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const CloseButtonInner = styled(Button)`
  padding: 5px;
`;

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

const NoticePanel = styled(AboutPanel)`
  width: 900px;
  max-width: 100vw;
  max-height: 90vh;
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

const Footer = styled.p`
  text-align: center;
`;
