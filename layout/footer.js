import React from "react";
import wave from "../assets/wave.png";
import logo from "../assets/logo.png";
import { menu, contacts, socials } from "../constants/menu";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="relative text-white bg-bottom bg-no-repeat main-bg">
      {/* <img src={wave} alt="wave" className='absolute top-0 w-full h-full' /> */}
      <div className="container relative mx-auto">
        <div className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-2">
          <div>
            <img src={logo} alt="Stellar Dairies" className="h-20" />
            <p className="mt-5">
              At Stellar Dairyland, we strive to bring quality products by
              conducting our production at high standards of hygiene. In
              addition, our milk is sourced directly from local farmers and
              pasteurized by us. We use top-of-the-range culture and ingredients
              to ensure we have the best quality of products.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <h2 className="mb-3 font-semibold">Quick Links</h2>
              {menu.map((m, i) => (
                <div key={i} className="mb-1">
                  <Link to={`/` + m.link}>
                    <p>{m.label}</p>
                  </Link>
                </div>
              ))}
            </div>
            <div>
              <h2 className="mb-3 font-semibold">Contacts</h2>
              {contacts.map((s, i) => (
                <div key={i} className="flex items-center gap-3 mt-3">
                  {s.icon}
                  <p>{s.link}</p>
                </div>
              ))}

              <div className="flex gap-3 mt-5 text-orange-400">
                {socials.map((s, i) => (
                  <div key={i}>{s.icon}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 text-center border-t">
          <p>Copyright {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
