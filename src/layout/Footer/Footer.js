import React from "react";
import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";
import footerlogo from "../../assets/logo.png";
import { bgpics } from "../../constants/index";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="main-footer">
      <div
        className="main-footer__bg"
        // style={backgroundImage: url(images/bg/up\ bg-01.png}
      ></div>
      <div className="main-footer__middle">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4">
              <div className="footer-widget footer-widget--about">
                <div className="main-footer__logo">
                  <a href="/" className="footer__logo voldor-logo">
                    <img
                      src={footerlogo}
                      width="130"
                      alt="voldor HTML Template"
                    />
                  </a>
                </div>
                <p className="footer-widget__text text-[20px] font-semibold italic">
                  Deliciously Healthy.
                </p>
                <div className="main-footer__social">
                  <a
                    rel="noreferrer noreopener"
                    target="_blank"
                    href="https://www.linkedin.com/company/stellar-dairyland/about/"
                  >
                    <FaLinkedin className="text-[var(--common-blue)]" />
                    <span className="sr-only">Linkedin</span>
                  </a>
                  <a
                    rel="noreferrer noreopener"
                    target="_blank"
                    href="https://www.instagram.com/stellardland?igsh=MWgxcWRzNXBsODU2aA=="
                  >
                    <FaInstagram className="text-[var(--common-blue)]" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    rel="noreferrer noreopener"
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61550280563075"
                  >
                    <FaFacebook className="text-[var(--common-blue)]" />
                    <span className="sr-only">Facebook</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="footer-widget footer-widget--links">
                <h2 className="footer-widget__title">Links</h2>
                <ul className="list-unstyled footer-widget__links">
                  <li className="footer-widget__links__item">
                    <a href="/about-us">About Us</a>
                  </li>
                  {/* <li className="footer-widget__links__item">
                    <a href="team.html">Meet Our Team</a>
                  </li> */}
                  <li className="footer-widget__links__item">
                    <a href="/products">Products</a>
                  </li>
                  <li className="footer-widget__links__item">
                    <a href="/reseller">Resellers</a>
                  </li>
                  <li className="footer-widget__links__item">
                    <a href="/">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="footer-widget footer-widget--contact">
                <h2 className="footer-widget__title">Contact</h2>
                <ul className="list-unstyled footer-widget__contact">
                  <li className="footer-widget__contact__item">
                    <div className="footer-widget__contact__icon">
                      <FaPhone />
                    </div>
                    <div className="footer-widget__contact__inner">
                      <a
                        href="tel:+254737653585"
                        className="footer-widget__contact__text"
                      >
                        +254 737 653585
                      </a>
                      {/* <a
                        href="tel:+21-9555-0114"
                        className="footer-widget__contact__text"
                      >
                        +21 9555-0114
                      </a> */}
                    </div>
                  </li>
                  <li className="footer-widget__contact__item">
                    <div className="footer-widget__contact__icon">
                      <FaMailBulk />
                    </div>
                    <div className="footer-widget__contact__inner">
                      <a
                        href="mailto:info@stellardairies.com"
                        className="footer-widget__contact__text"
                      >
                        info@stellardairies.com
                      </a>
                      <a href="/" className="footer-widget__contact__text">
                        www.stellardairies.com
                      </a>
                    </div>
                  </li>
                  <li className="footer-widget__contact__item">
                    <div className="footer-widget__contact__icon">
                      <FaLocationArrow />
                    </div>
                    <div className="footer-widget__contact__inner">
                      <p className="footer-widget__contact__text">
                        P.O BOX 8426-00200 <br />
                        Nairobi
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="footer-widget footer-widget--instagram">
                <h2 className="footer-widget__title">Gallery</h2>
                <div className="footer-widget__instagram">
                  <a href={bgpics["bg-02.jpg"]} className="img-popup">
                    <img src={bgpics["bg-02.jpg"]} alt="footer pic" />
                  </a>
                  <a href={bgpics["bg-04.jpg"]} className="img-popup">
                    <img src={bgpics["bg-04.jpg"]} alt="footer pic" />
                  </a>
                  <a href={bgpics["bg-05.jpg"]} className="img-popup">
                    <img src={bgpics["bg-05.jpg"]} alt="footer pic" />
                  </a>
                  <a href={bgpics["bg-06.jpg"]} className="img-popup">
                    <img src={bgpics["bg-06.jpg"]} alt="footer pic" />
                  </a>
                  <a href={bgpics["bg-07.jpg"]} className="img-popup">
                    <img src={bgpics["bg-07.jpg"]} alt="footer pic" />
                  </a>
                  <a href={bgpics["bg-08.jpg"]} className="img-popup">
                    <img src={bgpics["bg-08.jpg"]} alt="footer pic" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-footer__bottom">
        <div className="container">
          <div className="main-footer__bottom__inner">
            <p className="main-footer__copyright">
              &copy; Copyright <span className="dynamic-year"></span> Stellar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
