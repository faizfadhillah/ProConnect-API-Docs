import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Footer() {
  const logoWhite = useBaseUrl('/img/logo-white.svg');
  return (
    <footer className="pc-footer">
      <div className="pc-footer__container">
        {/* Left column — Logo + tagline + CTA + Google Play */}
        <div className="pc-footer__brand">
          <div className="pc-footer__logo-row">
            <img src={logoWhite} alt="ProConnect" className="pc-footer__logo" />
          </div>
          <p className="pc-footer__tagline">Connecting employers &amp; candidates</p>
          <div>
            <a
              href="https://proconnectcareer.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="pc-footer__cta"
            >
              Visit ProConnectCareer.com
            </a>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.proconnect"
            target="_blank"
            rel="noopener noreferrer"
            className="pc-footer__store-badge"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              height="40"
            />
          </a>
        </div>

        {/* Middle column — Contact */}
        <div className="pc-footer__section">
          <h3 className="pc-footer__heading">Contact</h3>
          <a href="mailto:cs@proconnectcareer.com" className="pc-footer__link">
            cs@proconnectcareer.com
          </a>
          <a
            href="https://www.proconnectcareer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pc-footer__link"
          >
            www.proconnectcareer.com
          </a>
        </div>

        {/* Right column — Location */}
        <div className="pc-footer__section">
          <h3 className="pc-footer__heading">Location</h3>
          <p className="pc-footer__address">
            Plaza Mutiara Building, 8th Floor<br />
            Jl. DR. Ide Anak Agung Gde Agung<br />
            Kav. E.1.2 No. 1-2 South Jakarta,<br />
            DKI Jakarta 12950, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
