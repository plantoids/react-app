import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__inner">
          <div>
            <img src="./assets/logo-footer.svg" alt="plantoids logo" />
          </div>
          <div>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.plantoids.io/"
            >
              Whitepaper
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/PlantoidsNFT"
            >
              <img src="./assets/Twitter logo blue.svg" alt="twitter" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/uMTaKMaszq"
            >
              <img src="./assets/Discord-Logo-Color.svg" alt="discord" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
