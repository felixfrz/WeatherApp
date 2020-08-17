const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");
const hr = document.querySelector("hr");
const footer = document.querySelector("footer");
const updateUI = (data) => {
  console.log(data);
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  //destructure properties

  const { cityDets, weather } = data;

  // update detials template

  details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">
         ${weather.WeatherText}
        </div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
    `;
  // update the night and day & icon images
  const iconScr = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconScr);
  let timeScr = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  // if(weather.IsDayTime){
  //     timeScr = 'img/day.svg';
  // } else {
  //     timeScr = 'img/night.svg';
  // }
  time.setAttribute("src", timeScr);
  // remove the d-none class if present

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
  if (hr.classList.contains("d-none")) {
    hr.classList.remove("d-none");
  }
  if (footer.classList.contains("d-none")) {
    footer.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with the new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
