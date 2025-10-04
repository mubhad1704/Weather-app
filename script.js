const apiKey = 'cd0d39edf22b7dc68ac9ca51b7519c20'

function search() {
    const input = document.getElementById('searchInput').value;
    if (searchInput.value.trim() != "") {
        // console.log(input);
        searchInput.value = ""
        updateWeather(input)
    }
    else {
        alert('Enter any city name')
    }

}
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search();
    }
});

async function getFetchData(endPoint, city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiURL)
    return response.json()
}

function getWeatherIcon(id) {
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 622) return 'snow.svg'
    if(id <= 781) return 'atmosphere.svg'
    if(id == 800) return 'clear.svg'
    if(id <= 804) return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options)
}


async function updateWeather(city) {
    const weatherData = await getFetchData('weather', city)
    // console.log(weatherData);
    if(weatherData.cod != 200){
        alert("Enter a valid city name")
        return
    }
    const {
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}

    } = weatherData

    const cityName = document.getElementById('cityName')
    const date = document.getElementById('date')
    const temperature = document.getElementById('temp')
    const description = document.getElementById('description')
    const humi = document.getElementById('humidity')
    const wind = document.getElementById('wind')
    const icon = document.querySelector('.weather-icon')

    cityName.textContent = country
    temperature.textContent = Math.round(temp) + '° C'
    description.textContent  = main
    humi.textContent = humidity + ' %'
    wind.textContent = speed + ' m/s'
    icon.src = `assets/weather/${getWeatherIcon(id)}`

    date.textContent = getCurrentDate()
}




