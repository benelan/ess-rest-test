const axios = require("axios");
require("./config.js")();
require("./testGeo.js")();
require("./testBase.js")();

// for benchmarking
axios.interceptors.request.use(
  function (config) {
    config.metadata = { startTime: new Date() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    response.config.metadata.endTime = new Date();
    response.duration =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  function (error) {
    error.config.metadata.endTime = new Date();
    error.duration =
      error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
  }
);

axios
  .get(
    `https://www.arcgis.com/sharing/generateToken?f=json&username=${u}&password=${p}&referer=http://www.arcgis.com`
  )
  .then((response) => {
    console.log("\n---------------- Token ----------------");
    console.log(response.data.token);
    testGeo(response.data.token);
    testBase(response.data.token);
  })
  .catch((error) => {
    console.log(error);
  });
