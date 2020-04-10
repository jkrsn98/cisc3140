# Assignment 9 - API Client

This is a small weather app using [Dark Sky's weather API](https://darksky.net/dev) along with Google's [Geocode](https://developers.google.com/maps/documentation/geocoding/start) and [Timezone](https://developers.google.com/maps/documentation/timezone/start) APIs.


----------

The purpose of the app is to provide the current weather at any given location in the simplest way possible: providing the temperature and letting you know if it's windy or raining.

----------

The user is prompted on the first page to enter their location. This information is used to call the Google Geocode API which returns the coordinates of the location entered. Those coordinates are then used to make a call to the Google Timezone API and the Dark Sky weather API. It pulls data from the calls to provide a very simple look at the current weather and local environment.

For every given user input, the following output can be expected:

 - Day/Night (doesn't take into account edge cases of locations far from the equator:
*e.g* a local time indicating morning in northern Russia will display a blue sky, despite the possibility of a polar night.
 - Temperature (in Fahrenheit).
 - A message indicating rain or wind. Otherwise a generalised greeting is provided.
