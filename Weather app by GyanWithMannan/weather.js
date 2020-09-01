window.onload=function(){
	document.querySelector('.searchBar').value='';
}

const api_details={
	url: "http://api.openweathermap.org/data/2.5/",
	api_key:"60bbd59ec7556e88c0f6b5a2080aebaa"
}

const input=document.querySelector('.searchBar');
input.addEventListener('keypress',showData)



function showData(e){
	if(e.keyCode===13){
		showResults(input.value);
		//console.log(input.value);
		//console.log('Hello')
	}
	//e.preventDefault();
}

async function showResults(value){
	const data=await fetch(`${api_details.url}weather?q=${value}&units=metric&APPID=${api_details.api_key}`)
	const fdata=await data.json();
	console.log(fdata)
	if(fdata.message==="city not found"){
		const ele=document.createElement('h1')
		ele.className="heady"
		ele.appendChild(document.createTextNode("City Not Found"))

		// const ddd=document.querySelector('.box');
		const fff=document.querySelector('.temperature');

		// fff.insertBefore(ele,ddd);
		fff.appendChild(ele)
		console.log('lol')
	}
	else{
		displayData(fdata);
	}
}

function displayData(data){
	const location_city=document.querySelector('.city');
	location_city.innerText=`${data.name},${data.sys.country}`

	let time=new Date();
	const date=document.querySelector('.date');

	let months_year=["January","February","March","April","May","June","July","August","September","October","November","December"];
	let days_week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

	let day=days_week[time.getDay()];
	let presentDate=time.getDate();
	let month=months_year[time.getMonth()];
	let year=time.getFullYear();

	date.innerText=`${day} ${presentDate} ${month} ${year}`

	const tempp=document.querySelector('.temp');
	tempp.innerHTML=`${Math.round(data.main.temp)}
			<span>&#730C</span>`

	const type=document.querySelector('.temp-type');
	type.innerText=`${data.weather[0].main}`

	const lowHigh=document.querySelector('.temp-range');
	lowHigh.innerHTML=`${Math.round(data.main.temp_min)}<span>&#730C</span>/${Math.round(data.main.temp_max)}<span>&#730C</span>`
}
