# stocks-mobile-app

A stock market mobile app that should show all stocks listed in the Nasdaq exchange im plemented using React Native

## Installation

In the directory of the app, we will need to install our node modules

```
npm i
```

- Using ios we require a further step to install its pods

```
cd ios
pod install
cd ..
```

## Launch

To launch our application

- For iOS

  ```
  npm run ios
  ```

- For android
  ```
  npm run android
  ```

## API Setup

This stocks app is integrated with Polygon.io API to get its data to populate it.
You will need to generate API Key to use Polygons features.

- To generate API key you'll need to sign up to Polygon.io
- To add API Key you will add it to its corresponding part in the .env file
  ```
  POLYGON_API_KEY=your_api_key
  ```

## Usage and features

- Displaying stocks
- Searching stocks
- Fetching more stocks upon scrolling to the end

## Notes

- This app is built upon React Native CLI 0.76, it has a library called 'glog' in its node modules that breaks the pod install in the iOS, thus preventing the building on iOS environment. I suggest setting up an android environment to be seen clearly

- I have commented out the functionality that brings in icons because it takes too much API calls for each one that simply exhausts the free trial of the generated API Key upon sign up
