

let getCity = document.getElementById('getCity'),
current_city = document.getElementById('city'),
 Temp = document.getElementById('temp'),
 feelslike = document.getElementById('feels_like'),
 Humidity = document.getElementById('humidity'),
 Maxtemp = document.getElementById('max_temp'),
 Mintemp = document.getElementById('min_temp'),
 Sunrise = document.getElementById('sunrise'),
 Sunset= document.getElementById('sunset'),
 Windspeed= document.getElementById('wind_speed'),
 cloud_pct= document.getElementById('cloud_pct'),
 bx_search= document.querySelector('.bx-search'),
 img= document.querySelector('#img')


 let url =''
// console.log(url);
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fd54f76eb3mshb1c949b94a062bdp14dc2cjsn6980b003f3de',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
  }

function convertMsToTime(milliseconds) {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
  
	minutes = minutes % 60;
	hours = hours % 24;
  
	 return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
	
  }



//   url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + searchCity;
function loadData(city){
	url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;

	fetch(url,options).then(res=>res.json()).then(reponse =>{
	
		Temp.innerHTML =  reponse.temp+'<sup>.c</sup>' ;
		feelslike.innerText =reponse.feels_like ;
		Humidity.innerText = reponse.humidity ;
		Maxtemp.innerHTML = reponse.max_temp +"<sup>.c</sup>";
		Mintemp.innerHTML =  reponse.min_temp +"<sup>.c</sup>";
		Sunrise.innerText =convertMsToTime(reponse.sunrise) ;
		Sunset.innerText = convertMsToTime(reponse.sunset);
		Windspeed.innerText = reponse.wind_speed;
		cloud_pct.innerText = reponse.cloud_pct;
		current_city.innerText = city;
		if(reponse.temp <= 16){
			img.src = './img/images.png';
		}else{
			img.src = './img/images.jpg';

		}

	}).catch(()=>{
		console.log('fetch error');
	})

}


loadData('karachi')
let searchCity ;
bx_search.addEventListener('click',(e)=>{

	searchCity = getCity.value
	loadData(searchCity)
	getCity.value = ''
	document.addEventListener('loadeddata',()=> loadData(searchCity))
	})

	
document.addEventListener('keydown',(e)=>{
	if(e.key == "Enter"){
		bx_search.click()
	}
})