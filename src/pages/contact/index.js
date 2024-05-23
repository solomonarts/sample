import React, { useState } from "react";
import PageHead from "../../components/page-head";
import { notification } from "antd";
import { Spinner } from "@nextui-org/react";

function Contact() {
  document.title = "Contact us | Stellar Dairies";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://formsubmit.co/ajax/info@stellardairies.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        message: message,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success !== undefined && data?.success === "true") {
          setLoading(false);
          notification["success"]({
            message: "Message Status",
            description: data?.message,
          });
        } else {
          setLoading(false);
          notification["warning"]({
            message: "Message Status",
            description: data?.message,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/50 z-50 flex flex-col justify-center">
          <Spinner color="default" />
        </div>
      )}
      <PageHead title="Contact Us" />
      <div className="container flex flex-col gap-8 py-16 mx-auto lg:flex-row">
        <div className="w-full lg:w-2/5">
          <p className="text-lg italic tint-color">For more Information</p>
          <h3 className="mt-3 mb-6 text-4xl font-black main-color">
            Hey, let's talk!
          </h3>

          <p className="my-6 text-lg">
            If you have any questions or problems simply use the following
            contact details.
          </p>
        </div>
        <div className="flex-1">
          <h3 className="mt-3 mb-6 text-4xl font-bold main-color">
            Send Us A Message
          </h3>
          <p className="my-6 text-lg">
            Please fill out the form below and our expert team will get back to
            you shortly.
          </p>
          <div className="container">
            <form target="_blank" className="grid gap-4">
              <div className="form-group">
                <div className="form-row grid gap-4">
                  <div className="col">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Full Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email Address"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  className="form-control"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  name="message"
                  rows="5"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={sendEmail}
                className="btn btn-lg btn-dark btn-block"
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
