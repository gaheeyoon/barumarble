const status = document.querySelector("#status");
const mapLink = document.querySelector("#map-link");
const recommendCity = document.querySelector("#recommendCity");
const distance = 70 * 1000;

mapLink.href = "";
mapLink.textContent = "";

const nearCityList = [];
let index = 0;

const barumarble = async () => {
    const {lat, lon} = await getCoordinate();

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${lat}/${lon}`;
    mapLink.textContent = `위도: ${lat} °, 경도: ${lon} °`;

    console.log(lat, lon)

    const nearCity = getNearCity(lat, lon);
    startTextChange();
}

const getPos = () => {
    console.log("getPos");

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const getCoordinate = async () => {
    status.textContent = "위치 파악 중…";

    if (navigator.geolocation) {
		const position = await getPos();
		return {
			lat: position.coords.latitude,
			lon: position.coords.longitude
		};
    }else {
        status.textContent = "브라우저가 위치 정보를 지원하지 않음";
    }

    return coordinate;
};


function getNearCity(lat, lon) {
    for(i=0; i<data.length; i++) {
        let city = data[i];

        if( getDistance(lat, lon, city.lat, city.lon) < distance ) {
            console.log(city.city);
            nearCityList.push(data[i]);
        }
    }
}

// intervalID를 저장할 변수입니다
let nIntervId;

function startTextChange() {
  // 간격이 이미 설정되어 있는지 확인합니다
  if (!nIntervId) {
    nIntervId = setInterval(flashText, 100);
  }
}

function flashText() {
    recommendCity.textContent = nearCityList[index++].city;

    if(index == nearCityList.length) {
        index = 0;
    }
}

function stopTextChange() {
  clearInterval(nIntervId);
  // 변수에서 intervalID를 해체합니다
  nIntervId = null;
}

document.querySelector("#start").addEventListener("click", barumarble);
document.querySelector("#stop").addEventListener("click", stopTextChange);
