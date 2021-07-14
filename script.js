const API_KEY = "b0254b70d4877843015dd7ddf254451e";

const name_head = document.getElementById('city_name');
const temp = document.getElementById('temp');
const min = document.getElementById('min');
const max = document.getElementById('max');
const rain = document.getElementById('rain');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const wind = document.getElementById('wind');
const status = document.getElementById('status');
const img = document.getElementById('icon');
const list = document.querySelector('ul');

function submit_click(){
    const city_name = document.getElementById('search_city').value;
    console.log(city_name);
    get_weather_data(city_name);
    

}
function close_info(){
    document.getElementsByClassName('info')[0].classList.add('hidden');
    document.getElementsByClassName('search')[0].classList.remove('hidden')
}
function get_weather_data(city_name){
    document.getElementsByClassName('search')[0].classList.add('hidden')
    document.getElementsByClassName('loading')[0].classList.remove('hidden')
    console.log("inside");
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        name_head.innerHTML = response.name;
        temp.innerHTML = `${response.main.temp}°C`;
        min.innerHTML = `${response.main.temp_min}°C`;
        max.innerHTML = `${response.main.temp_max}°C`;
        humidity.innerHTML = `${response.main.humidity}%`;
        pressure.innerHTML = `${response.main.pressure} hPa`;
        wind.innerHTML = `${response.wind.speed} m/s ${response.wind.deg} °`;
        status.innerHTML = `${response.weather[0].description.toUpperCase()}`;
        if (response.rain){
            rain.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i> ${response.rain["1h"]} mm/hr`;
    }


    img.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
    document.getElementsByClassName('loading')[0].classList.add('hidden');
    document.getElementsByClassName('info')[0].classList.remove('hidden');
    
    }).catch((e) =>{
        document.getElementsByClassName('loading')[0].classList.add('hidden')
        document.getElementsByClassName('info')[0].innerHTML = "<h1>Invalid City Name</h1>"
        document.getElementsByClassName('info')[0].classList.remove('hidden');
    })
 



    
}
