const axios = require("axios");

// https://developers.arcgis.com/labs/rest/search-for-an-address/
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-geocode-addresses.htm

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

// export function
module.exports = function () {
  this.testGeo = (token) => {
    // the addresses to geocode
    const addresses = {
      records: [
        {
          attributes: {
            OBJECTID: 1,
            Address: "380 New York St",
            Neighborhood: "",
            City: "Redlands",
            Subregion: "",
            Region: "CA",
          },
        },
      ],
    };

    // create the request urls 
    let esri =
      "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?";

    let amazon =
      "https://geocode-ls.arcgis.com/arcgis/rest/services/World/GeocodeServer/geocodeAddresses?";

    const data = {
      f: "json",
      addresses: JSON.stringify(addresses),
      token: token,
    };

    const query = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    esri = esri + query;
    amazon = amazon + query;


    // esri request
    axios
      .post(esri)
      .then((eR) => {
        console.log("\n---------------- Geocode ----------------");
        console.log("Esri duration:", eR.duration, "ms");
        
        // amazon request
        axios
        .post(amazon)
        .then((aR) => {
          console.log("Amazon duration:", aR.duration, "ms");
          console.log("responses match:", JSON.stringify(aR.data) === JSON.stringify(eR.data));
        })
        .catch((error) => {
          console.log("request failed:");
          console.log(error);
        });


      })
      .catch((error) => {
        console.log("request failed:");
        console.log(error);
      });
  };
};
