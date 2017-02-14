The purpose of senmaker is to help its user create grammatically correct English sentences.

This application is originally developed using ES6, React, Flux, Jest, Babel, and Webpack and is intended to be a
client-side browser app.  Let's see how it morphs in the future.

The original target audience is native speakers of Chinese from the mainland.

Getting Started in Development:

The app is developed using Webstorm 2016.3.2.  Nevertheless, I have not saved the Webstorm specific settings.  So if
use Webstorm to clone this from Github you'll probably need to tweak the settings until it works.  Set the Javascript
version to React JSX.

The app depends upon node and npm being globally available.

npm install the first time

npm start will crankup webpack-dev-server.  This will monitor your files for changes, rebuild the bundle.js when needed
and provide a server that you can view at localhost:8081.  Sometimes this doesn't catch changes so you'll need to stop
and restart on occasion.

npm test will run the Jest tests.  You can do this from a 2nd terminal window, even while webpack-dev-server is running.
You may want to use the --coverage flag do display test coverage info or the -u flag to update snapshots.

