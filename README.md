# Weather App

**Summary**

Create a web-based weather application that allows users to search for a location in the USA to view its current weather conditions.


**User Journey**

1. Enter an address, city, or other location in the USA in the input field and submit the query.
2. Use the Nominatim API to convert the location entered by the user into latitude and longitude coordinates.
3. Use the latitude and longitude coordinates obtained from the geolocation API to fetch weather data from the National Weather Service API.
4. Display the weather information for the specified location.


**Essential Requirements**

1. Input and Submit: Provide an input field where users can enter an address, city, or
other location and a method for querying weather data based on user input.
2. Geolocation: Utilize the Nominatim API to convert the location entered by the user into
latitude and longitude coordinates.
3. Weather: Fetch weather data from the National Weather Service API using the latitude
and longitude coordinates obtained from the geolocation API.
4. Display: Display the following weather information for the specified location:

- Temperature (in Fahrenheit)
- Description of the weather conditions
- Wind speed
- Detailed forecast


**Stretch Features**

- Multi-location Forecast: Enhance the application to support multiple locations
and display weather forecasts for each location in separate sections or tabs.
Allow users to add and remove cities from their list and customize their weather
dashboard.
- Unit Conversion: Provide users with the option to switch between different units
of measurement for temperature, wind speed, and other weather parameters.
Allow users to toggle between Fahrenheit and Celsius or miles per hour and
kilometers per hour.
- Backend Proxy Integration: Create a C# backend server that acts as a proxy to
handle requests to the Nominatim and National Weather Service APIs. Your
backend should receive requests from the frontend application and forward them
to the respective APIs. Ensure proper error handling and logging in the backend
to provide a reliable and efficient proxy service.


**Final Steps**

- Ensure error handling for cases such as invalid queries or failed API requests.
- Style the application to provide a responsive, user-friendly interface. You may use CSS or any
preferred styling library/framework. BONUS: Add advanced styles or animations to enhance the visual appeal.
- Clean up README.md - make sure it has clear instructions on how to run the application locally and any
additional information as necessary.


**Submission**

- Deploy the application and provide a live demo link
- Provide a GitHub repository link containing the source code of this weather application.