---
comments: true
layout: post
title: Creating a Web-app with Grunt - Part 1
author: ihayes
excerpt: The first of a two-part tutorial on creating a web-app that will load and display weather data.
---

Cross-posted from [the original article on my blog](http://ivanhayes.com/blog/creating-a-web-app-with-grunt-part-1).

This is the first of a two-part tutorial, in which we’ll be creating a web-app called ‘breeze’ that will load and display temperature information for various cities using data from [OpenWeatherMap](http://openweathermap.org/). In this part of the tutorial, we’ll be setting up a simple build workflow using [Grunt](http://gruntjs.com/) and [npm](https://www.npmjs.org/).

If you’re short on time and just want to see the complete code for this part of the tutorial then you can [fork the repo on Github](https://github.com/munkychop/breeze/fork) and switch to the ‘tutorial-part-1’ branch.

### A Note for Windows Users
Throughout this tutorial I will be referring to the Mac command line application – _Terminal_, so if you are on Windows then you’ll simply need to use _Command Prompt_ instead.

## Development Environment Setup
Firstly we need to have our dev environment setup so that we can use npm and Grunt. To do this we just need to ensure Node.js is installed, as npm comes bundled with it by default. So if you haven’t already got this up and running then installing one of the [pre-built packages from the Node.js website](http://nodejs.org/download/) is probably the simplest method.

Next we need to [install Sass](http://sass-lang.com/install). If you are using Windows then you’ll first need to [install Ruby](http://rubyinstaller.org/), whereas if you are using a Mac then Ruby comes pre-installed. To install Sass, open Terminal and run the following command:

```sh
gem install sass
```

This can take a few minutes to complete, so be patient, but if you are using a Mac and the above command is failing then you could use `sudo gem install sass` instead.

## Project Setup
You will need to [download a small library called ‘atomic’](https://raw.githubusercontent.com/toddmotto/atomic/master/src/atomic.js), which our project will use for making AJAX requests to the [OpenWeatherMap API](http://openweathermap.org/api).

Now we need to setup the project files and folders – create the following structure:

<pre>

breeze
│
├──• Gruntfile.js
├──• index.html
├──• package.json
│
└───src
     │
     ├───js
     │    ├───app
     │    │    │
     │    │    └──• app.js
     │    │
     │    └───libs
     │         │
     │         └──• atomic.js
     └───scss
          │
          └──• app.scss


</pre>

The _breeze_ directory will serve as the document root of our application.

Now that we have the basic structure, let’s add some content to the files we just created. The contents of _index.html_ should be as follows:

```html
<!DOCTYPE html>

<html>
	<head>
		<title>Breeze</title>
		<link rel="stylesheet" type="text/css" href=“dist/css/app.min.css">
	</head>

	<body>
		<div class="main-container"> </div>

		<script src=“dist/js/app.min.js"></script>
	</body>
</html>
```

Astute readers may have noticed that – within the HTML markup – we are referencing directories and files that don’t exist – _dist/css/app.min.css_ and _dist/js/app.min.js_. These directories and files will be created automatically by Grunt once we set it up and run a build task.

For the contents of _app.js_, we will temporarily just add an alert message:

```js
alert("Breeze");
```

And finally, the contents of _app.scss_ will currently just contain the following styles:

```css
html, body, div {
	margin: 0;
	padding: 0;
}
```

## Installing Development Dependencies
We are going to use npm for installing development dependencies – those used by Grunt for the build step of our application.

The first thing we need to install is the CLI (command line interface) for Grunt. This will be a global install; it isn’t specific to our project and will be available system-wide, so you’ll only need to do this once per-system:

**Mac users**
You will need to run this command with _sudo_.

```sh
sudo npm install -g grunt-cli
```

**Windows users**

```sh
npm install -g grunt-cli
```

Next up, within the _breeze_ directory, open the _package.json_ file that we created earlier and add the following:

```json
{
  "name": "breeze",
  "version": "0.0.1"
}
```

This simply defines some basic information about our application which is required by npm. Save and close the file.

Although the _package.json_ file has many uses, within the scope of this tutorial – and other than the required _name_ and _version_ properties – it will simply be used to define the development dependencies of our application.

Note that the command `npm init` could instead be used to automatically generate a _package.json_ file, but doing so adds many properties that we won’t need to use in this tutorial, so creating it manually is a simpler option in this case.

Now that we have our _package.json_ file, using Terminal, change to the _breeze_ directory. We will need to run all remaining commands from this directory. Install the development dependencies by running the following command:

```sh
npm install grunt grunt-contrib-connect grunt-contrib-sass grunt-contrib-uglify grunt-contrib-watch grunt-devtools --save-dev
```

This installs all of our development dependencies into a _node-modules_ folder within the _breeze_ directory. A ‘devDependencies’ property is also added to _package.json_, listing the names and current version numbers of our application’s development dependencies:

```sh
{
  "name": "breeze",
  "version": "0.0.1",
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-connect": "^0.8.0",
    "grunt-contrib-sass": "^0.8.1",
    "grunt-contrib-uglify": "^0.6.0",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-devtools": "^0.2.1"
  }
}
```


## Doing the Grunt Work
We will be using [Grunt](http://gruntjs.com/) – a JavaScript task runner – to carry out the build step of our application. Grunt works by running various user-defined tasks when instructed to do so. We are going to set it up in such a way that our tasks run when a change to JavaScript or SCSS files is detected.

To use Grunt, we first need to open _Gruntfile.js_ that we created earlier within the _breeze_ directory and paste in the following code, which we will discuss in more detail below:

```js
module.exports = function(grunt) {

	"use strict";

	grunt.initConfig({

	});
};
```

When we use the Grunt CLI (more on this below), the version of the Grunt library specified within the _devDependencies_  property inside _package.json_ is loaded and the configuration within the Gruntfile is automatically applied. Currently our Gruntfile doesn’t contain any configuration options, so we’ll start adding these now.

### Sass
First, we’ll add a config for compiling our SCSS code using the _sass_ task ([grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)) – a wrapper for the version of Sass installed on our system i.e. the Sass Ruby gem we installed earlier:

```js
module.exports = function(grunt) {

	"use strict";

	grunt.loadNpmTasks("grunt-contrib-sass");

	grunt.initConfig({
		sass: {

			dev : {
				options: {
					style: "compressed",
					sourcemap : true
				},

				files: {
					"dist/css/app.min.css": "src/scss/app.scss"
				}
			}
		}
	});
};
```

Here, we first tell Grunt to load the _sass_ task and then we define the config for this task within the object that gets passed into Grunt’s _initConfig_ method. Within the _sass_ task we define a ‘dev’ configuration object. We can define however many configurations we like and call them whatever we like, but within these configuration objects we need to follow the rules of the task we are using, which in this case is _sass_. The _sass_ task allows us to define an ‘options’ object containing various properties that affect how our SCSS is converted into CSS. In this case we are simply stating that we want the CSS to be compressed into one line with any empty space removed. The ‘files’ object contains two file path strings – the one on the left is the file path to which we want Grunt to output our compiled CSS, and the one on the right is the main SCSS file we want to use to start the compilation process.

To test that everything is working as expected, run the following command in Terminal:

```sh
grunt sass:dev
```

Doing that should compile the SCSS into an _app.min.css_ file within the _dist/css/_ directory.

### Uglify
Next up, we want to use the _uglify_ ([grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)) task to concatenate all of our JavaScript into a single file and then minify this file when complete so that it loads quickly in web browsers. This is also a good way to reduce the number of HTTP requests an application makes when developing with more than one JavaScript file; rather than using multiple _script_ tags within the HTML markup we will only need to use a single one that points to the compiled file containing all of our JavaScript code – _app.min.js_. To carry out the concatenation and minification process we will add a configuration object for the _uglify_ task:

```js
module.exports = function(grunt) {

	"use strict";

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.initConfig({

		sass: {

			dev : {
				options: {
					style: "compressed",
					sourcemap : true
				},

				files: {
					"dist/css/app.min.css": "src/scss/app.scss"
				}
			}
		},

		uglify : {

			dev : {
				options : {
					compress : true,
					mangle : true,
					preserveComments : false
				},

				files: {
					"dist/js/app.min.js" : ["src/js/libs/atomic.js", "src/js/app/app.js"]
				}
			}
		}
	});
};
```

We have now also loaded the _uglify_ task and defined a _dev_ config for it within the object passed into Grunt’s _initConfig_ method.

The ‘files’ object for _uglify_ works in exactly the same way as the one within the _sass_ config, with the exception that we are passing in an array of JavaScript file paths on the right. All of these files will be concatenated, minified and output to a single JavaScript file. When set to ‘true’, the _compress_ option shortens variable and function names, and removes empty space in an attempt to reduce the overall file size. Similarly, When set to ‘true’, the _mangle_ option performs various optimisations such as removing unreferenced functions and variables. We have set the _preserveComments_ option to ‘false’ so that all comments will be removed from the minified file.

To test that everything is working as expected, run the following command in Terminal:

```sh
grunt uglify:dev
```

Doing that should compile the JavaScript into an _app.min.js_ file within the _dist/js/_ directory.

A word of warning here – the files are concatenated in the same order that they are specified in the array of file paths, so you’ll need to ensure that dependencies are ordered correctly.

With all that working as expected, the project directory structure should now look like this:

<pre>

breeze
│
├──• Gruntfile.js
├──• index.html
├──• package.json
│
├───src
│    │
│    ├───js
│    │    │
│    │    ├───app
│    │    │    │
│    │    │    └──• app.js
│    │    │
│    │    └───libs
│    │         │
│    │         └──• atomic.js
│    └───scss
│         │
│         └──• app.scss
│
└───dist
     │
     ├───css
     │    │
     │    └──• app.min.css
     └───js
          │
          └──• app.min.js


</pre>

### Connect
Now that we’ve setup a build for our SCSS and JavaScript, we are going to create a _connect_ ([grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)) config that allows us to quickly start a basic server in order to run our application, which will be launched in the default browser. This is way quicker than configuring Apache, for example. And like Apache, the _connect_ server runs our application using the _http://_ protocol – which allows us to use AJAX – rather than the _file://_ protocol which does not.

We will set this up in a similar way to the other configs:

```js
module.exports = function(grunt) {

	"use strict";

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");

	grunt.initConfig({

		sass: {

			dev: {
				options: {
					style: "compressed",
					sourcemap : true
				},

				files : {
					"dist/css/app.min.css": "src/scss/app.scss"
				}
			}
		},

		uglify: {

			dev: {
				options: {
					compress: true,
					mangle: true,
					preserveComments: false
				},

				files: {
					"dist/js/app.min.js" : ["src/js/libs/atomic.js", "src/js/app/app.js"]
				}
			}
		},

		connect: {

			server : {
				options: {
					open: true,
					keepalive: true
				}
			}
		}
	});
};
```

As with the other tasks, we have loaded the _connect_ task and defined a config, which this time we have called ‘server’. The only two options we need to use at this point are ‘open’ and ‘keepalive’ – both of which we have set to ‘true’. The _open_ option simply launches the default web browser on our system and loads the index page within the same directory as the Gruntfile. By default, the _connect_ task only keeps the server active for as long as our other tasks are running, so since we have no continually-running tasks, we use the _keepalive_ option to force the server to stay active until it is manually stopped.

Run the following command to launch our application in the default browser:

```sh
grunt connect:server
```

Notice that, within the Terminal window, we can no longer run any commands now that we have the server running. To stop the server, on the keyboard hold the `ctrl` key and press `c`.

If you want to run Grunt commands while the server is active then you can open another Terminal window and once again change to the _breeze_ directory.

## Running Multiple Tasks with One Command

So far, we have set things up so that we can run tasks one at a time, but what if we want to run multiple tasks? We could run them one after the other in Terminal, but there is an easier way – we can register our own tasks with Grunt, which is much more straightforward than it sounds. Let’s start by creating a task that will first run _sass:dev_, followed by _uglify:dev_, and then finally _connect:server_. We’ll call this task ‘breeze’:

```js
module.exports = function(grunt) {

	"use strict";

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");

	grunt.initConfig({

		sass: {

			dev: {
				options: {
					style: "compressed",
					sourcemap : true
				},

				files : {
					"dist/css/app.min.css": "src/scss/app.scss"
				}
			}
		},

		uglify: {

			dev: {
				options: {
					compress: true,
					mangle: true,
					preserveComments: false
				},

				files: {
					"dist/js/app.min.js" : ["src/js/libs/atomic.js", "src/js/app/app.js"]
				}
			}
		},

		connect: {

			server : {
				options: {
					open: true,
					keepalive: true
				}
			}
		}
	});

	grunt.registerTask("breeze", ["sass:dev", "uglify:dev", "connect:server”]);
};
```

So now instead of sequentially running each task manually, in Terminal, we now simply need to run:

```sh
grunt breeze
```

This will run all the tasks we specified in the array for the second parameter of Grunt’s _registerTask_ method.

## Automating Build Tasks

Now everything is set up and ready for us to manually run builds of our SCSS and JavaScript, and view our app within the browser. But, wouldn’t it be nice if we could go one step further and have Grunt run relevant tasks automatically when any of our development files is changed? That’s precisely what we’ll be doing in this section of this tutorial.

### Watch
To automate the running of the tasks that we have already defined, we first need to setup a _watch_ ([grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)) task which watches specific files and runs relevant tasks if any of the files changes.

Setting up the _watch_ task is very similar to the way in which we setup all the other tasks (this is now the complete Gruntfile):


```js
module.exports = function(grunt) {

	"use strict";

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.initConfig({

		sass: {

			dev: {
				options: {
					style: "compressed",
					sourcemap : true
				},

				files : {
					"dist/css/app.min.css": "src/scss/app.scss"
				}
			}
		},

		uglify: {

			dev: {
				options: {
					compress: true,
					mangle: true,
					preserveComments: false
				},

				files: {
					"dist/js/app.min.js" : ["src/js/libs/atomic.js", "src/js/app/app.js"]
				}
			}
		},

		connect: {

			server : {
				options: {
					open: true
				}
			}
		},

		watch: {
			
			js: {
				files: ["src/js/**/*.js"],
				tasks: ["uglify:dev"]
			},

			scss: {
				files: ["src/scss/**/*.scss"],
				tasks: ["sass:dev"]
			}
		}
	});

	grunt.registerTask("breeze", ["sass:dev", "uglify:dev", "connect:server", "watch"]);
};
```

We have loaded the _watch_ task and created two configs – ‘js’ and ‘scss’. These configs could have been called anything else, but the names were chosen so that the nature of what the configs will be used for is clear. Within each config, using the _files_ option, we specify an array of file paths that are to be watched for changes, and then, using the _tasks_ option, we specify a list of tasks to run when any of the listed files is changed. In the _js_ config we are watching all files that have a _.js_ file extension within the _src/js_ directory and its subdirectories. When any of these files is changed, the _uglify:dev_ task is run automatically. Similarly, with the _scss_ config we are watching all files that have a _.scss_ file extension within the _src/scss_ directory and its subdirectories. When any of these files is changed, the _sass:dev_ task is run automatically.

At this point, it is important to note that we have removed the _keepalive_ property from the 'server' config of the _connect_ task, since it would have stopped the _watch_ task – or any task, for that matter – from running afterwards. The _keepalive_ property is no longer needed because we are now using the continually-running _watch_ task, which will keep the server alive automatically.

Notice that – within the _breeze_ task we created earlier – ‘watch’ has been added to the array of tasks that Grunt will run for us sequentially.

Now we simply need to once again run our `grunt breeze` task using Terminal (be sure to cancel any running tasks using `ctrl + c` first) and our app will launch in the browser, with the _watch_ task waiting for changes on the lists of files we specified. To check this is working change the alert message in _app.js_ to the following:

```js
alert("Grunt is a breeze");
```

Save the file and Grunt should automatically run the tasks we specified in the _watch:js_ config, so refresh the web browser and you should see the new alert.

## Next steps
So far we have covered how to setup Sass and npm, and how to use Grunt to setup a simple workflow for the build step of a web application.

In the next instalment of this two-part tutorial, we will cover the logic of the _breeze_ application – loading and displaying current temperature information for various cities by making AJAX requests to the [OpenWeatherMap API](http://openweathermap.org/api). We’ll also briefly cover SCSS variables and mixins.

Feel free to ask questions in the comments below.

Happy coding!
