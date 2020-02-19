document.addEventListener('DOMContentLoaded', searchWeather);

function searchWeather() {
    document.getElementById("getWeather").addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var key = "95a22beef22f4b88ea9e2f2a432920c4";

        var zipCode = document.getElementById("zipCode").value;
        var city = document.getElementById("city").value;

        if (city === '') {              // if city is not entered, use the zipCode instead
            payload = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&units=imperial&appid=" + key; 
        } else {
            payload = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&units=imperial&appid=" + key;
        }

        req.open("GET", payload, true);

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                displayWeather(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });

        req.send(JSON.stringify(payload));          // perform asychronously
        event.preventDefault();
    });

    document.getElementById('postSubmit').addEventListener('click', function(event) {
        var key = "ea86a4e01bf5414b259261012c1486c9"

        var req = new XMLHttpRequest();
        var payload = {
            'writeOut': null
        };

        payload.writeOut = document.getElementById("writeIn").value;

        req.open('POST', 'http://httpbin.org/post', true);
        req.setRequestHeader("Content-Type", "application/json");

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                displayResponse(response);
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });

        req.send(JSON.stringify(payload));
        event.preventDefault();
    });
}

function displayWeather(response) {
    document.getElementById("temp").textContent = response.main.temp;
    document.getElementById("weatherSpeed").textContent = response.wind.speed;
}

function displayReponse(response) {
    document.getElementById("responseOutput").textContent = response.writeOut;
}