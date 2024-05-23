import React from "react";
import { bgpics } from "../../../constants/index";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaCartPlus, FaMailBulk, FaPhone, FaPlus } from "react-icons/fa";

function Faq() {
  const itemClasses = {
    base: "py-0 w-full m-0",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center bg-stone-100",
    indicator: "text-medium",
    content: "text-small px-2 bg-green-600/10",
  };
  return (
    <section className="faq-page py-20">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-7">
            <div
              className="sec-title wow fadeInUp"
              data-wow-duration="1500ms"
              data-wow-delay="000ms"
            >
              <h6 className="sec-title__tagline text-[32px] font-bold mb-2">
                FAQS
              </h6>
              <div className="tan__divider"></div>
              <h3 className="sec-title__title text-[#169384] text-[18px]">
                Frequently asked Question
              </h3>
            </div>
          </div>
          <div className="col-lg-5 col-md-5">
            {/* <!-- /.sidebar__single --> */}
          </div>
        </div>
        <div className="row gutter-y-30">
          <div className="col-lg-7">
            <Accordion
              variant="light"
              defaultExpandedKeys={["1"]}
              itemClasses={itemClasses}
            >
              <AccordionItem
                key="1"
                aria-label="Faq1"
                indicator={<FaPlus size={20} />}
                title={
                  <h4 className="text-[17px] font-semibold">
                    What makes Stellar Dairyland yogurt different from other
                    brands?
                  </h4>
                }
              >
                At Stellar Dairyland, we pride ourselves on using only the
                highest quality ingredients sourced from trusted suppliers. Our
                yogurt is crafted with care and precision, resulting in a rich
                and creamy texture with exceptional flavor. Additionally, we
                leverage innovative technologies and sustainable practices to
                ensure that every spoonful of Stellar Dairy Land yogurt is a
                delicious and wholesome experience
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Faq 2"
                indicator={<FaPlus size={20} />}
                title={
                  <h4 className="text-[17px] font-semibold">
                    How is Stellar Dairyland yogurt produced?
                  </h4>
                }
              >
                At Stellar Dairyland, we take great care in the production of
                our yogurt to ensure the highest quality and consistency in
                every batch. Our production process begins with carefully
                selected ingredients sourced from trusted suppliers. These
                ingredients are then meticulously blended and incubated for 12
                hours to create our signature creamy texture and rich flavor
                profile. Next, our yogurt undergoes a series of quality control
                checks to ensure that it meets our rigorous standards for taste,
                texture, and freshness. Finally, the finished yogurt is packaged
                in eco-friendly containers and prepared for distribution to our
                customers. Throughout the entire production process, we adhere
                to strict hygiene and food safety protocols to guarantee the
                integrity and purity of our products.
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Faq 3"
                indicator={<FaPlus size={20} />}
                title={
                  <h4 className="text-[17px] font-semibold">
                    How can I manage my subscription with Stellar Dairyland?
                  </h4>
                }
              >
                Managing your subscription with Stellar Dairyland is easy and
                convenient. Simply log in to your account on our website and
                navigate to the "Order now " section. From there, you can update
                your delivery frequency, modify your product selections, and
                adjust your payment preferences. If you need further assistance,
                feel free to reach us on the number provided on our contact us
                page, we would love to help guide you through the process.
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Faq 4"
                indicator={<FaPlus size={20} />}
                title={
                  <h4 className="text-[17px] font-semibold">
                    Are Stellar Dairyland yogurt containers recyclable?
                  </h4>
                }
              >
                Yes, our yogurt containers are made from recyclable materials.
                We are committed to sustainability and environmental
                responsibility, which is why we strive to use packaging
                materials that can be recycled or reused whenever possible. We
                encourage our customers to recycle their yogurt containers after
                enjoying our products to help reduce waste and minimize our
                environmental impact.
              </AccordionItem>
              <AccordionItem
                key="5"
                aria-label="Faq 5"
                indicator={<FaPlus size={20} />}
                title={
                  <h4 className="text-[17px] font-semibold">
                    How do I place an order for Stellar Dairyland yogurt
                    products?
                  </h4>
                }
              >
                Ordering your favorite Stellar Dairyland yogurt products is
                quick and easy. Simply visit our website and browse our
                selection of delicious flavors and varieties. Once you've made
                your selections, make an order on our order now button. We are
                glad to serve you.
              </AccordionItem>
              <AccordionItem
                key="6"
                aria-label="Faq 6"
                indicator={<FaPlus size={20} />}
                title={
                  <h4 className="text-[17px] font-semibold">
                    "Can I customize my yogurt subscription with Stellar
                    Dairyland?
                  </h4>
                }
              >
                Absolutely! We understand that everyone's tastes and preferences
                are unique, which is why we offer a customizable subscription
                option. When setting up your subscription, you'll have the
                flexibility to choose your favorite flavors, select your desired
                delivery frequency, and even mix and match different products to
                create a personalized assortment that suits your needs. Plus,
                you can easily modify your subscription preferences at any time
                through your online account.
              </AccordionItem>
            </Accordion>
          </div>
          {/* <!-- /.col-lg-8 col-xl-9 --> */}
          <div className="col-lg-5">
            <div className="faq-page__right">
              <div className="faq-page__thumb bg-[var(--tan-sprite)]">
                <img src={bgpics["all2.png"]} alt="faq pic" />
              </div>
              <div className="faq-contact__inner bg-white">
                <div className="faq-contact__inner__item justify-center">
                  <a
                    href="/order-now"
                    className="flex w-full items-center gap-3 bg-green-700/20 rounded-full p-1"
                  >
                    <div className="faq-contact__inner__item__icon">
                      <FaCartPlus />
                    </div>
                    <div className="h-full flex flex-col justify-center">
                      {" "}
                      <span className="text-[var(--common-blue)] font-semibold">
                        Order Now
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /.col-lg-4 col-xl-3 --> */}
        </div>
        {/* <!-- /.row --> */}
      </div>
      {/* <!-- /.container --> */}
    </section>
  );
}

export default Faq;
