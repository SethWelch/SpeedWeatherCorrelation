const cron = require('node-cron');
const FastSpeedtest = require("fast-speedtest-api");
const fs = require('fs');
const moment = require('moment');
const request = require('request');

require('dotenv').config()

function speedTest() {
    try {
        let speed = new FastSpeedtest({
            token: process.env.SPEED_TEST_TOKEN,
            verbose: false,
            timeout: 10000,
            https: true,
            urlCount: 5,
            bufferSize: 8,
            unit: FastSpeedtest.UNITS.Mbps
        });

        return speed.getSpeed();
    } catch (e) {
        console.log(e);
        return 0;
    }
}

async function weatherTest() {
    let url = `http://api.openweathermap.org/data/2.5/weather?` +
        `zip=${process.env.WEATHER_LOCATION}&APPID=${process.env.WEATHER_API_KEY}&units=imperial`

    return new Promise((resolve, reject) => {
        request(url, function(err, response, body) {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

async function runApp() {
    try {
        let weather = await weatherTest();
        let speed = await speedTest();
        let obj = [];
        let fileName = 'data.json';

        if (speed === 0) {
            console.log("Speedtest was unsuccessful, this point will not be recorded");
            return;
        }

        let data = {
            'pressure': weather.main.pressure,
            'humidity': weather.main.humidity,
            'visibility': weather.visibility,
            'clouds': weather.clouds.all,
            'wind': weather.wind.speed,
            'temperature': weather.main.temp.toFixed(2),
            'speed': speed.toFixed(2),
            'time': moment().unix()
        };

        if (fs.existsSync(fileName)) {
            let dataPromise = new Promise((resolve, reject) => {
                fs.readFile(fileName, 'utf8', (err, data) => {
                    if (err) reject(err);

                    if (data) {
                        resolve(JSON.parse(data));
                    } else {
                        resolve(obj);
                    }
                })
            });

            obj = await dataPromise;
        }

        obj.push(data);

        fs.writeFile(fileName, JSON.stringify(obj), (err) => { if (err) throw err; });

        console.log("Finished Cron");

    } catch (e) {
        console.log(e);
    }
}

cron.schedule('*/2 * * * *', () => {
    console.log("Starting Cron");
    runApp();
});