var main = function() {
	var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'];
	var months = ['Janary', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	function get_data(callback) {
		API = '822266192460701c81c153fe3876a2ab';
		var request_api = new XMLHttpRequest();
		request_api.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q='+ document.querySelector('.widget__choose_city').value + '&units=metric&APPID=' + API);
		request_api.onreadystatechange = function() {
				// alert(request_api.readyState + " " + request_api.status);
				if (request_api.readyState == 4 && request_api.status == "200") {
					callback(request_api.responseText);
				}
			};
		request_api.send(null);
	}

	function init() {
		get_data(function(response) {
			var actual_JSON = JSON.parse(response);
			if (actual_JSON.city['name'] !== document.querySelector('.widget__choose_city').value) {
				document.querySelector('.widget__choose_city').value = 'please, repeat, wrong city';
			} else {
				var time = new Date(Date.now());
				document.querySelector('.widget__main-temp').innerHTML = parseInt(actual_JSON.list[0].main['temp']);
				document.querySelector('.widget__left-text_dark').innerHTML = actual_JSON.list[0].weather[0]['main'];
				document.querySelector('.widget__left-text_red').innerHTML = actual_JSON.city['name'] + ' - ' + weekdays[time.getDay()] + ', ' + months[time.getMonth()] + ' ' + time.getDate();
				var weather_query = document.querySelectorAll('.widget__right-elem')
				var week_day = time.getDay();
				var today = new Date(Date.now()).getDay();
				for (var i = 0; i < weather_query.length; i++) {
					weather_query[i].children[1].innerHTML = weekdays[week_day].slice(0,3);
					for (var j = 0; j < actual_JSON.list.length; j++) {
						var txt_date = new Date(actual_JSON.list[j]['dt_txt'].slice(0,10));
						if (txt_date.getDay() === today && parseInt(actual_JSON.list[j]['dt_txt'].slice(10, actual_JSON.list[j]['dt_txt'].length)) / 15 === 1) {
							weather_query[i].children[2].innerHTML = parseInt(actual_JSON.list[j]['main']['temp_max']) + '˚C';
							if (j === 0) {
								weather_query[i].children[3].innerHTML = parseInt(actual_JSON.list[j]['main']['temp_min']) + '˚C';
							}
						}
						if (txt_date.getDay() === today && parseInt(actual_JSON.list[j]['dt_txt'].slice(10, actual_JSON.list[j]['dt_txt'].length)) / 3 === 1) {
							weather_query[i].children[3].innerHTML = parseInt(actual_JSON.list[j]['main']['temp_min']) + '˚C';
						} 
					}
					today++;
					if (week_day === 6) week_day = 0;
					week_day++;
				}
			}
		})
	}


	var input_choose_city = document.querySelector('.widget__choose_button')
	input_choose_city.addEventListener('click', function(event){
			init();
	})
}();