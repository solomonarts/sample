import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { RadioGroup, Radio } from "@nextui-org/react";
import { createClient, usrLogin } from "../../Common";
import { notification } from "antd";
import { Spinner } from "@nextui-org/react";
import { fromAddress, setKey } from "react-geocode";
import { useNavigate } from "react-router-dom";

const apiKey = process.env.REACT_APP_GAPIKEY;

function Signup() {
  const navigate = useNavigate();
  setKey("AIzaSyB0dy46oTvw9PivnuoTzy_aa5LDp_8FNIo");
  const [location, setLocation] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [customertype, setCustomertype] = useState("individual");
  const [confirmpass, setConfirmpass] = useState(null);
  const [lnglat, setLnglat] = useState("");

  const customertypechange = (val) => {
    setCustomertype(val);
    if (val === "individual") {
      data["customertype"] = val;
      data["businessname"] = "";
      data["location"] = "";
      data["lnglat"] = "";
      setData({ ...data });
    } else {
      data["customertype"] = val;
      setData({ ...data });
    }
  };

  const checkvalues = () => {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] === "") {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }
    }
  };

  const [login, setLogin] = useState(false);

  const typing = (e) => {
    if (e.target.name === "confirmpass") {
      if (e.target.value === data?.password) {
        setConfirmpass(true);
      } else {
        setConfirmpass(false);
      }
    } else {
      data[e.target.name] = e.target.value;
      setData({ ...data });
      // console.log("order", data);
    }
    checkvalues();
  };

  const getLocation = (e) => {
    // console.log(e);
    let val = [];
    // Get latitude & longitude from address.
    fromAddress(e.label)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        val = [lng, lat];
        setLnglat(JSON.stringify(val));
        data["lnglat"] = lnglat;
        // console.log(val);
      })
      .catch(console.error);
    setLocation(e.label);
    data["location"] = e.label;
  };

  const signup = () => {
    setloading(true);
    createClient(data)
      .then((res) => {
        // console.log("resssss", res.data);
        if (res?.data?.success === 1) {
          setloading(false);
          notification["success"]({
            message: "Signup Status",
            description: res.data?.message,
          });
          navigate("/order-now");
        } else {
          setloading(false);
          notification["warning"]({
            message: "Signup Status",
            description: res.data?.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const signin = () => {
    setloading(true);
    usrLogin(data)
      .then((res) => {
        // console.log("resssss", res);
        if (res?.data?.success === 1) {
          setloading(false);
          notification["success"]({
            message: "Login Status",
            description: res.data?.message,
          });
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate("/dashboard");
          // window.open(
          //   "https://www.dashboard.stellardairies.com",
          //   "noopener,noreferrer"
          // );
        } else {
          setloading(false);
          notification["warning"]({
            message: "Login Status",
            description: res.data?.message,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/50 z-50 flex flex-col justify-center">
          <Spinner color="default" />
        </div>
      )}
      {/* <PageHead title="Signup / Login" /> */}
      <div className={`signup__form ${login ? "login" : "signup"}`}>
        <div className="form__container min-h-fit">
          {login ? (
            <div className="row min-h-full w-full grid items-center">
              <div className="col-lg-12 min-h-fit w-full m-auto flex flex-col justify-center gap-10">
                <div className="w-full pl-4 relative">
                  <h3 className="text-[32px] font-bold text-[var(--common-white)]">
                    Login
                  </h3>
                </div>
                <div className="w-full pl-4">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    onChange={typing}
                  />
                </div>
                <div className="w-full pl-4">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={typing}
                  />
                </div>

                <div className="w-full grid grid-flow-col grid-cols-2 gap-2">
                  <div className="w-full flex justify-start gap-10 mt-2 pl-6">
                    <button className="rounded-xl border-[0.5px] border-white  px-3 py-1 h-8 text-white min-w-fit">
                      Cancel
                    </button>
                    <button
                      onClick={signin}
                      className={`rounded-xl ${
                        disabled ? "bg-slate-700 " : "bg-[var(--common-blue)]"
                      } px-3 py-1 h-8 text-white min-w-fit`}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col-lg-6 h-fit w-full m-auto flex justify-end">
                    <div
                      className={`
                          "text-[var(--common-blue]"
                      `}
                    >
                      Don't have an Account..
                      <span
                        className="underline text-blue-600"
                        onClick={() => {
                          setLogin(!login);
                        }}
                      >
                        Signup
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row min-h-full w-full grid items-center">
              <div className="col-lg-6 col-sm-12 min-h-fit w-full m-auto flex flex-col justify-center gap-4">
                <div className="w-full">
                  <h3 className="text-[32px] font-bold text-[var(--common-blue)]">
                    Signup
                  </h3>
                </div>
                <div className="w-full">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={typing}
                  />
                </div>
                <div className="w-full">
                  <input
                    placeholder="Full Name"
                    type="text"
                    name="fullname"
                    onChange={typing}
                  />
                </div>
                <div className="w-full">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={typing}
                  />
                </div>
                <div>
                  <RadioGroup
                    orientation="horizontal"
                    label="Individual / Stellar Vendor"
                    value={customertype}
                    onValueChange={(val) => customertypechange(val)}
                  >
                    <Radio value="individual">Individual</Radio>
                    <Radio value="business" className="bg-white">
                      Stellar Vendor
                    </Radio>
                  </RadioGroup>
                </div>
                {customertype === "business" && (
                  <>
                    <div className="w-full grid  gap-2 items-center">
                      <input
                        placeholder="Business Name"
                        type="text"
                        name="businessname"
                        onChange={typing}
                      />
                      <div>
                        <span className="text-white bg-[var(--common-blue)] p-1">
                          Business Location
                        </span>
                        <GooglePlacesAutocomplete
                          apiKey={apiKey}
                          placeholder="Select delivery location"
                          className="outline-none w-full m-auto rounded-full"
                          name="clocation"
                          // onChange={(e) => getLocation(e)}
                          selectProps={{
                            location,
                            onChange: getLocation,
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="w-full grid grid-flow-col grid-cols-2 gap-2">
                  <input
                    placeholder="Create Password"
                    type="password"
                    name="password"
                    onChange={typing}
                  />

                  <input
                    placeholder="Confirm Password"
                    disabled={
                      data?.password !== null && data?.password !== ""
                        ? false
                        : true
                    }
                    type="password"
                    name="confirmpass"
                    onChange={typing}
                  />
                  {confirmpass !== null && !confirmpass && (
                    <span className="text-red-400">Password doesn't match</span>
                  )}
                </div>

                <div className="w-full grid grid-flow-col grid-cols-2 gap-2">
                  <div className="col-lg-6 h-fit w-full m-auto">
                    <div
                      className={`
                          "text-[var(--common-blue]"
                      `}
                    >
                      Already have an Account..
                      <span
                        className="underline text-blue-600"
                        onClick={() => {
                          setLogin(!login);
                        }}
                      >
                        Login
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex justify-end gap-10 mt-2">
                    <button className="rounded-xl border-[0.5px] border-white  px-3 py-1 h-8 text-white min-w-fit">
                      Cancel
                    </button>
                    <button
                      onClick={signup}
                      className={`rounded-xl ${
                        disabled ? "bg-slate-700 " : "bg-[var(--common-blue)]"
                      } px-3 py-1 h-8 text-white min-w-fit`}
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <div className="row">
            <div className="col-lg-6 h-fit w-full m-auto"></div>
            <div className="col-lg-6 h-fit w-full m-auto">
              <div
                className={`${
                  login ? "text-[var(--common-blue)]" : "text-[var(--tan)]"
                }`}
              >
                {login
                  ? "Don't have an account.."
                  : "Already have an Account.."}{" "}
                <span
                  className="underline text-blue-600"
                  onClick={() => {
                    setLogin(!login);
                  }}
                >
                  {login ? "Signup" : "Login"}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
