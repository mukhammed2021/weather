const inputCity = document.querySelector("input");
const searchButton = document.querySelector("button");

const weather = document.querySelector("[data-weather]");

searchButton.addEventListener("click", () => {
   getWeather(inputCity.value);
});

const getWeather = async (cityName) => {
   try {
      const metaCity = await fetch(
         `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=jNohf1ZGh5Spud9gGshbaPgS8h6c4hgc&q=${cityName}`,
      );
      const dataCity = await metaCity.json();

      const cityKey = dataCity[0].Key;

      const metaWeather = await fetch(
         `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=jNohf1ZGh5Spud9gGshbaPgS8h6c4hgc&q=${cityName}`,
      );
      const dataWeather = await metaWeather.json();

      weather.children.length === 0 ? weather : (weather.innerHTML = "");

      weather.insertAdjacentHTML(
         "beforeend",
         `
         <div>
            <div class="text-xl text-stone-600 [&:not(:last-child)]:mb-4">${dataCity[0].EnglishName}</div>
            ${dataWeather[0].IsDayTime ? `<img class="mx-auto [&:not(:last-child)]:mb-4" src="./img/day.svg" alt="day">` : `<img class="mx-auto [&:not(:last-child)]:mb-4" src="./img/night.svg" alt="night">`}
            <div class="text-5xl text-sky-900">${Math.floor(dataWeather[0].Temperature.Metric.Value)} °${dataWeather[0].Temperature.Metric.Unit}</div>
         </div>
      `,
      );

      // console.log(dataWeather[0]);
      // console.log(dataCity[0]);
   } catch (error) {
      weather.children.length === 0 ? weather : (weather.innerHTML = "");

      weather.insertAdjacentHTML(
         "beforeend",
         `
         <div class="text-red-500">Error! Please enter city name!</div>
      `,
      );
   }
};
