

## **How to use the cron:**

Setup the .env file.  It needs to be in the same directory as this readme and should contain the following fields:
```
# WEATHER
WEATHER_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
WEATHER_LOCATION="99999"

# SPEED TEST
SPEED_TEST_TOKEN="YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm"
```

Start the cron job that will retrieve the necesary data:
``` 
# Install the dependencies
npm install 

# Start the cron
npm start
```
<br>

## **Get the OpenWeatherMap API**

You will only need a free account, since this will provide 60 calls per minute. After creating your account, you will need to get your api key and add it to your .env file.

[OpenWeatherMap](https://openweathermap.org/appid)

<br>

## **Get the Speedtest Token**

This step is a little more tricky.  You will need to go to the Fast site.  Inspect the page, switch to the network tab, and refresh the page.  Refresh and look for a file that contains:

https://api.fast.com/netflix/speedtest/v2?https=true&token=TOKEN&urlCount=5

Take the token from the url and paste it into your .env file

[Fast.com](https://fast.com/)
