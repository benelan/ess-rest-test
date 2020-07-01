# Test ArcGIS REST API

This app was created for Esri Support Services to help employees test the speed and accuracy of geocoding and basemap REST requests

## Using the App
To run the app you must have [Node](https://nodejs.org/en/) installed. With Node installed, navigate to the project directory and type:

```
npm install
```

Next, make sure to add your ArcGIS Online credentials in the ```config.json``` file which is used to create the token:
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
The results logged in the console should look something like:
```
---------------- Token ----------------
*...*

---------------- Basemap ----------------
Esri duration: 96 ms
Amazon duration: 249 ms
responses match: true

---------------- Geocode ----------------
Esri duration: 528 ms
Amazon duration: 482 ms
responses match: true
```
