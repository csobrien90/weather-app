# Weather App

*A web-based weather application that allows users to search for a location in the USA to view its current weather conditions.*


## Getting Started

### Installation

1. Clone the repository to your local machine.
2. `cd` into the project directory and `npm install` to install the project dependencies
3. `npm start` to start the development server
4. Open your web browser and navigate to the virtual server address (check the terminal for the address)

### UI Testing

This project uses Vitest for testing. To run the tests, use the command `npm test`. To view the test coverage, use the command `npm run coverage`.

## Deployment

This project is deployed as a static site via [a public AWS S3 Bucket](https://csobrien90-weather-app-demo.s3.us-east-2.amazonaws.com/index.html)

### Lambda Function Serverless Backend

This project utilizes a serverless backend to handle the API request to the Geoapify Autocomplete API. It is written in C# and deployed as an AWS Lambda function. This allows for the frontend to be deployed as a static site and for the Geoapify API key to be hidden as an environment variable in the Lambda. The source code for this function is in [my respository on GitHub](https://github.com/csobrien90/geoapify-automation-lambda)


## Technologies Used

### Stack

- React
- TypeScript
- Vite
- Vitest
- Lambda (written in C#, in a separate repository linked above)

### APIs

- Geoapify (for address autocomplete)
- Nominatim (for geolocation)
- National Weather Service (for weather data)


## Next Steps

### Known Bugs and Issues

- There are a few CSS browser compatibility issues that need to be addressed: link styles, autocomplete dropdown behavior, etc.
- The app handles errors by failing gracefully and passing the error message to the user, but the error messages are not very user-friendly. They should be more descriptive and instructive.

### New Features

- Multiple, saved locations
- Unit conversion for temperature and wind speed
- Toggle between different views (i.e. 3-day vs. 7-day forecasts)
- Complete UI testing coverage and extend to `lib` directory with e2e tests