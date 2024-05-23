import React, { useState } from "react";
import { DatePicker, notification } from "antd";
import { RadioGroup, Spinner } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import dayjs from "dayjs";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useRadio, VisuallyHidden, cn } from "@nextui-org/react";
import { createOrder, getUser } from "../../Common";
import PageHead from "../../components/page-head";
import { fromAddress, setKey } from "react-geocode";
import { useNavigate } from "react-router-dom";

// REACT_APP_GAPIKEY

const apiKey = process.env.REACT_APP_GAPIKEY;

const { RangePicker } = DatePicker;

const CustomRadio = (props) => {
  const {
    Component,
    children,
    description,
    disabled,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-3",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} disabled={disabled} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};

function Orders() {
  setKey("AIzaSyB0dy46oTvw9PivnuoTzy_aa5LDp_8FNIo");

  const user = getUser();

  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [data, setData] = useState({
    clientemail: user !== null ? JSON.parse(user).client_email : "",
    contact_no: user !== null ? JSON.parse(user).client_phone : "",
    location: user !== null ? JSON.parse(user).location : "",
    lnglat: user !== null ? JSON.parse(user).lnglat : "",
    order_status: 0,
    order_payment: "cod",
  });
  const onChange = (date, dateString) => {
    // console.log(JSON.stringify(dateString));
    data["order_date"] = JSON.stringify(dateString);
  };

  const [lnglat, setLnglat] = useState("");

  const [location, setLocation] = useState("");

  const [selectedprod, setSelectedprod] = React.useState([]);

  const availableproducts = [
    "Vanilla",
    "Strawberry",
    "Natural Flavor",
    "Mango",
    "Passion",
    "Blackcurrant",
  ];

  document.title = "Order Now | Stella Dairies";

  const defaultValue = [dayjs("2024-01-01")];

  const [ordertype, setOrdertype] = useState("daily");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [disabled, setDisabled] = useState(true);

  const [qty, setQty] = useState({});

  const orderPaymentchange = (val) => {
    if (val === "cod") {
      data["pop_number"] = "";
      data["pop_tid"] = "";
      setDisabled(false);
      setData({ ...data });
    }
    setPaymentMethod(val);
    data["order_payment"] = val;
    setData({ ...data });
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
    checkvalues();
  };

  const typing = (e) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
    // console.log("order", data);
    checkvalues();
  };

  const getqty = (e) => {
    checkvalues();
    let totalorder = 0;
    if (
      e.target.value > 0 &&
      e.target.value !== "0" &&
      e.target.value !== null
    ) {
      qty[e.target.name] = e.target.value;
      setQty({ ...qty });
      data["orderqty"] = JSON.stringify(qty);
      // console.log(qty);

      for (let key in qty) {
        if (qty.hasOwnProperty(key)) {
          totalorder += parseInt(qty[key]);
          if (totalorder > 4) {
            data["orderprice"] = JSON.stringify(totalorder * 226);
          } else if (totalorder > 1 && totalorder < 5) {
            data["orderprice"] = JSON.stringify(totalorder * 225);
          } else {
            data["orderprice"] = JSON.stringify(totalorder * 230);
          }

          // console.log("addedd", data);
        }
      }
    } else {
      delete qty[e.target.name];

      setQty({ ...qty });
      data["orderqty"] = JSON.stringify(qty);

      if (Object.keys(qty).length > 0) {
        for (let key in qty) {
          if (qty.hasOwnProperty(key)) {
            totalorder += parseInt(qty[key]);
            if (totalorder > 4) {
              data["orderprice"] = JSON.stringify(totalorder * 226);
            } else if (totalorder > 1 && totalorder < 5) {
              data["orderprice"] = JSON.stringify(totalorder * 225);
            } else {
              data["orderprice"] = JSON.stringify(totalorder * 230);
            }
            // console.log("addedd", data);
          }
        }
      } else {
        data["orderprice"] = "0";
      }
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

  const order = () => {
    setloading(true);
    createOrder(data)
      .then((res) => {
        if (res?.data?.success === 1) {
          console.log("resssss", res.data);
          setloading(false);
          notification["success"]({
            message: "Order Status",
            description: res.data?.message,
          });
          navigate("/");
        } else {
          setloading(false);
          notification["warning"]({
            message: "Order Status",
            description: res.data?.message,
          });
        }
      })
      .catch((err) => {
        setloading(false);
        // console.log(err);
      });
  };

  return (
    <div className="page-wrapper">
      <PageHead title="Order Now" />

      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/50 z-50 flex flex-col justify-center">
          <Spinner color="default" />
        </div>
      )}

      {/* <!-- Checkout Start --> */}
      <section className="checkout-page">
        <div className="container">
          <div className="row">
            {user === undefined || user === null ? (
              <div className="col-xl-6 col-lg-6">
                <div className="checkout-page__billing-address">
                  <h4 className="checkout-page__billing-address__title text-[22px]">
                    Contact Details
                  </h4>
                  <form className="checkout-page__form">
                    <div className="row gutter-x-20">
                      <div className="col-xl-12">
                        <div className="checkout-page__input-box">
                          <input
                            type="email"
                            name="clientemail"
                            value={
                              data?.clientemail !== undefined
                                ? data.clientemail
                                : ""
                            }
                            className={`${
                              data["clientemail"] !== undefined &&
                              data["clientemail"] === ""
                                ? "required animate-pulse"
                                : ""
                            }`}
                            placeholder="Email Address"
                            required=""
                            onChange={typing}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="checkout-page__input-box">
                          <input
                            type="tel"
                            name="contact_no"
                            value={
                              data?.contact_no !== undefined
                                ? data.contact_no
                                : ""
                            }
                            className={`${
                              data["contact_no"] !== undefined &&
                              data["contact_no"] === ""
                                ? "required animate-pulse"
                                : ""
                            }`}
                            placeholder="Phone Number"
                            required=""
                            onChange={typing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div className="checkout-page__input-box grid gap-2">
                          <span>Location</span>
                          <GooglePlacesAutocomplete
                            apiKey={apiKey}
                            placeholder="Select delivery location"
                            // className="outline-none"
                            className={`outline-none ${
                              data["location"] !== undefined &&
                              data["location"] === ""
                                ? "required animate-pulse"
                                : ""
                            }`}
                            name="clocation"
                            // onChange={(e) => getLocation(e)}
                            selectProps={{
                              location,
                              onChange: getLocation,
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="checkout-page__input-box grid gap-3">
                          <span>Select Delivery Dates</span>
                          <DatePicker
                            multiple
                            onChange={onChange}
                            className={`${
                              data["orderdate"] !== undefined &&
                              data["orderdate"] === ""
                                ? "required animate-pulse"
                                : ""
                            }`}
                            maxTagCount="responsive"
                            defaultValue={defaultValue}
                            size="small"
                            placeholder="Select Multiple dates"
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="checkout-page__input-box grid gap-2">
                          <div className="flex flex-col gap-3">
                            <CheckboxGroup
                              label="Select Products"
                              color="warning"
                              orientation="horizontal"
                              value={selectedprod}
                              onValueChange={setSelectedprod}
                            >
                              {availableproducts?.length > 0 &&
                                availableproducts.map((product, prondx) => {
                                  return (
                                    <>
                                      <Checkbox
                                        value={product}
                                        defaultChecked={
                                          qty[`${product}-qty`] !== undefined &&
                                          parseInt(qty[`${product}-qty`]) > 0
                                            ? true
                                            : false
                                        }
                                        isDisabled={
                                          qty[`${product}-qty`] !== undefined &&
                                          parseInt(qty[`${product}-qty`]) > 0
                                            ? true
                                            : false
                                        }
                                      >
                                        {product}
                                      </Checkbox>
                                      {selectedprod?.length > 0 &&
                                        selectedprod.includes(product) && (
                                          <input
                                            type="number"
                                            min={0}
                                            name={`${product}-qty`}
                                            prefix="litres"
                                            value={
                                              selectedprod[`${product}-qty`]
                                            }
                                            placeholder="Qty in litres"
                                            required=""
                                            onChange={getqty}
                                          />
                                        )}
                                    </>
                                  );
                                })}
                            </CheckboxGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="col-xl-6 col-lg-6">
                <div className="checkout-page__billing-address">
                  <h4 className="checkout-page__billing-address__title text-[22px]">
                    Order
                  </h4>
                  <form className="checkout-page__form">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="checkout-page__input-box grid gap-3">
                          <span>Select Delivery Dates</span>
                          <DatePicker
                            multiple
                            onChange={onChange}
                            className={`${
                              data["orderdate"] !== undefined &&
                              data["orderdate"] === ""
                                ? "required animate-pulse"
                                : ""
                            }`}
                            maxTagCount="responsive"
                            defaultValue={defaultValue}
                            size="small"
                            placeholder="Select Multiple dates"
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="checkout-page__input-box grid gap-2">
                          <div className="flex flex-col gap-3">
                            <CheckboxGroup
                              label="Select Products"
                              color="warning"
                              orientation="vertical"
                              value={selectedprod}
                              onValueChange={setSelectedprod}
                            >
                              {availableproducts?.length > 0 &&
                                availableproducts.map((product, prondx) => {
                                  return (
                                    <>
                                      <Checkbox
                                        value={product}
                                        defaultChecked={
                                          qty[`${product}-qty`] !== undefined &&
                                          parseInt(qty[`${product}-qty`]) > 0
                                            ? true
                                            : false
                                        }
                                        isDisabled={
                                          qty[`${product}-qty`] !== undefined &&
                                          parseInt(qty[`${product}-qty`]) > 0
                                            ? true
                                            : false
                                        }
                                      >
                                        {product}
                                      </Checkbox>
                                      {selectedprod?.length > 0 &&
                                        selectedprod.includes(product) && (
                                          <input
                                            type="number"
                                            min={0}
                                            name={`${product}-qty`}
                                            prefix="litres"
                                            value={
                                              selectedprod[`${product}-qty`]
                                            }
                                            placeholder="Qty in litres"
                                            required=""
                                            onChange={getqty}
                                          />
                                        )}
                                    </>
                                  );
                                })}
                            </CheckboxGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="col-xl-6 col-lg-6">
              <h2 className="checkout-page__your-order__title text-[22px]">
                Order Details
              </h2>

              <table className="checkout-page__order-table">
                <thead className="order_table_head">
                  <tr>
                    <th>Product</th>
                    <th className="right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedprod?.length > 0
                    ? selectedprod.map((prod, pdx) => {
                        return (
                          <tr>
                            <td className="pro__price">{prod}</td>
                            <td className="pro__price">
                              {Object.entries(qty).map((itm, idx) => {
                                return (
                                  <p key={idx}>
                                    {JSON.stringify(itm[0]).includes(prod) &&
                                      `${itm[1]} ltrs`}
                                  </p>
                                );
                              })}
                            </td>
                          </tr>
                        );
                      })
                    : ""}

                  <tr>
                    <td className="pro__title">Price/Litre</td>
                    <td className="pro__price">kes 230</td>
                  </tr>
                  <tr>
                    <td className="pro__title">Delivery</td>
                    <td className="pro__price">kes 0.00</td>
                  </tr>
                  <tr>
                    <td className="pro__title">Total</td>
                    <td className="pro__price">
                      {" "}
                      kes{" "}
                      {data?.orderprice !== undefined &&
                      data?.orderprice !== null
                        ? data.orderprice
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="checkout-page__details">
            {/* <!-- <h2 className="checkout-page__details__title">Shipping Details</h2>
            <div className="checkout-page__details__check-box">
              <input type="checkbox" name="skipper4" id="skipper4" checked />
              <label for="skipper4">Same as Billing Details<span></span></label>
            </div> --> */}
          </div>
          {/* <!-- /.checkout-page__details --> */}
          <div className="checkout-page__your-order">
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="checkout-page__payment">
                  <RadioGroup
                    label="Payment Methods"
                    value={paymentMethod}
                    onValueChange={(val) => orderPaymentchange(val)}
                  >
                    <CustomRadio
                      description="Make Payment on delivery."
                      value="cod"
                      // disabled={true}
                    >
                      Cash on Delivery
                    </CustomRadio>
                    <CustomRadio
                      description="Pay using Mpesa | Paybill - Business no. 303030 | Account no. 1182#"
                      value="mpesa"
                    >
                      Mpesa
                    </CustomRadio>
                  </RadioGroup>
                </div>
              </div>
              <div className="col-lg-6">
                {(paymentMethod === "mpesa" ||
                  paymentMethod === "bank-trans") && (
                  <div className="checkout-page__shipping-address">
                    <h2 className="checkout-page__shipping-address__title text-[22px]">
                      Enter Proof of payment
                    </h2>
                    <form className="checkout-page__form">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="checkout-page__input-box">
                            <input
                              type="text"
                              name="pop_number"
                              value={
                                data?.pop_number !== undefined
                                  ? data.pop_number
                                  : ""
                              }
                              className={`${
                                data["pop_number"] !== undefined &&
                                data["pop_number"] === ""
                                  ? "required animate-pulse"
                                  : ""
                              }`}
                              placeholder="Depositors Number"
                              required=""
                              onChange={typing}
                            />
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="checkout-page__input-box">
                            <input
                              type="text"
                              name="pop_tid"
                              className={`${
                                data["pop_tid"] !== undefined &&
                                data["pop_tid"] === ""
                                  ? "required animate-pulse"
                                  : ""
                              }`}
                              value={
                                data?.pop_tid !== undefined ? data.pop_tid : ""
                              }
                              placeholder="Payment Reference/Transaction Id"
                              onChange={typing}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {/* <!-- /.checkout__payment --> */}
                <div className="text-right d-flex justify-content-start">
                  <button
                    disabled={disabled}
                    onClick={() => order()}
                    className={`voldor voldor-btn--base ${
                      disabled ? "bg-stone-400" : "bg-stone-800"
                    } text-white px-3 py-2 rounded-md`}
                  >
                    Place Your Order
                  </button>
                </div>
                {/* <!-- /.text-right --> */}
              </div>
              {/* <!-- /.col-lg-6 --> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Orders;
