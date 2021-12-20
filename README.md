## Installation Guide

On the project root directory you can run the follwing program to install dependencies

```bash
npm install
#or
yarn
```

Make sure your installation finished well and post installs finishes successfully, watch out for `node-sass`

## Available Scripts

In the project directory, you can run:

### `npm run start:dev` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information in case you want to customize deployment.

### `npm start` or `yarn start`

This script is meant for production runing of application, it is used by production servers for starting the application on deployment, crashes and server down times.

### `npm run serve` or `yarn serve`

**Note: You have to `build` app before serving it.**

Runs built app on `http://localhost:5000` and `http://{your.network.ip}:5000`

In order to change public url you have to update:

For more details check official [create-react-app deployment](https://facebook.github.io/create-react-app/docs/deployment#building-for-relative-paths) and [serve-handler options](https://github.com/zeit/serve-handler#options).

### `npm run lint` / `yarn lint`

Runs eslint on `src` directory.

### `npm run format` / `yarn format`

Runs prettier on `src` directory.

### `npm run eject` / `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
