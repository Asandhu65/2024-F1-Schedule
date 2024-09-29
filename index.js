import { getLocalTimes } from "./modules.js";
import { ConvertLocalTime } from "./modules.js";
import { ConvertLocalDate } from "./modules.js";

// Function to fetch data from the API
async function fetchRaceData() {
  try {
    const response = await fetch("https://ergast.com/api/f1/current.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function getRaceData() {
  const data = await fetchRaceData();

  if (!data) {
    console.error("No race data available.");
    return null;
  }

  async function getRaceTimeAndDate(data, raceIndexes) {
    const raceTimes = {};

    for (const index of raceIndexes) {
      const race = data.MRData.RaceTable.Races[index];
      if (race) {
        const raceTime = race.time;
        const raceDate = race.date;
        raceTimes[`Race${index + 1}`] = `${raceDate}T${raceTime}`;
      } else {
        raceTimes[`Race${index + 1}`] = null; // Handle invalid or non-existent race index
      }
    }

    return raceTimes;
  }
  const raceTimes = await getRaceTimeAndDate(
    data,
    [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ]
  );

  // Retrieve local times for practices and qualifying
  const practicesToGet = [
    "FirstPractice",
    "SecondPractice",
    "ThirdPractice",
    "Qualifying",
  ];

  const localSessionTimesBahrain = getLocalTimes(data, 0, practicesToGet);
  const localSessionTimesSaudi = getLocalTimes(data, 1, practicesToGet);

  return { raceTimes, localSessionTimesBahrain, localSessionTimesSaudi };
}

async function main() {
  const { raceTimes, localSessionTimesBahrain, localSessionTimesSaudi } =
    await getRaceData();

  if (!raceTimes || !localSessionTimesBahrain || !localSessionTimesSaudi)
    return;

  // Extracting data for Bahrain
  const bahrainRaceDateTime = raceTimes.Race1; // Get race time for Bahrain
  const firstPracBahrain = localSessionTimesBahrain.FirstPractice;
  const secondPracBahrain = localSessionTimesBahrain.SecondPractice;
  const thirdPracBahrain = localSessionTimesBahrain.ThirdPractice;
  const qualifyingBahrain = localSessionTimesBahrain.Qualifying;

  const saudiRaceDateTime = raceTimes.Race2; // Get race time for Saudi
  const firstPracSaudi = localSessionTimesSaudi.FirstPractice;
  const secondPracSaudi = localSessionTimesSaudi.SecondPractice;
  const thirdPracSaudi = localSessionTimesSaudi.ThirdPractice;
  const qualifyingSaudi = localSessionTimesSaudi.Qualifying;

  // Convert times for display
  const bahrainRaceTime = new ConvertLocalTime(bahrainRaceDateTime);
  const bahrainRaceDate = new ConvertLocalDate(bahrainRaceDateTime);
  const saudiRaceTime = new ConvertLocalTime(saudiRaceDateTime);
  const saudiRaceDate = new ConvertLocalDate(saudiRaceDateTime);

  const bahrainData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(
              firstPracBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracBahrain).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(
              secondPracBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracBahrain).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(
              thirdPracBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracBahrain).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(
              qualifyingBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingBahrain).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${bahrainRaceDate.getFormattedDate()}</td>
            <td>${bahrainRaceTime.getLocalDate()}</td>
          </tr>
        </tbody>
      </table>
    `;

  // Insert the table into the desired HTML element
  document
    .getElementById("bahrain")
    .insertAdjacentHTML("beforeend", bahrainData);

  const saudiData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(firstPracSaudi).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracSaudi).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(secondPracSaudi).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracSaudi).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(thirdPracSaudi).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracSaudi).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(qualifyingSaudi).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingSaudi).getLocalDate()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${saudiRaceDate.getFormattedDate()}</td>
            <td>${saudiRaceTime.getLocalDate()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document.getElementById("saudi").insertAdjacentHTML("beforeend", saudiData);
}

main();

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
