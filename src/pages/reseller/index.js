import React from "react";
import PageHead from "../../components/page-head";
import { aboutpics } from "../../constants/index";
import { GrTechnology } from "react-icons/gr";
import { MdConveyorBelt, MdOutlineAutoGraph } from "react-icons/md";

function Reseller() {
  return (
    <div>
      <PageHead title="Reseller" />
      <div className="container py-12 mx-auto">
        {/* <!-- About Section Start --> */}
        <section className="about-one about-one--page pb-4 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="about-one__left wow slideInLeft bg-green-700/10"
                  data-wow-duration="1500ms"
                  data-wow-delay="300ms"
                >
                  <div className="about-one__thumb not__copy relative">
                    <div className="about-one__thumb__item">
                      <img src={aboutpics["about1.png"]} alt="about pic" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-one__right">
                  <div className="about-one__top">
                    <div
                      className="sec-title wow fadeInUp"
                      data-wow-duration="1500ms"
                      data-wow-delay="000ms"
                    >
                      <h6 className="sec-title__tagline text-[22px] font-semibold mb-2 bg-[var(--common-green)] text-white w-fit p-2">
                        Community
                      </h6>
                      <h3 className="sec-title__title about__sec text-[var(--common-green)]">
                        Our Business Model
                      </h3>
                    </div>
                    <p className="about-one__top__text">
                      At the core of Stellar business model lies
                      a decentralized distribution and Franchise model, designed
                      to both ensure access to our quality dairy products and
                      serve as a source of income to local entrepreneurs. We
                      foster a B2B2C channel to reduce time to customers and
                      empower mostly women to earn a living.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About Section End --> */}

        {/* <!-- About Section Start --> */}
        <section
          className="about-one about-one--page pt-4"
          style={{ backgroundColor: "#f7f6f2" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-one__right">
                  <div className="about-one__top">
                    <div
                      className="sec-title wow fadeInUp copy__about"
                      data-wow-duration="1500ms"
                      data-wow-delay="000ms"
                    >
                      <h6 className="sec-title__tagline text-[22px] font-semibold mb-2 bg-[var(--common-green)] text-white w-fit p-2">
                        Software
                      </h6>
                      <h3 className="sec-title__title about__sec text-[var(--common-green)]">
                        Monitor your business online.
                      </h3>
                    </div>
                    <p className="about-one__top__text pr-30">
                      Our core value proposition is to promote a business – in –
                      a –box for our entrepreneurs to be able to provide safe,
                      healthy, delicious and packaged dairy products that is
                      affordable. So our core proposition can be split into two:
                      the model (Businesses = entrepreneurs) and the end product
                      (clients= consumers.).Through the use of technology
                      stellar is promoting a B2B2C business model, empowering
                      business to earn an extra income by distributing Stellar.
                    </p>
                  </div>

                  {/* <!-- /.skills-item --> */}
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="about-one__left wow slideInLeft"
                  data-wow-duration="1500ms"
                  data-wow-delay="300ms"
                >
                  <div className="about-one__thumb copy__about">
                    <div className="about h-64 ml-16">
                      <img
                        src={aboutpics["dash.png"]}
                        alt="about pic"
                        className="h-full min-h-54 aspect-video w-54 object-fill"
                      />
                    </div>
                  </div>
                  {/* <div className="about-one__funfact__item count-box">
                    <h2 className="about-one__funfact__item__count">
                      <span
                        className="count-text"
                        data-stop="30"
                        data-speed="1500"
                      ></span>
                      <span>20</span>
                    </h2>
                    <p className="about-one__funfact__item__text">
                      And More Distros.
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About Section End --> */}

        {/* <!-- About Section Start --> */}
        <section className="about-one about-one--page pb-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="about-one__left wow slideInLeft bg-green-700/10"
                  data-wow-duration="1500ms"
                  data-wow-delay="300ms"
                >
                  <div className="about-one__thumb not__copy">
                    <div className="about-one__thumb__item">
                      <img
                        src={aboutpics["pasteurizer.jpeg"]}
                        alt="about pic"
                      />
                    </div>
                    {/* <div className="about-one__thumb__item about-one__thumb__item--two">
                      <img src={aboutpics["about3.png"]} alt="about pic" />
                    </div> */}
                  </div>
                  {/* <div className="about-one__funfact__item count-box">
                    <h2 className="about-one__funfact__item__count">
                      <span
                        className="count-text"
                        data-stop="10"
                        data-speed="1500"
                      ></span>
                      <span></span>
                    </h2>
                    <p className="about-one__funfact__item__text">Innovative</p>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-one__right">
                  <div className="about-one__top">
                    <div
                      className="sec-title wow fadeInUp"
                      data-wow-duration="1500ms"
                      data-wow-delay="000ms"
                    >
                      <h6 className="sec-title__tagline text-[22px] font-semibold mb-2 bg-[var(--common-green)] text-white w-fit p-2">
                        Innovative Technologies
                      </h6>
                      <h3 className="sec-title__title about__sec text-[var(--common-green)]">
                        Powering Stellar Dairy Land
                      </h3>
                    </div>
                    <p className="about-one__top__text">
                      At Stellar Dairy Land, we are committed to staying at the
                      forefront of technology to enhance every aspect of our
                      business, from production to distribution to customer
                      experience.
                    </p>
                  </div>

                  {/* <!-- /.skills-item --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About Section End --> */}
      </div>
    </div>
  );
}

export default Reseller;
