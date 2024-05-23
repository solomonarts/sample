import axios from "axios";

async function createOrder(data) {
  let raw = JSON.stringify(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apis.stellardairies.com/orders",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    data: raw,
  };

  const response = await axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

async function createClient(data) {
  let raw = JSON.stringify(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apis.stellardairies.com/auth/register",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    data: raw,
  };

  const response = await axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // console.log(error);
    });

  return response;
}

async function usrLogin(data) {
  let raw = JSON.stringify(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apis.stellardairies.com/auth/login",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    data: raw,
  };

  const response = await axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  return response;
}

async function getOrders() {
  //   let raw = JSON.stringify(data);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://apis.stellardairies.com/allorders",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    // data: raw,
  };

  const response = await axios
    .request(config)
    .then((response) => {
      //   console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

async function completeOrders(data) {
  let raw = JSON.stringify(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apis.stellardairies.com/orders/completeorders",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    data: raw,
  };

  const response = await axios
    .request(config)
    .then((response) => {
      //   console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

async function getClients() {
  //   let raw = JSON.stringify(data);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://apis.stellardairies.com/all-clients",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    // data: raw,
  };

  const response = await axios
    .request(config)
    .then((response) => {
      //   console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

const getUser = () => {
  // bazStorage.get("user", function (error, value) {
  //   if (!error) {
  //     localStorage.setItem("user", value);
  //     return value;
  //   } else {
  //     console.log(error);
  //   }
  //   // value for the key of 'fizz' will be retrieved from localStorage on www.baz.com
  // });

  const user = localStorage.getItem("user");
  return user;
};


export { createOrder, createClient, usrLogin, getClients, getOrders, getUser, completeOrders };
