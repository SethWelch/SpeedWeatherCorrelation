$(document).ready(function() {
    createGraph("temperature");
});

let myChart = null;

async function createGraph(value) {
    try {
        let data = await getData()

        let formatted = formatData(data, value);

        var ctx = document.getElementById("myChart").getContext('2d');

        var options = {
            responsive: true, // Instruct chart js to respond nicely.
            maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'SPEED (Mbps)'
                    }
                }]
            }
        };

        if (myChart) {
            myChart.destroy();
        }

        // End Defining data
        myChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: value.toUpperCase() + ' VS SPEED', // Name the series
                    data: formatted, // Specify the data values array
                    borderColor: '#2196f3', // Add custom color border            
                    backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                }]
            },

            options: options
        });
    } catch (e) {
        console.log(e)
    }
}

function getData() {
    console.log("Starting")

    return $.ajax({
        url: "http://localhost:5000/api/data",
        type: "GET",
        dataType: 'json'
    })
}

function formatData(data, value) {
    let plotData = [];
    let parsed = JSON.parse(data);

    parsed.forEach((point) => {
        plotData.push({
            x: point[value],
            y: point.speed
        });
    });

    console.log(plotData)

    return plotData;
}

function selectChange(selector) {
    let value = selector.value;
    createGraph(value)
}