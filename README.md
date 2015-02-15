# Instamatch
**A simple in-browser game of matching hashtags to the correct picture in the Instagram popular feed**

---

### Contents

1. [Installation](#1-installation)
  1. [Backend](#11-backend)
  2. [Configuration](#12-configuration)
  3. [Frontend](#13-frontend)
2. [Running the server](#2-running-the-server)
3. [Running tests](#3-running-tests)



### 1. Installation

The project is a barebones Flask app with a single API endpoint and page that manipulates the Instagram API. There is a Backbone app on the frontend which consumes the Flask app's API and creates a simple game.

Let's start by cloning the project and making sure your shell is in the project's root directory.

#### 1.1 Backend

Please make sure Python is installed on the system, preferable v2.7. If pip is not already installed (test with something like `which pip`), you can get it [here](https://pip.pypa.io/en/latest/installing.html).

Once pip is installed, we'll need to install **virtualenv** to make sure the app runs in a clean environment with all the correct dependencies. This should be done globally ([help here if you get stuck](https://virtualenv.pypa.io/en/latest/installation.html)):

	$ [sudo] pip install virtualenv

Now that virtualenv is installed, let's create a clean environment for our project.

	$ virtualenv ~/.envs/instamatch

I've picked a path to a hidden folder called `.envs` in my home directory. You can pick anything you want, but make sure you remember it, so you can activate the environment when you need to.

To activate the virtual environment we just created, run the following, replacing the path I use with the one you've used for your virtualenv.

	$ source ~/.envs/instamatch/bin/activate

Now we're in our clean environment, we can install dependencies to just our environment without affecting our global Python. Let's do that:

	$ pip install -r requirements.txt

This will install the project's backend dependencies.

#### 1.2 Configuration

The project makes use of the Instagram API, for which we need to register an application and receive our client id and secret. You can register an app [here](http://instagram.com/developer/register/).

Once you have your client id and client secret, we need to tell the project to use them! In the `app/` directory, you'll see a file called `sample-settings.cfg`. Replace the placeholder values with your client secret and id and rename the file to `settings.cfg`.

#### 1.3 Frontend

The project uses [npm](https://www.npmjs.com/) for package management and [grunt](http://gruntjs.com/) for automating tasks.

Make sure you have Node.js installed (you can find [pre-built binaries here](http://nodejs.org/download/)). npm comes with the latest versions of Node.js.

Once node and npm are installed, install **grunt** by running:

	$ npm install -g grunt-cli

You might need root access for this.

Then in the project root directory:

	$ npm install

This will install the project's dependencies from the `package.json`.

Now our frontend dependencies are installed, let's build the app. This is as simple as running:

	$ grunt

Make sure you're in the same directory as the `Gruntfile.js` (the top-level directory). You should see grunt concatening, minifying and copying files to dist folders.

**That's the app set up!**

---

### 2. Running the server

Now the project's all set up, let's start the web server and run the app! In the top level directory, you'll see a file called `runserver.py`. Making sure your virtualenv is activated (see above), run the following:

	$ python runserver.py

You should see:

	 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
	 * Restarting with stat

Open up [http://127.0.0.1:5000/](http://127.0.0.1:5000/) in your favourite browser, and start playing!

---

### 3. Running tests

To run the Jasmine tests and sanity (jshint) checking, run:

	$ grunt test

