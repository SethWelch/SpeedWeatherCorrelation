# **SpeedWeatherCorrelation**

This app contains both a backend (responsible for pulling weather data, testing current internet speeds, and writing this to a file) and a frontend to display this information.  Once the backend applcation is started, it will pull this information every 2 minutes by default, until stopped.

<br>

## **The reasoning behind this is threefold:**

* First, my internet is wireless.  This is unfortunately the best I can get in the rural area I live in.
* Second, the arctic vortex has reached the area I live in.  So extreme temperature and snowfall have recently beset my home.
* Finally and most importantly, my internet has been abysmal since this storm hit... I'm also just bored.

<br>

## **What you need**

### For the backend cron:

* **Npm:** To install all the node packages
* **OpenWeatherMap Api Key:** See the readme inside the sw-cron directory
* **Speedtest Token:** See the readme inside the sw-cron directory
* **Clone this project:** Well this one should be obvious

### For the frontend:

* Python2 is required to start the server

<br>

## How to use the app

First you will need to collect data to be displayed.  After cloning the project, cd into the sw-cron directory and run the following:

``` 
# Install the dependencies
npm install 

# Start the cron
npm start
```

As mentioned above, the data will be pulled every 2 minutes and recorded as json into a file.  The frontend will pull this information once we start it.  I never ran into any issues reading and writing to the same file.  However, I would still suggest stopping the cron before using the frontend.  After you are happy with the amount of data you have, use ctrl+c to stop the cron.  Now it is time to start the frontend.  Make sure you have changed your directory back to the root of this project and run:

``` 
# Start the frontend server
python main.py
```

Once the server has started, it will tell you that your page is being hosted at http://127.0.0.1:5000/ . By going there you will now see all of the data you have collected on a graph.  You can use the dropdown to select what you would like to compare vs your speed.

## What were my findings?
I cannot really answer this.  The storm passed and my internet was fixed around the same time.  However, this was a fun project!