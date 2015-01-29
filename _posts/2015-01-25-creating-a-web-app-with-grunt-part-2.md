---
comments: true
layout: post
title: Creating a Web-app with Grunt - Part 2
author: ihayes
excerpt: The final instalment of a two-part tutorial on creating a web-app that will load and display weather data.
---

Cross-posted from [the original article on my blog](http://ivanhayes.com/blog/creating-a-web-app-with-grunt-part-2).

This is the final instalment of a two-part tutorial, in which we have been creating a web-app – Breeze – that will load and display temperature information for various locations using data from [OpenWeatherMap](http://openweathermap.org/).


In this instalment, we will build on what we covered previously during [the first part of the tutorial](http://ivanhayes.com/blog/creating-a-web-app-with-grunt-part-1/) in order to create the logic of the *Breeze* application – loading and displaying current temperature information for various locations by making AJAX requests to the [OpenWeatherMap API](http://openweathermap.org/api). We’ll also improve the Grunt workflow and briefly look at SCSS variables and mixins.

Whether you’re short on time and just want to see the code for the complete project, or simply want to follow along, then you can [fork the repo on Github](https://github.com/munkychop/breeze/fork) and switch to the ’tutorial-part-2’ branch.

If, for whatever reason, you don’t want to fork or clone the project, but want to get at the code, then you can [download the whole project as a zip file](https://github.com/munkychop/breeze/archive/tutorial-part-2.zip).

Once you have the project, open Terminal and ensure that you change to the ‘breeze’ directory before running the following command to install dependencies:

```sh
npm install
```

## Improving the Grunt Task Workflow

There are quite a few things that we could be doing differently in order to make the build workflow and overall code quality of our project better; by updating the Gruntfile setup we will be improving the process of loading tasks, as well as the browser coverage of our compiled CSS code. We will also automate more tasks in order to make development simpler and faster.

### Loading Grunt Tasks Simultaneously

Currently, within our Gruntfile, we’ve been loading tasks one at a time. Instead of doing this, we’ll start using a module called [load-grunt-tasks](https://www.npmjs.org/package/load-grunt-tasks), which allows us to load all the necessary Grunt tasks that are defined as dev dependencies within the *package.json* file.

Using Terminal, ensure that you have changed to the ‘breeze’ directory – we will be running all commands from this directory throughout the tutorial – and then run the following command:

```sh
npm install load-grunt-tasks --save-dev
```

This installs the *load-grunt-tasks* module into the *node-modules* folder and adds it as a development dependency within the *package.json* file.

Once that’s done, we need to update part of our Gruntfile to make use of the module.

This is what the relevant part of the Gruntfile looked like before:

```javascript
grunt.loadNpmTasks("grunt-contrib-sass");
grunt.loadNpmTasks("grunt-contrib-uglify");
grunt.loadNpmTasks("grunt-contrib-connect");
grunt.loadNpmTasks("grunt-contrib-watch");
```

We are going to replace all of that with the following single line instead:

```javascript
require("load-grunt-tasks")(grunt);
```

The next time we run the `grunt breeze` command, all of our npm module dependencies should be loaded, just like before, but with a much more neat and concise syntax.

### Automatic CSS Prefixes
Normally, in order to ensure a web application works in various browsers, we’d need to add vendor-specific prefixes, for example, `-webkit-transition`, `-moz-transition`, and `-ms-transition` would be used in addition to the standard spec of `transition`.

Instead of manually adding prefixes, we’ll start using a module called [grunt-autoprefixer](https://www.npmjs.com/package/grunt-autoprefixer), which allows us to write our SCSS using just the standard spec, as it will automatically add the necessary vendor prefixes where appropriate during the Grunt build step. This is a great option, because it allows us to keep our SCSS code simple and clean, rather than having it littered with prefixes.

Using Terminal, run the following command to install autoprefixer:

```sh
npm install grunt-autoprefixer --save-dev
```

Now we need to add a config to the Gruntfile for autoprefixer:

```javascript
autoprefixer: {

    dist : {
        options: {
            // add prefixes to support the last 2 browser versions,
            // as well as IE9+ and Android 4 stock browsers
            browsers: ["last 2 versions", "ie >= 9", "Android 4"],
            map: true
        },

        files: {
            "dist/css/app.min.css": "src/scss/app.scss"
        }
    }
}
```

Note that, within the scope of this tutorial, we’ll only really need to run the autoprefixer task when creating a distribution build, as when developing locally we should be using a good browser, such as Chrome, which supports a lot of the CSS spec by default. If you need to test in not-so-modern browsers during development, then the autoprefixer task should be run on every build of the SCSS code, and you may also want to look at the documentation for autoprefixer, which provides [many configuration options](https://www.npmjs.com/package/grunt-autoprefixer#options).

### Auto-updating Style Changes in the Browser
The *watch* task supports an option called ‘livereload’, which can automatically reload the browser when any of the watched files are changed. To use this option, we first need to install the *livereload* browser [extension for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) or follow [the simple installation guide](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) if you want to use Firefox or Safari.

Once livereload is installed in the browser, we then need to update the Gruntfile. Modify the config for the *watch* task so that it includes an ‘options’ object containing a ’livereload’ property:

```javascript
watch: {

    options: {
        livereload: true,
    },

    html: {
        files: ["index.html"],
    },

    js: {
        files: ["src/js/**/*.js"],
        tasks: ["uglify:dev"]
    },

    scss: {
        files: ["src/scss/**/*.scss"],
        tasks: ["sass:dev"]
    },

    img: {
        files: ["src/img/**/*.*"],
        tasks: ["copy:img"]
    }
}
```

Now when we run `grunt breeze` we will be able to turn on *livereload* for the page running in the browser. To do this, simply click on the livereload browser icon and its very subtle centre circle should turn black for Chrome/Safari, or red for Firefox, meaning that it has successfully connected to the running Grunt task.

In Chrome/Safari:

<img src="http://ivanhayes.com/blog/wp-content/uploads/2015/01/chrome-livereload-icon-300x178.png" alt="chrome-livereload-icon">

And in Firefox:

<img src="http://ivanhayes.com/blog/wp-content/uploads/2015/01/firefox-livereload-icon.png" alt="firefox-livereload-icon">

## Implementing the OpenWeatherMap API

So far, in terms of JavaScript, we've only added an alert message. In this section we will use the HTML5 geolocation API to get the coordinates of a user and the *atomic* AJAX library to get weather data from the OpenWeatherMap API, based on the coordinates we obtain.

Before we get started on this section, [create a free OpenWeatherMap account](http://openweathermap.org/register) in order to obtain a developer API key. This key will be needed later when we start making requests to the API.

### Main Application Logic

The logic of the application will be fairly simple, and we can break it into two clearly defined parts – getting weather data for the current location coordinates, and getting weather data using a specific search term. There will also be some logic for displaying the weather information, which will be shared by both these parts.

#### Logic Using Coordinates
1. Attempt to get the coordinates of the current user with the HTML5 geolocation API
2. If we get the coordinates, then make an API request to OpenWeatherMap for weather data using the coordinates
3. Run ‘shared logic’ below

#### Logic Using a Search Term
1. Listen for when the user submits the search form
2. Make an api request using the text they entered into the search text field
3. Run ‘shared logic’ below

#### Shared Logic
1. Parse the JSON data received from the API
2. If the location is found, display temperature information using the parsed data
3. If the location is not found, or if we get an error when making the AJAX request, then display an error message to notify the user.


### Getting Started

Firstly, remove the alert that we added in the previous part of this tutorial, as it was just a temporary placeholder for our actual code.

Next, it’s a good idea to create an immediately invoked closure which will contain all our code. Doing this is good practice, as it will stop our variables polluting the global (window) scope:

```javascript
(function (){

	// code...

})();
```

If you’d like more information about closures, [this article](http://code.tutsplus.com/tutorials/closures-front-to-back--net-24869) is a pretty good one.

We want to ensure the DOM has fully loaded before we start running any of our logic. To do this, we add a listener for the ‘DOMContentLoaded’ event and once this occurs we run an initialisation function for the application:

```javascript
(function (){
	
	document.addEventListener("DOMContentLoaded", init);

	function init ()
	{
		// code...
	}

})();
```

Now that we have the basics set up, let’s move on to the first part of the app logic – getting weather data for the current coordinates.

### Getting Coordinated
In order to request location information for the current user, we can use the `getCurrentPosition` method of the `navigator.geolocation` object:

```javascript
(function (){
	
	// Add an event listener to ensure the DOM has loaded before
	// initialising the application.
	document.addEventListener("DOMContentLoaded", init);

	function init ()
	{
		navigator.geolocation.getCurrentPosition(geolocationSuccessHandler, geolocationErrorHandler);
	}

	function geolocationSuccessHandler (position)
	{
		// get lat and lon values from the position object.
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
	}

	function geolocationErrorHandler (error)
	{
		// The user has disallowed sharing their geolocation, or there was a general error obtaining the info.
		console.log("geolocationErrorHandler");
	}

})();
```

Running this method causes a notification to be displayed within the browser. Notice that we also provide two functions as parameters – the first will be run if the user allows our web app to use location information, and the second runs if the user does not allow this, or if there is an error obtaining the information. Note that, at the time of writing, Firefox will not run the error function if a user chooses the ‘Not now’ option within the location notification – it simply fails silently in this case, which is [a known Mozilla bug](https://bugzilla.mozilla.org/show_bug.cgi?id=675533) that has been open for a long time. Firefox does, however, run the error handler if a user chooses the ‘Never’ option.

Also, it’s useful to note that, if coordinates are returned, they are sometimes precise and sometimes approximate. This is because some browsers, such as Chrome, give users a choice as to whether or not a precise location should be used.

We’re now ready to make an API request to get weather data for the coordinates we obtained from the `position` object.


### Requesting Weather Data
Next, add variables to store the API URL, the type of units you want (metric or imperial), and your OpenWeatherMap API key, as well as a few for alerting error messages, and a function that will get weather data from coordinates passed as parameters. You must replace the value of the `API_KEY` variable – ’YOUR_API_KEY_HERE’ – with the API key you got after signing up to OpenWeatherMap, ensuring that you keep the quotation marks as they are:

```javascript
(function (){
	
	var API_KEY = "YOUR_API_KEY_HERE";
	var API_UNIT_TYPE = "metric"; // otherwise change to 'imperial'.
	var API_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&units=" + API_UNIT_TYPE;

	var MESSAGE_LOCATION_NOT_FOUND = "Location not found.";
	var MESSAGE_API_REQUEST_ERROR = "API Error.";

	// Add an event listener to ensure the DOM has loaded before
	// initialising the application.
	document.addEventListener("DOMContentLoaded", init);

	function init ()
	{
		navigator.geolocation.getCurrentPosition(geolocationSuccessHandler, geolocationErrorHandler);
	}

	function geolocationSuccessHandler (position)
	{
		// get lat and lon values from the position object.
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		// Load weather data using the lat and lon values, now that we have the user's position.
		getWeatherDataFromCoords(lat, lon);
	}

	function geolocationErrorHandler (error)
	{
		// The user has disallowed sharing their geolocation, or there was a general error obtaining the info.
		console.log("geolocationErrorHandler");
	}

	function getWeatherDataFromCoords (lat, lon)
	{
		console.log("getting weather data...", lat, lon);
		
		// Build a request URL based on the current lat and lon values.
		var requestURL = API_URL + "&lat=" + lat + "&lon=" + lon;

		// Make an AJAX request to the API.
		atomic.get(requestURL)
			.success(apiRequestSuccess)
			.error(apiRequestError);
	}

	function apiRequestSuccess (data, xhr)
	{
		console.log("weather data received.", data);

		if (typeof data.cod !== "undefined" && data.cod === "404")
		{
			alert(MESSAGE_LOCATION_NOT_FOUND);
			return;
		}
	}

	function apiRequestError (data, xhr)
	{
		alert(MESSAGE_API_REQUEST_ERROR);
	}

})();
```

We have now built a function to request weather data – `getWeatherDataFromCoords` – and we are calling it after we have obtained the user’s coordinates, from within the `geolocationSuccessHandler` function.

If you open up the JavaScript console on your browser, you should see the log messages from the application, including an object containing weather information.

## Displaying Weather Information
Logging the data we got from the API is all well and good, but it would be great to update the HTML in order to show the weather information to the user, so let’s go ahead and do that now:

```javascript
(function (){
	
	var API_KEY = "YOUR_API_KEY_HERE";
	var API_UNIT_TYPE = "metric"; // otherwise change to 'imperial'.
	var API_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&units=" + API_UNIT_TYPE;

	// Use '°C' for metric units, or  '°F' for imperial units.
	var UNITS_SUFFIX = API_UNIT_TYPE === "metric" ? "°C" : "°F";

	var MESSAGE_LOCATION_NOT_FOUND = "Location not found. Please search for something else.";
	var MESSAGE_API_REQUEST_ERROR = "There was a problem getting weather data. Please try again.";

	var _locationNameDisplay;
	var _temperatureDisplay;

	// Add an event listener to ensure the DOM has loaded before
	// initialising the application.
	document.addEventListener("DOMContentLoaded", init);

	function init ()
	{
		_locationNameDisplay = document.querySelector(".location-name-display");
		_temperatureDisplay = document.querySelector(".temperature-display");

		// Get the geo position of the current user (if they allow this).
		navigator.geolocation.getCurrentPosition(geolocationSuccessHandler, geolocationErrorHandler);
	}

	function geolocationSuccessHandler (position)
	{
		// Get lat and lon values from the position object.
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		// Load weather data using the lat and lon values, now that we have the user's position.
		getWeatherDataFromCoords(lat, lon);
	}

	function geolocationErrorHandler (error)
	{
		// The user has disallowed sharing their geolocation, or there was a general error obtaining the info.
		console.log("geolocationErrorHandler");
	}

	function getWeatherDataFromCoords (lat, lon)
	{
		console.log("getting weather data...", lat, lon);

		// Build a request URL based on the current lat and lon values.
		var requestURL = API_URL + "&lat=" + lat + "&lon=" + lon;

		// Make an AJAX request to the API.
		atomic.get(requestURL)
			.success(apiRequestSuccess)
			.error(apiRequestError);
	}

	function apiRequestSuccess (data, xhr)
	{
		console.log("weather data received.", data);

		// The data returned by the API contains a property called 'cod',
		// rather than 'code', for the response status code. This is not a typo!
		if (typeof data.cod !== "undefined" && data.cod === "404")
		{
			alert(MESSAGE_LOCATION_NOT_FOUND);
			return;
		}

		// Get the location name, country code, and temperature from the data object
		// returned by the API, ensuring that we round it to the nearest integer.
		var locationName = data.name;
		var countryCode = data.sys.country;
		var temperature = Math.round(data.main.temp);

		// Don't display anything if there is no name and country code.
		if (locationName === "" && countryCode === "")
		{
			alert(MESSAGE_LOCATION_NOT_FOUND);
			return;
		}

		updateLocationDisplay(locationName, countryCode, temperature);
	}

	function apiRequestError (data, xhr)
	{
		alert(MESSAGE_API_REQUEST_ERROR);
	}

	function updateLocationDisplay(locationName, countryCode, temperature)
	{
		if (locationName !== "")
		{
			_locationNameDisplay.innerHTML = locationName + ", " + countryCode;
		}
		else
		{
			_locationNameDisplay.innerHTML = countryCode;
		}

		_temperatureDisplay.innerHTML = temperature + UNITS_SUFFIX;
	}

})();
```

Firstly, we are checking if the status code in the data object returned by the API is 404 (not found) before proceeding. If it is then we need to alert the user so they know there was a problem with the request. We then grab the location name, country code, and temperature from the API data object. Next, we check if both the location name and country code are empty strings, and if this is the case we again alert the user, since we would have nothing to display. Lastly, we call the `updateLocationDisplay` function, within which we display either the location name, country code, or both, dependant on what is available.


## Adding Search Functionality
At this point, we have successfully displayed weather information for a user’s coordinates, and we can further improve our application by adding a search feature, so that we can get temperature information for practically any location in the world, based on user-entered text.

The input text field already exists in the HTML code, but is currently not functional. In this section we’ll go through the logic for using a search term. To reiterate, we want to do the following:

1. Listen for when the user submits the search form
2. Make an api request using the text they entered into the search text field
3. Parse the JSON data received from the API
4. If the location is found, display temperature information using the parsed data

We have already written the logic for *#3* and *#4*, and we should re-use this instead of creating duplicate functionality. So, we just need to create the logic for *#1* and *#2*:

```javascript
(function (){

	var API_KEY = "YOUR_API_KEY_HERE";
	var API_UNIT_TYPE = "metric"; // otherwise change to 'imperial'.
	var API_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&units=" + API_UNIT_TYPE;

	// Use '°C' for metric units, or  '°F' for imperial units.
	var UNITS_SUFFIX = API_UNIT_TYPE === "metric" ? "°C" : "°F";

	var MESSAGE_LOCATION_NOT_FOUND = "Location not found. Please search for something else.";
	var MESSAGE_API_REQUEST_ERROR = "There was a problem getting weather data. Please try again.";
	var MESSAGE_SEARCH_NOT_SPECIFIED = "Please specify a search term.";

	var _locationSearchForm;
	var _locationSearchInput;
	var _locationNameDisplay;
	var _temperatureDisplay;
	var _waitingForData;

	// Add an event listener to ensure the DOM has loaded before
	// initialising the application.
	document.addEventListener("DOMContentLoaded", init);

	function init ()
	{
		_locationSearchForm = document.querySelector("#location-search-form");
		_locationSearchInput = document.querySelector(".location-search-input");
		_locationNameDisplay = document.querySelector(".location-name-display");
		_temperatureDisplay = document.querySelector(".temperature-display");

		_waitingForData = false;

		// Add a listener for when the search form is submitted.
		_locationSearchForm.addEventListener("submit", locationSearchFormSubmitHandler);

		// Get the geo position of the current user (if they allow this).
		navigator.geolocation.getCurrentPosition(geolocationSuccessHandler, geolocationErrorHandler);
	}

	function geolocationSuccessHandler (position)
	{
		// Get lat and lon values from the position object.
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		// Load weather data using the lat and lon values, now that we have the user's position.
		getWeatherDataFromCoords(lat, lon);
	}

	function geolocationErrorHandler (error)
	{
		// The user has disallowed sharing their geolocation, or there was a general error obtaining the info.
		// Even still, they will still be able to search for weather information.
		console.log("geolocationErrorHandler");
	}

	function locationSearchFormSubmitHandler (event)
	{
		event.preventDefault();
		
		console.log("form submit.", _locationSearchInput.value);

		if (_locationSearchInput.value !== "")
		{
			getWeatherDataFromLocationName(_locationSearchInput.value);

			_locationSearchInput.value = "";
		}
		else
		{
			alert(MESSAGE_SEARCH_NOT_SPECIFIED);
		}
	}

	function getWeatherDataFromCoords (lat, lon)
	{
		// Don't do anything if we are waiting on the response of a previous API request.
		if (_waitingForData)
		{
			return false;
		}

		// Disable API requests until we receive a response.
		_waitingForData = true;

		console.log("getting weather data...", lat, lon);

		// Build a request URL based on the current lat and lon values.
		var requestURL = API_URL + "&lat=" + lat + "&lon=" + lon;

		// Make an AJAX request to the API.
		atomic.get(requestURL)
			.success(apiRequestSuccess)
			.error(apiRequestError);
	}

	function getWeatherDataFromLocationName (locationName)
	{
		// Don't do anything if we are waiting on the response of a previous API request.
		if (_waitingForData)
		{
			return false;
		}

		// Disable API requests until we receive a response.
		_waitingForData = true;

		console.log("getting weather data...", locationName);

		// Build a request URL based on the current lat and lon values.
		var requestURL = API_URL + "&q=" + locationName;

		// Make an AJAX request to the API.
		atomic.get(requestURL)
			.success(apiRequestSuccess)
			.error(apiRequestError);
	}

	function apiRequestSuccess (data, xhr)
	{
		console.log("weather data received.", data);

		// Reenable data lookups now that the API response has been received.
		_waitingForData = false;

		// The data returned by the API contains a property called 'cod',
		// rather than 'code', for the response status code. This is not a typo!
		if (typeof data.cod !== "undefined" && data.cod === "404")
		{
			alert(MESSAGE_LOCATION_NOT_FOUND);
			return;
		}

		// Get the location name, country code, and temperature from the data object
		// returned by the API, ensuring that we round it to the nearest integer.
		var locationName = data.name;
		var countryCode = data.sys.country;
		var temperature = Math.round(data.main.temp);

		// Don't display anything if there is no name and country code.
		if (locationName === "" && countryCode === "")
		{
			alert(MESSAGE_LOCATION_NOT_FOUND);
			return;
		}

		updateLocationDisplay(locationName, countryCode, temperature);
	}

	function apiRequestError (data, xhr)
	{
		alert(MESSAGE_API_REQUEST_ERROR);

		// Reenable data lookups so that we can retry requesting weather data.
		_waitingForData = false;
	}

	function updateLocationDisplay(locationName, countryCode, temperature)
	{
		if (locationName !== "")
		{
			_locationNameDisplay.innerHTML = locationName + ", " + countryCode;
		}
		else
		{
			_locationNameDisplay.innerHTML = countryCode;
		}

		_temperatureDisplay.innerHTML = temperature + UNITS_SUFFIX;
	}

})();
```

We have stored references to the input text field and the form within which it is contained, allowing us to listen out for when a user submits the form, so that we can run the `locationSearchFormSubmitHandler` function. Within this function, the first piece of code to get executed is `event.preventDefault()`. This stops the default form submission action so that we can write our own implementation without the page being refreshed. We then check if the input text field is empty, and if so we alert the user, otherwise the `getWeatherDataFromLocationName` function is run with the value of the input text field provided as a parameter. We then clear the contents of the input text field to make it easier for the user to search weather data for somewhere else next time.

The `getWeatherDataFromLocationName` function is similar to `getWeatherDataFromCoords`, but accepts a single string as a parameter, rather than coordinates. Notice also that we have added conditional logic to both of those functions, which checks the state of the `_waitingForData` boolean variable. This check is done so that only a single API request can be performed at any given time – the value of the variable is set to ‘true’ when an API request is in progress, and then back to ‘false’ when we receive a response or error.

We then reuse the previously created logic to parse and display the weather information.

## Making It Pretty

In this section we'll create some logic to dynamically update the class names of elements and then use some basic SCSS to style the application and make it look slick with CSS3 transitions.

### Logic to Facilitate Styling
Our final JavaScript code is as follows:

```javascript
(function (){
	
	var API_KEY = "YOUR_API_KEY_HERE";
	var API_UNIT_TYPE = "metric"; // otherwise change to 'imperial'.
	var API_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_KEY + "&units=" + API_UNIT_TYPE;

	var TEMPERATURES = {

		FREEZING	: {MAX : 0, CLASS_NAME : "freezing"},
		COLD		: {MAX : 8, CLASS_NAME : "cold"},
		WARM		: {MAX : 16, CLASS_NAME : "warm"},
		HOT			: {MAX : 24, CLASS_NAME : "hot"},
		BLAZING		: {MAX : Number.POSITIVE_INFINITY, CLASS_NAME : "blazing"}
	};

	// Use '°C' for metric units, or  '°F' for imperial units.
	var UNITS_SUFFIX = API_UNIT_TYPE === "metric" ? "°C" : "°F";

	var MESSAGE_LOCATION_NOT_FOUND = "Location not found. Please search for something else.";
	var MESSAGE_API_REQUEST_ERROR = "There was a problem getting weather data. Please try again.";
	var MESSAGE_SEARCH_NOT_SPECIFIED = "Please specify a search term.";

	var _mainContainer;
	var _locationSearchForm;
	var _locationSearchSubmitWrapper;
	var _locationSearchInput;
	var _currentTemperatureClassName;
	var _locationNameDisplay;
	var _temperatureDisplay;
	var _waitingForData;

	// Add an event listener to ensure the DOM has loaded before
	// initialising the application.
	document.addEventListener("DOMContentLoaded", init);

	function init ()
	{
		_mainContainer = document.querySelector(".main-container");
		_locationSearchForm = document.querySelector("#location-search-form");
		_locationSearchSubmitWrapper = document.querySelector(".location-search-submit-wrapper");
		_locationSearchInput = document.querySelector(".location-search-input");
		_locationNameDisplay = document.querySelector(".location-name-display");
		_temperatureDisplay = document.querySelector(".temperature-display");

		_waitingForData = false;

		// Add a listener for when the search form is submitted.
		_locationSearchForm.addEventListener("submit", locationSearchFormSubmitHandler);

		// Get the geo position of the current user (if they allow this).
		navigator.geolocation.getCurrentPosition(geolocationSuccessHandler, geolocationErrorHandler);
	}

	function geolocationSuccessHandler (position)
	{
		// Get lat and lon values from the position object.
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		// Load weather data using the lat and lon values, now that we have the user's position.
		getWeatherDataFromCoords(lat, lon);
	}

	function geolocationErrorHandler (error)
	{
		// The user has disallowed sharing their geolocation, or there was a general error obtaining the info.
		// Even still, they will still be able to search for weather information.
		console.log("geolocationErrorHandler");
	}

	function locationSearchFormSubmitHandler (event)
	{
		event.preventDefault();
		
		console.log("form submit.", _locationSearchInput.value);

		if (_locationSearchInput.value !== "")
		{
			getWeatherDataFromLocationName(_locationSearchInput.value);

			_locationSearchSubmitWrapper.classList.add("loading");
			_locationSearchInput.value = "";
		}
		else
		{
			alert(MESSAGE_SEARCH_NOT_SPECIFIED);
		}
	}

	function getWeatherDataFromCoords (lat, lon)
	{
		// Don't do anything if we are waiting on the response of a previous API request.
		if (_waitingForData)
		{
			return false;
		}

		// Disable API requests until we receive a response.
		_waitingForData = true;

		console.log("getting weather data...", lat, lon);

		// Build a request URL based on the current lat and lon values.
		var requestURL = API_URL + "&lat=" + lat + "&lon=" + lon;

		// Make an AJAX request to the API.
		atomic.get(requestURL)
			.success(apiRequestSuccess)
			.error(apiRequestError);
	}

	function getWeatherDataFromLocationName (locationName)
	{
		// Don't do anything if we are waiting on the response of a previous API request.
		if (_waitingForData)
		{
			return false;
		}

		// Disable API requests until we receive a response.
		_waitingForData = true;

		console.log("getting weather data...", locationName);

		// Build a request URL based on the current lat and lon values.
		var requestURL = API_URL + "&q=" + locationName;

		// Make an AJAX request to the API.
		atomic.get(requestURL)
			.success(apiRequestSuccess)
			.error(apiRequestError);
	}

	function apiRequestSuccess (data, xhr)
	{
		console.log("weather data received.", data);

		// Reenable data lookups now that the API response has been received.
		_waitingForData = false;
		_locationSearchSubmitWrapper.classList.remove("loading");

		// The data returned by the API contains a property called 'cod',
		// rather than 'code', for the response status code. This is not a typo!
		if (typeof data.cod !== "undefined" && data.cod === "404")
		{
			alert(MESSAGE_LOCATION_NOT_FOUND);
			return;
		}

		// Get the location name, country code, and temperature from the data object
		// returned by the API, ensuring that we round it to the nearest integer.
		var locationName = data.name;
		var countryCode = data.sys.country;
		var temperature = Math.round(data.main.temp);

		// Don't display anything if there is no name and country code.
		if (locationName === "" && countryCode === "")
		{
			alert(MESSAGE_LOCATION_NOT_FOUND);
			return;
		}

		updateLocationDisplay(locationName, countryCode, temperature);
		updateBackgroundColor(temperature);
	}

	function apiRequestError (data, xhr)
	{
		alert(MESSAGE_API_REQUEST_ERROR);

		// Reenable data lookups so that we can retry requesting weather data.
		_waitingForData = false;
	}

	function updateLocationDisplay(locationName, countryCode, temperature)
	{
		if (locationName !== "")
		{
			_locationNameDisplay.innerHTML = locationName + ", " + countryCode;
		}
		else
		{
			_locationNameDisplay.innerHTML = countryCode;
		}

		_temperatureDisplay.innerHTML = temperature + UNITS_SUFFIX;
	}

	function updateBackgroundColor (temperature)
	{
		// If we previously set a temperature class name on the main
		// container element then remove it here.
		if (typeof _currentTemperatureClassName !== "undefined")
		{
			_mainContainer.classList.remove(_currentTemperatureClassName);
		}

		// Set the '_currentTemperatureClassName' variable based on the
		// constants we defined earlier.
		if (temperature <= TEMPERATURES.FREEZING.MAX)
		{
			_currentTemperatureClassName = TEMPERATURES.FREEZING.CLASS_NAME;
		}
		else if (temperature <= TEMPERATURES.COLD.MAX)
		{
			_currentTemperatureClassName = TEMPERATURES.COLD.CLASS_NAME;
		}
		else if (temperature <= TEMPERATURES.WARM.MAX)
		{
			_currentTemperatureClassName = TEMPERATURES.WARM.CLASS_NAME;
		}
		else if (temperature <= TEMPERATURES.HOT.MAX)
		{
			_currentTemperatureClassName = TEMPERATURES.HOT.CLASS_NAME;
		}
		else
		{
			_currentTemperatureClassName = TEMPERATURES.BLAZING.CLASS_NAME;
		}

		// Set a temperature class name on the main container element.
		_mainContainer.classList.add(_currentTemperatureClassName);
	}

})();
```

We’ve added a function called `updateBackgroundColor` that accepts a single numerical parameter – the current temperature. Also, we’ve created a ‘TEMPERATURES’ object, which contains information that we’ll use within the `updateBackgroundColor` function to determine which CSS class gets added to the main container `div` element of the application. If the temperature parameter value is less than or equal to the maximum ‘freezing’ temperature, then we add the ‘freezing’ class name, otherwise, if the temperature parameter value is less than or equal to the maximum ‘cold’ temperature, then we add the ‘cold’ class name, and so on. Additionally, there is a `_currentTemperatureClassName` variable for keeping track of the current class name that has been added to the main container, so that the class name can be removed the next time the function runs. This ensures we don’t end up with multiple temperature class names on the main container.

Now that the main container has specific temperature class names added and removed, we target those class names using our SCSS code, so that the background colour is updated when we search for different locations, based on on temperature.

Lastly, we have created a `_locationSearchSubmitWrapper` variable. this will allow us to target an element wrapping the form submit button so that we can add a transition to show when the app waiting for a response to an API request. This will provide visual feedback to the user so that they understand what  the application is doing, rather than blindly waiting for something to happen. We add and remove a ‘loading’ class to this element where appropriate.

### Styling and Transitions
Let’s take a brief look at the way we will be styling the application using SCSS to illustrate some of the basic concepts of the language.

#### Partials
In SCSS, partials are simply files that have been broken up into logical segments, which we can include in our code using the `@import` directive. By convention, partial files are named with a leading underscore. Here is a basic example:

Main file – *app.scss*
```scss
body {
	background-color: blue;
}

@import "some-amazing-partial";
```

Partial file – *some-amazing-partial.scss*
```scss
body {
	background-color: green;
}
```

In the first file – *app.scss* – we simply set the background colour of the `body` element to blue and then import *some-amazing-partial.scss*, which then changes the background colour to green, overriding the previously set value. Note also that we don’t provide the ‘scss’ file extension when importing partials.
If we were to compile the above two files into pure CSS it would look as follows:

```css
body {
	background-color: blue;
}

body {
	background-color: green;
}
```

so we are effectively just inserting all the content from a partial file wherever we use the `@import` directive.

#### Variables
We can also make use of simple variables in SCSS, the definitions for which start with a dollar sign. Variables make updating things such as colour schemes way easier than when using CSS alone. Consider the following standard CSS code:

```css
.first-element {
	background-color: blue;
}

.second-element {
	background-color: blue;
}

.third-element {
	background-color: blue;
}
```

With standard CSS, if we wanted to change the background colour of all the targeted elements then we’d have to do so individually. Now that’s not so bad when there are only three elements, but imagine how long this simple update would take if there were hundreds of places throughout the styling code where this colour was defined! “Find and replace”, I hear you say, but what if there are some other elements that also use this colour, which we don’t want to change? Now that’s a lot of work!
With SCSS, we could simply define some logically-named variables for our colours, and when we need to update a particular colour all that would be required is a quick change to a single variable value. Here’s a simple example:

```scss
$color-nav: blue;
$color-examples: blue;

.navigation-element {
	background-color: $color-nav;
}

.example-element-1 {
	background-color: $color-examples;
}

.example-element-2 {
	background-color: $color-examples;
}
```

Here we simply create two variables for colours, one for navigation and one for some example elements. Now if we want to change the colour of our navigation we can do so very easily, and without affective the colour of the example elements.

On a side note, it’s normally a good idea to include the majority of your variables in a separate file (as we have done for this project), or group of files, so that they are always easy to find.
 
#### Mixins
In SCSS, *mixins* are effectively used to include snippets of code that we use regularly, in a similar way to JavaScript functions that return a value (but not quite the same way as SCSS functions). We can also pass parameters to mixins to alter the code the return. A good use case for a mixing would be something like including a [clearfix](http://www.sitepoint.com/clearing-floats-overview-different-clearfix-methods/):

Here’s how we could fix the issue with CSS alone:

```css
.some-element-1:after {
	content: "";
	display: table;
	clear: both;
}

.some-element-2:after {
	content: "";
	display: table;
	clear: both;
}
```

Now obviously if we have many elements that need a clearfix then we’d have to be writing this a lot. Mixins to the rescue – here’s the same thing written in SCSS:

*mixins.scss*
A file to potentially contain many types of mixins

```scss
@mixin clearfix {
	&:after {
		content: "";
		display: table;
		clear: both;
	}
}
```

```scss
*app.scss*

.some-element-1 {
	@include clearfix;
}

.some-element-2 {
	@include clearfix;
}
```

Now that’s much neater :)

#### Transitions

Now, moving back to our application, we aren’t going to go into too much detail about the SCSS implementation, but one thing worth looking at briefly is CSS3 transitions. We’ll use transitions in order to give the application a nice slick look and feel – fading between background colours when the user searches for locations. To do that we simply add a transition property to the main container `div` element:

```scss
.main-container {
	transition: background-color 1s linear;
}
```

This basically states that whenever the `background-color` property is updated for this element, the browser should transition for 1 second between the old value and the new value. Very simple, yet very effective.

Finally, we will also add another transition for showing and hiding a loading icon in place of the form submit button, for when the application needs to show that it is loading:

```scss
.location-search-submit, .location-search-cloud-icon {
	transition: left 0.4s ease;
	transition-delay: 0.5s;
}
```

That just about wraps it up. If you have any questions about the application, including the logic, styling, or any of the concepts we’ve covered, then feel free to post a comment.

And as always, happy coding!