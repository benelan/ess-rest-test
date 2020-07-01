const axios = require("axios");
require("./config.js")();
require("./testGeo.js")();
require("./testBase.js")();

axios
  .get(
    `https://www.arcgis.com/sharing/generateToken?f=json&username=${u}&password=${p}&referer=http://www.arcgis.com`
  )
  .then((response) => {
    testGeo(response.data.token);
    testBase(response.data.token)
  })
  .catch((error) => {
    console.log(error);
  });