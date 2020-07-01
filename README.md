# Test ArcGIS REST API

This app was created for Esri Support Services to help employees test the speed and accuracy of geocoding and basemap REST requests

## Using the App
To run the app you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the project directory and type:

```
npm install
npm start
```

Next, make sure to change the username and password in the ```config.json``` file which is used to create your token:
```
module.exports = function () {
this.u = "USERNAME";
this.p = "PASSWORD";
};
```
Then you can run the tests by typing:
```
node run.js
```
The results logged into the console should look something like:
```
---------------- Basemap ----------------
Esri duration: 96 ms
Amazon duration: 249 ms
responses match: true

---------------- Geocode ----------------
Esri duration: 528 ms
Amazon duration: 482 ms
responses match: true
```