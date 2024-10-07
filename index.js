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

  const practicesToGetSprint = [
    "FirstPractice",
    "SecondPractice",
    "Qualifying",
    "Sprint",
  ];

  const localSessionTimesBahrain = getLocalTimes(data, 0, practicesToGet);
  const localSessionTimesSaudi = getLocalTimes(data, 1, practicesToGet);
  const localSessionTimesAustralia = getLocalTimes(data, 2, practicesToGet);
  const localSessionTimesJapan = getLocalTimes(data, 3, practicesToGet);
  const localSessionTimesChina = getLocalTimes(data, 4, practicesToGetSprint);
  const localSessionTimesMiami = getLocalTimes(data, 5, practicesToGetSprint);
  const localSessionTimesEmilia = getLocalTimes(data, 6, practicesToGet);
  const localSessionTimesMonaco = getLocalTimes(data, 7, practicesToGet);
  const localSessionTimesCanada = getLocalTimes(data, 8, practicesToGet);
  const localSessionTimesSpain = getLocalTimes(data, 9, practicesToGet);
  const localSessionTimesAustria = getLocalTimes(
    data,
    10,
    practicesToGetSprint
  );
  const localSessionTimesBritish = getLocalTimes(data, 11, practicesToGet);
  const localSessionTimesHungary = getLocalTimes(data, 12, practicesToGet);
  const localSessionTimesBelgian = getLocalTimes(data, 13, practicesToGet);
  const localSessionTimesDutch = getLocalTimes(data, 14, practicesToGet);
  const localSessionTimesItaly = getLocalTimes(data, 15, practicesToGet);
  const localSessionTimesAzerbaijan = getLocalTimes(data, 16, practicesToGet);
  const localSessionTimesSingapore = getLocalTimes(data, 17, practicesToGet);
  const localSessionTimesUSA = getLocalTimes(data, 18, practicesToGetSprint);
  const localSessionTimesMexico = getLocalTimes(data, 19, practicesToGet);
  const localSessionTimesBrazil = getLocalTimes(data, 20, practicesToGetSprint);
  const localSessionTimesVegas = getLocalTimes(data, 21, practicesToGet);
  const localSessionTimesQatar = getLocalTimes(data, 22, practicesToGetSprint);
  const localSessionTimesAbuDhabi = getLocalTimes(data, 23, practicesToGet);

  return {
    raceTimes,
    localSessionTimesBahrain,
    localSessionTimesSaudi,
    localSessionTimesAustralia,
    localSessionTimesJapan,
    localSessionTimesChina,
    localSessionTimesMiami,
    localSessionTimesEmilia,
    localSessionTimesMonaco,
    localSessionTimesCanada,
    localSessionTimesSpain,
    localSessionTimesAustria,
    localSessionTimesBritish,
    localSessionTimesHungary,
    localSessionTimesBelgian,
    localSessionTimesDutch,
    localSessionTimesItaly,
    localSessionTimesAzerbaijan,
    localSessionTimesSingapore,
    localSessionTimesUSA,
    localSessionTimesMexico,
    localSessionTimesBrazil,
    localSessionTimesVegas,
    localSessionTimesQatar,
    localSessionTimesAbuDhabi,
  };
}

async function main() {
  const {
    raceTimes,
    localSessionTimesBahrain,
    localSessionTimesSaudi,
    localSessionTimesAustralia,
    localSessionTimesJapan,
    localSessionTimesChina,
    localSessionTimesMiami,
    localSessionTimesEmilia,
    localSessionTimesMonaco,
    localSessionTimesCanada,
    localSessionTimesSpain,
    localSessionTimesAustria,
    localSessionTimesBritish,
    localSessionTimesHungary,
    localSessionTimesBelgian,
    localSessionTimesDutch,
    localSessionTimesItaly,
    localSessionTimesAzerbaijan,
    localSessionTimesSingapore,
    localSessionTimesUSA,
    localSessionTimesMexico,
    localSessionTimesBrazil,
    localSessionTimesVegas,
    localSessionTimesQatar,
    localSessionTimesAbuDhabi,
  } = await getRaceData();

  if (
    !raceTimes ||
    !localSessionTimesBahrain ||
    !localSessionTimesSaudi ||
    !localSessionTimesAustralia ||
    !localSessionTimesJapan ||
    !localSessionTimesChina ||
    !localSessionTimesMiami ||
    !localSessionTimesEmilia ||
    !localSessionTimesMonaco ||
    !localSessionTimesCanada ||
    !localSessionTimesSpain ||
    !localSessionTimesAustria ||
    !localSessionTimesBritish ||
    !localSessionTimesHungary ||
    !localSessionTimesBelgian ||
    !localSessionTimesDutch ||
    !localSessionTimesItaly ||
    !localSessionTimesAzerbaijan ||
    !localSessionTimesSingapore ||
    !localSessionTimesUSA ||
    !localSessionTimesMexico ||
    !localSessionTimesBrazil ||
    !localSessionTimesVegas ||
    !localSessionTimesQatar ||
    !localSessionTimesAbuDhabi
  )
    return;

  // Extracting data
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

  const australiaRaceDateTime = raceTimes.Race3; // Get race time for Australia
  const firstPracAustralia = localSessionTimesAustralia.FirstPractice;
  const secondPracAustralia = localSessionTimesAustralia.SecondPractice;
  const thirdPracAustralia = localSessionTimesAustralia.ThirdPractice;
  const qualifyingAustralia = localSessionTimesAustralia.Qualifying;

  const japanRaceDateTime = raceTimes.Race4; // Get race time for Japan
  const firstPracJapan = localSessionTimesJapan.FirstPractice;
  const secondPracJapan = localSessionTimesJapan.SecondPractice;
  const thirdPracJapan = localSessionTimesJapan.ThirdPractice;
  const qualifyingJapan = localSessionTimesJapan.Qualifying;

  const chinaRaceDateTime = raceTimes.Race5; // Get race time for China
  const firstPracChina = localSessionTimesChina.FirstPractice;
  const secondPracChina = localSessionTimesChina.SecondPractice;
  const thirdPracChina = localSessionTimesChina.Sprint;
  const qualifyingChina = localSessionTimesChina.Qualifying;

  const miamiRaceDateTime = raceTimes.Race6; // Get race time for Miami
  const firstPracMiami = localSessionTimesMiami.FirstPractice;
  const secondPracMiami = localSessionTimesMiami.SecondPractice;
  const thirdPracMiami = localSessionTimesMiami.Sprint;
  const qualifyingMiami = localSessionTimesMiami.Qualifying;

  const emiliaRaceDateTime = raceTimes.Race7; // Get race time for Emilia
  const firstPracEmilia = localSessionTimesEmilia.FirstPractice;
  const secondPracEmilia = localSessionTimesEmilia.SecondPractice;
  const thirdPracEmilia = localSessionTimesEmilia.ThirdPractice;
  const qualifyingEmilia = localSessionTimesEmilia.Qualifying;

  const monacoRaceDateTime = raceTimes.Race8; // Get race time for Monaco
  const firstPracMonaco = localSessionTimesMonaco.FirstPractice;
  const secondPracMonaco = localSessionTimesMonaco.SecondPractice;
  const thirdPracMonaco = localSessionTimesMonaco.ThirdPractice;
  const qualifyingMonaco = localSessionTimesMonaco.Qualifying;

  const canadaRaceDateTime = raceTimes.Race9; // Get race time for Canada
  const firstPracCanada = localSessionTimesCanada.FirstPractice;
  const secondPracCanada = localSessionTimesCanada.SecondPractice;
  const thirdPracCanada = localSessionTimesCanada.ThirdPractice;
  const qualifyingCanada = localSessionTimesCanada.Qualifying;

  const spainRaceDateTime = raceTimes.Race10; // Get race time for Spain
  const firstPracSpain = localSessionTimesSpain.FirstPractice;
  const secondPracSpain = localSessionTimesSpain.SecondPractice;
  const thirdPracSpain = localSessionTimesSpain.ThirdPractice;
  const qualifyingSpain = localSessionTimesSpain.Qualifying;

  const austriaRaceDateTime = raceTimes.Race11; // Get race time for Austria
  const firstPracAustria = localSessionTimesAustria.FirstPractice;
  const secondPracAustria = localSessionTimesAustria.SecondPractice;
  const thirdPracAustria = localSessionTimesAustria.Sprint;
  const qualifyingAustria = localSessionTimesAustria.Qualifying;

  const britishRaceDateTime = raceTimes.Race12; // Get race time for British
  const firstPracBritish = localSessionTimesBritish.FirstPractice;
  const secondPracBritish = localSessionTimesBritish.SecondPractice;
  const thirdPracBritish = localSessionTimesBritish.ThirdPractice;
  const qualifyingBritish = localSessionTimesBritish.Qualifying;

  const hungaryRaceDateTime = raceTimes.Race13; // Get race time for Hungary
  const firstPracHungary = localSessionTimesHungary.FirstPractice;
  const secondPracHungary = localSessionTimesHungary.SecondPractice;
  const thirdPracHungary = localSessionTimesHungary.ThirdPractice;
  const qualifyingHungary = localSessionTimesHungary.Qualifying;

  const belgianRaceDateTime = raceTimes.Race14; // Get race time for Belgian
  const firstPracBelgian = localSessionTimesBelgian.FirstPractice;
  const secondPracBelgian = localSessionTimesBelgian.SecondPractice;
  const thirdPracBelgian = localSessionTimesBelgian.ThirdPractice;
  const qualifyingBelgian = localSessionTimesBelgian.Qualifying;

  const dutchRaceDateTime = raceTimes.Race15; // Get race time for Dutch
  const firstPracDutch = localSessionTimesDutch.FirstPractice;
  const secondPracDutch = localSessionTimesDutch.SecondPractice;
  const thirdPracDutch = localSessionTimesDutch.ThirdPractice;
  const qualifyingDutch = localSessionTimesDutch.Qualifying;

  const italyRaceDateTime = raceTimes.Race16; // Get race time for Italy
  const firstPracItaly = localSessionTimesItaly.FirstPractice;
  const secondPracItaly = localSessionTimesItaly.SecondPractice;
  const thirdPracItaly = localSessionTimesItaly.ThirdPractice;
  const qualifyingItaly = localSessionTimesItaly.Qualifying;

  const azerbaijanRaceDateTime = raceTimes.Race17; // Get race time for Azerbaijan
  const firstPracAzerbaijan = localSessionTimesAzerbaijan.FirstPractice;
  const secondPracAzerbaijan = localSessionTimesAzerbaijan.SecondPractice;
  const thirdPracAzerbaijan = localSessionTimesAzerbaijan.ThirdPractice;
  const qualifyingAzerbaijan = localSessionTimesAzerbaijan.Qualifying;

  const singaporeRaceDateTime = raceTimes.Race18; // Get race time for Singapore
  const firstPracSingapore = localSessionTimesSingapore.FirstPractice;
  const secondPracSingapore = localSessionTimesSingapore.SecondPractice;
  const thirdPracSingapore = localSessionTimesSingapore.ThirdPractice;
  const qualifyingSingapore = localSessionTimesSingapore.Qualifying;

  const uSARaceDateTime = raceTimes.Race19; // Get race time for USA
  const firstPracUSA = localSessionTimesUSA.FirstPractice;
  const secondPracUSA = localSessionTimesUSA.SecondPractice;
  const thirdPracUSA = localSessionTimesUSA.Sprint;
  const qualifyingUSA = localSessionTimesUSA.Qualifying;

  const mexicoRaceDateTime = raceTimes.Race20; // Get race time for Mexico
  const firstPracMexico = localSessionTimesMexico.FirstPractice;
  const secondPracMexico = localSessionTimesMexico.SecondPractice;
  const thirdPracMexico = localSessionTimesMexico.ThirdPractice;
  const qualifyingMexico = localSessionTimesMexico.Qualifying;

  const brazilRaceDateTime = raceTimes.Race21; // Get race time for Brazil
  const firstPracBrazil = localSessionTimesBrazil.FirstPractice;
  const secondPracBrazil = localSessionTimesBrazil.SecondPractice;
  const thirdPracBrazil = localSessionTimesBrazil.Sprint;
  const qualifyingBrazil = localSessionTimesBrazil.Qualifying;

  const vegasRaceDateTime = raceTimes.Race22; // Get race time for Vegas
  const firstPracVegas = localSessionTimesVegas.FirstPractice;
  const secondPracVegas = localSessionTimesVegas.SecondPractice;
  const thirdPracVegas = localSessionTimesVegas.ThirdPractice;
  const qualifyingVegas = localSessionTimesVegas.Qualifying;

  const qatarRaceDateTime = raceTimes.Race23; // Get race time for Qatar
  const firstPracQatar = localSessionTimesQatar.FirstPractice;
  const secondPracQatar = localSessionTimesQatar.SecondPractice;
  const thirdPracQatar = localSessionTimesQatar.Sprint;
  const qualifyingQatar = localSessionTimesQatar.Qualifying;

  const abuDhabiRaceDateTime = raceTimes.Race24; // Get race time for AbuDhabi
  const firstPracAbuDhabi = localSessionTimesAbuDhabi.FirstPractice;
  const secondPracAbuDhabi = localSessionTimesAbuDhabi.SecondPractice;
  const thirdPracAbuDhabi = localSessionTimesAbuDhabi.ThirdPractice;
  const qualifyingAbuDhabi = localSessionTimesAbuDhabi.Qualifying;

  // Convert times for display
  const bahrainRaceTime = new ConvertLocalTime(bahrainRaceDateTime);
  const bahrainRaceDate = new ConvertLocalDate(bahrainRaceDateTime);

  const saudiRaceTime = new ConvertLocalTime(saudiRaceDateTime);
  const saudiRaceDate = new ConvertLocalDate(saudiRaceDateTime);

  const australiaRaceTime = new ConvertLocalTime(australiaRaceDateTime);
  const australiaRaceDate = new ConvertLocalDate(australiaRaceDateTime);

  const japanRaceTime = new ConvertLocalTime(japanRaceDateTime);
  const japanRaceDate = new ConvertLocalDate(japanRaceDateTime);

  const chinaRaceTime = new ConvertLocalTime(chinaRaceDateTime);
  const chinaRaceDate = new ConvertLocalDate(chinaRaceDateTime);

  const miamiRaceTime = new ConvertLocalTime(miamiRaceDateTime);
  const miamiRaceDate = new ConvertLocalDate(miamiRaceDateTime);

  const emiliaRaceTime = new ConvertLocalTime(emiliaRaceDateTime);
  const emiliaRaceDate = new ConvertLocalDate(emiliaRaceDateTime);

  const monacoRaceTime = new ConvertLocalTime(monacoRaceDateTime);
  const monacoRaceDate = new ConvertLocalDate(monacoRaceDateTime);

  const canadaRaceTime = new ConvertLocalTime(canadaRaceDateTime);
  const canadaRaceDate = new ConvertLocalDate(canadaRaceDateTime);

  const spainRaceTime = new ConvertLocalTime(spainRaceDateTime);
  const spainRaceDate = new ConvertLocalDate(spainRaceDateTime);

  const austriaRaceTime = new ConvertLocalTime(austriaRaceDateTime);
  const austriaRaceDate = new ConvertLocalDate(austriaRaceDateTime);

  const britishRaceTime = new ConvertLocalTime(britishRaceDateTime);
  const britishRaceDate = new ConvertLocalDate(britishRaceDateTime);

  const hungaryRaceTime = new ConvertLocalTime(hungaryRaceDateTime);
  const hungaryRaceDate = new ConvertLocalDate(hungaryRaceDateTime);

  const belgianRaceTime = new ConvertLocalTime(belgianRaceDateTime);
  const belgianRaceDate = new ConvertLocalDate(belgianRaceDateTime);

  const dutchRaceTime = new ConvertLocalTime(dutchRaceDateTime);
  const dutchRaceDate = new ConvertLocalDate(dutchRaceDateTime);

  const italyRaceTime = new ConvertLocalTime(italyRaceDateTime);
  const italyRaceDate = new ConvertLocalDate(italyRaceDateTime);

  const azerbaijanRaceTime = new ConvertLocalTime(azerbaijanRaceDateTime);
  const azerbaijanRaceDate = new ConvertLocalDate(azerbaijanRaceDateTime);

  const singaporeRaceTime = new ConvertLocalTime(singaporeRaceDateTime);
  const singaporeRaceDate = new ConvertLocalDate(singaporeRaceDateTime);

  const uSARaceTime = new ConvertLocalTime(uSARaceDateTime);
  const uSARaceDate = new ConvertLocalDate(uSARaceDateTime);

  const mexicoRaceTime = new ConvertLocalTime(mexicoRaceDateTime);
  const mexicoRaceDate = new ConvertLocalDate(mexicoRaceDateTime);

  const brazilRaceTime = new ConvertLocalTime(brazilRaceDateTime);
  const brazilRaceDate = new ConvertLocalDate(brazilRaceDateTime);

  const vegasRaceTime = new ConvertLocalTime(vegasRaceDateTime);
  const vegasRaceDate = new ConvertLocalDate(vegasRaceDateTime);

  const qatarRaceTime = new ConvertLocalTime(qatarRaceDateTime);
  const qatarRaceDate = new ConvertLocalDate(qatarRaceDateTime);

  const abuDhabiRaceTime = new ConvertLocalTime(abuDhabiRaceDateTime);
  const abuDhabiRaceDate = new ConvertLocalDate(abuDhabiRaceDateTime);

  const bahrainData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(
              firstPracBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracBahrain).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(
              secondPracBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracBahrain).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(
              thirdPracBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracBahrain).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(
              qualifyingBahrain
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingBahrain).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${bahrainRaceDate.getFormattedDate()}</td>
            <td>${bahrainRaceTime.getLocalTime()}</td>
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
            <td>${new ConvertLocalTime(firstPracSaudi).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(secondPracSaudi).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracSaudi).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(thirdPracSaudi).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracSaudi).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(qualifyingSaudi).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingSaudi).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${saudiRaceDate.getFormattedDate()}</td>
            <td>${saudiRaceTime.getLocalTime()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document.getElementById("saudi").insertAdjacentHTML("beforeend", saudiData);

  const australiaData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(
              firstPracAustralia
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracAustralia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(
              secondPracAustralia
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracAustralia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(
              thirdPracAustralia
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracAustralia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(
              qualifyingAustralia
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingAustralia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${australiaRaceDate.getFormattedDate()}</td>
            <td>${australiaRaceTime.getLocalTime()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document
    .getElementById("australia")
    .insertAdjacentHTML("beforeend", australiaData);

  const japanData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(firstPracJapan).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracJapan).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(secondPracJapan).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracJapan).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(thirdPracJapan).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracJapan).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(qualifyingJapan).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingJapan).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${japanRaceDate.getFormattedDate()}</td>
            <td>${japanRaceTime.getLocalTime()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document.getElementById("japan").insertAdjacentHTML("beforeend", japanData);

  // Sprint Weekend
  const chinaData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(firstPracChina).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracChina).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Sprint Qualifying</td>
            <td>${new ConvertLocalDate(secondPracChina).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracChina).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Sprint</td>
            <td>${new ConvertLocalDate(thirdPracChina).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracChina).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(qualifyingChina).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingChina).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${chinaRaceDate.getFormattedDate()}</td>
            <td>${chinaRaceTime.getLocalTime()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document.getElementById("china").insertAdjacentHTML("beforeend", chinaData);

  // Sprint Weekend
  const miamiData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(firstPracMiami).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracMiami).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Sprint Qualifying</td>
            <td>${new ConvertLocalDate(secondPracMiami).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracMiami).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Sprint</td>
            <td>${new ConvertLocalDate(thirdPracMiami).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracMiami).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(qualifyingMiami).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingMiami).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${miamiRaceDate.getFormattedDate()}</td>
            <td>${miamiRaceTime.getLocalTime()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document.getElementById("miami").insertAdjacentHTML("beforeend", miamiData);

  const emiliaData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(firstPracEmilia).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracEmilia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(
              secondPracEmilia
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracEmilia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(thirdPracEmilia).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracEmilia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(
              qualifyingEmilia
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingEmilia).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${emiliaRaceDate.getFormattedDate()}</td>
            <td>${emiliaRaceTime.getLocalTime()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document.getElementById("emilia").insertAdjacentHTML("beforeend", emiliaData);

  const monacoData = `
      <table>
        <tbody>
          <tr>
            <td>Free Practice 1</td>
            <td>${new ConvertLocalDate(firstPracMonaco).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(firstPracMonaco).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 2</td>
            <td>${new ConvertLocalDate(
              secondPracMonaco
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(secondPracMonaco).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Free Practice 3</td>
            <td>${new ConvertLocalDate(thirdPracMonaco).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(thirdPracMonaco).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>${new ConvertLocalDate(
              qualifyingMonaco
            ).getFormattedDate()}</td>
            <td>${new ConvertLocalTime(qualifyingMonaco).getLocalTime()}</td>
          </tr>
          <tr>
            <td>Grand Prix</td>
            <td>${monacoRaceDate.getFormattedDate()}</td>
            <td>${monacoRaceTime.getLocalTime()}</td>
          </tr>
        </tbody>
      </table>
    `;

  document.getElementById("monaco").insertAdjacentHTML("beforeend", monacoData);

  const canadaData = `
  <table>
    <tbody>
      <tr>
        <td>Free Practice 1</td>
        <td>${new ConvertLocalDate(firstPracCanada).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(firstPracCanada).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 2</td>
        <td>${new ConvertLocalDate(secondPracCanada).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(secondPracCanada).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 3</td>
        <td>${new ConvertLocalDate(thirdPracCanada).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(thirdPracCanada).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Qualifying</td>
        <td>${new ConvertLocalDate(qualifyingCanada).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(qualifyingCanada).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Grand Prix</td>
        <td>${canadaRaceDate.getFormattedDate()}</td>
        <td>${canadaRaceTime.getLocalTime()}</td>
      </tr>
    </tbody>
  </table>
`;

  document.getElementById("canada").insertAdjacentHTML("beforeend", canadaData);

  const spainData = `
  <table>
    <tbody>
      <tr>
        <td>Free Practice 1</td>
        <td>${new ConvertLocalDate(firstPracSpain).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(firstPracSpain).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 2</td>
        <td>${new ConvertLocalDate(secondPracSpain).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(secondPracSpain).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 3</td>
        <td>${new ConvertLocalDate(thirdPracSpain).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(thirdPracSpain).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Qualifying</td>
        <td>${new ConvertLocalDate(qualifyingSpain).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(qualifyingSpain).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Grand Prix</td>
        <td>${spainRaceDate.getFormattedDate()}</td>
        <td>${spainRaceTime.getLocalTime()}</td>
      </tr>
    </tbody>
  </table>
`;

  document.getElementById("spain").insertAdjacentHTML("beforeend", spainData);

  //Sprint Weekend
  const austriaData = `
  <table>
    <tbody>
      <tr>
        <td>Free Practice 1</td>
        <td>${new ConvertLocalDate(firstPracAustria).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(firstPracAustria).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Sprint Qualifying</td>
        <td>${new ConvertLocalDate(secondPracAustria).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(secondPracAustria).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Sprint</td>
        <td>${new ConvertLocalDate(thirdPracAustria).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(thirdPracAustria).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Qualifying</td>
        <td>${new ConvertLocalDate(qualifyingAustria).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(qualifyingAustria).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Grand Prix</td>
        <td>${austriaRaceDate.getFormattedDate()}</td>
        <td>${austriaRaceTime.getLocalTime()}</td>
      </tr>
    </tbody>
  </table>
`;

  document
    .getElementById("austria")
    .insertAdjacentHTML("beforeend", austriaData);

  const britishData = `
  <table>
    <tbody>
      <tr>
        <td>Free Practice 1</td>
        <td>${new ConvertLocalDate(firstPracBritish).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(firstPracBritish).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 2</td>
        <td>${new ConvertLocalDate(secondPracBritish).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(secondPracBritish).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 3</td>
        <td>${new ConvertLocalDate(thirdPracBritish).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(thirdPracBritish).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Qualifying</td>
        <td>${new ConvertLocalDate(qualifyingBritish).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(qualifyingBritish).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Grand Prix</td>
        <td>${britishRaceDate.getFormattedDate()}</td>
        <td>${britishRaceTime.getLocalTime()}</td>
      </tr>
    </tbody>
  </table>
`;

  document
    .getElementById("british")
    .insertAdjacentHTML("beforeend", britishData);

  const hungaryData = `
  <table>
    <tbody>
      <tr>
        <td>Free Practice 1</td>
        <td>${new ConvertLocalDate(firstPracHungary).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(firstPracHungary).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 2</td>
        <td>${new ConvertLocalDate(secondPracHungary).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(secondPracHungary).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Free Practice 3</td>
        <td>${new ConvertLocalDate(thirdPracHungary).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(thirdPracHungary).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Qualifying</td>
        <td>${new ConvertLocalDate(qualifyingHungary).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(qualifyingHungary).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Grand Prix</td>
        <td>${hungaryRaceDate.getFormattedDate()}</td>
        <td>${hungaryRaceTime.getLocalTime()}</td>
      </tr>
    </tbody>
  </table>
`;

  document
    .getElementById("hungary")
    .insertAdjacentHTML("beforeend", hungaryData);

  const belgianData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracBelgian).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracBelgian).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(secondPracBelgian).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracBelgian).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(thirdPracBelgian).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracBelgian).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(qualifyingBelgian).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingBelgian).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${belgianRaceDate.getFormattedDate()}</td>
          <td>${belgianRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document
    .getElementById("belgian")
    .insertAdjacentHTML("beforeend", belgianData);

  const dutchData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracDutch).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracDutch).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(secondPracDutch).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracDutch).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(thirdPracDutch).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracDutch).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(qualifyingDutch).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingDutch).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${dutchRaceDate.getFormattedDate()}</td>
          <td>${dutchRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("dutch").insertAdjacentHTML("beforeend", dutchData);

  const italyData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracItaly).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracItaly).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(secondPracItaly).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracItaly).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(thirdPracItaly).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracItaly).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(qualifyingItaly).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingItaly).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${italyRaceDate.getFormattedDate()}</td>
          <td>${italyRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("italy").insertAdjacentHTML("beforeend", italyData);

  const azerbaijanData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(
            firstPracAzerbaijan
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracAzerbaijan).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(
            secondPracAzerbaijan
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracAzerbaijan).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(
            thirdPracAzerbaijan
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracAzerbaijan).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(
            qualifyingAzerbaijan
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingAzerbaijan).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${azerbaijanRaceDate.getFormattedDate()}</td>
          <td>${azerbaijanRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document
    .getElementById("azerbaijan")
    .insertAdjacentHTML("beforeend", azerbaijanData);

  const singaporeData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(
            firstPracSingapore
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracSingapore).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(
            secondPracSingapore
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracSingapore).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(
            thirdPracSingapore
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracSingapore).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(
            qualifyingSingapore
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingSingapore).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${singaporeRaceDate.getFormattedDate()}</td>
          <td>${singaporeRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document
    .getElementById("singapore")
    .insertAdjacentHTML("beforeend", singaporeData);

  //Sprint Weekend
  const uSAData = `
  <table>
    <tbody>
      <tr>
        <td>Free Practice 1</td>
        <td>${new ConvertLocalDate(firstPracUSA).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(firstPracUSA).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Sprint Qualifying</td>
        <td>${new ConvertLocalDate(secondPracUSA).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(secondPracUSA).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Sprint</td>
        <td>${new ConvertLocalDate(thirdPracUSA).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(thirdPracUSA).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Qualifying</td>
        <td>${new ConvertLocalDate(qualifyingUSA).getFormattedDate()}</td>
        <td>${new ConvertLocalTime(qualifyingUSA).getLocalTime()}</td>
      </tr>
      <tr>
        <td>Grand Prix</td>
        <td>${uSARaceDate.getFormattedDate()}</td>
        <td>${uSARaceTime.getLocalTime()}</td>
      </tr>
    </tbody>
  </table>
`;

  document.getElementById("usa").insertAdjacentHTML("beforeend", uSAData);

  const mexicoData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracMexico).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracMexico).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(secondPracMexico).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracMexico).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(thirdPracMexico).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracMexico).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(qualifyingMexico).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingMexico).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${mexicoRaceDate.getFormattedDate()}</td>
          <td>${mexicoRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("mexico").insertAdjacentHTML("beforeend", mexicoData);

  //Sprint Weekend
  const brazilData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracBrazil).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracBrazil).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Sprint Qualifying</td>
          <td>${new ConvertLocalDate(secondPracBrazil).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracBrazil).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Sprint</td>
          <td>${new ConvertLocalDate(thirdPracBrazil).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracBrazil).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(qualifyingBrazil).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingBrazil).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${brazilRaceDate.getFormattedDate()}</td>
          <td>${brazilRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("brazil").insertAdjacentHTML("beforeend", brazilData);

  const vegasData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracVegas).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracVegas).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(secondPracVegas).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracVegas).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(thirdPracVegas).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracVegas).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(qualifyingVegas).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingVegas).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${vegasRaceDate.getFormattedDate()}</td>
          <td>${vegasRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("vegas").insertAdjacentHTML("beforeend", vegasData);

  //Sprint Weekend
  const qatarData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracQatar).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracQatar).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Sprint Qualifying</td>
          <td>${new ConvertLocalDate(secondPracQatar).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracQatar).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Sprint</td>
          <td>${new ConvertLocalDate(thirdPracQatar).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracQatar).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(qualifyingQatar).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingQatar).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${qatarRaceDate.getFormattedDate()}</td>
          <td>${qatarRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document.getElementById("qatar").insertAdjacentHTML("beforeend", qatarData);

  const abuDhabiData = `
    <table>
      <tbody>
        <tr>
          <td>Free Practice 1</td>
          <td>${new ConvertLocalDate(firstPracAbuDhabi).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(firstPracAbuDhabi).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 2</td>
          <td>${new ConvertLocalDate(
            secondPracAbuDhabi
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(secondPracAbuDhabi).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Free Practice 3</td>
          <td>${new ConvertLocalDate(thirdPracAbuDhabi).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(thirdPracAbuDhabi).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Qualifying</td>
          <td>${new ConvertLocalDate(
            qualifyingAbuDhabi
          ).getFormattedDate()}</td>
          <td>${new ConvertLocalTime(qualifyingAbuDhabi).getLocalTime()}</td>
        </tr>
        <tr>
          <td>Grand Prix</td>
          <td>${abuDhabiRaceDate.getFormattedDate()}</td>
          <td>${abuDhabiRaceTime.getLocalTime()}</td>
        </tr>
      </tbody>
    </table>
  `;

  document
    .getElementById("abuDhabi")
    .insertAdjacentHTML("beforeend", abuDhabiData);
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

// Get the current date
const currentDate = new Date();

// Select all buttons with the class 'date-button'
const buttons = document.querySelectorAll(".date-button");

// Loop through each button
buttons.forEach(button => {
  // Get the event date from the 'data-date' attribute
  const eventDate = new Date(button.getAttribute("data-date"));

  // Get the bold text element inside the button
  const eventText = button.querySelector(".event-text");

  // Check if the current date is after the event date
  if (currentDate >= eventDate) {
    // Add the 'line-through' class to the event text
    eventText.classList.add("line-through");
  }
});
// } else {
//   // Hide the element if there are no upcoming dates left
//   eventElement.style.display = "none";
// }
// const raceDates = [
//   new Date("2024-03-02"),
//   new Date("2024-03-09"),
//   new Date("2024-03-24"),
//   new Date("2024-04-07"),
//   new Date("2024-04-21"),
//   new Date("2024-05-05"),
//   new Date("2024-05-19"),
//   new Date("2024-05-26"),
//   new Date("2024-06-09"),
//   new Date("2024-06-23"),
//   new Date("2024-06-30"),
//   new Date("2024-07-07"),
//   new Date("2024-07-21"),
//   new Date("2024-07-28"),
//   new Date("2024-08-25"),
//   new Date("2024-09-01"),
//   new Date("2024-09-15"),
//   new Date("2024-09-22"),
//   new Date("2024-10-20"),
//   new Date("2024-10-27"),
//   new Date("2024-11-03"),
//   new Date("2024-11-24"),
//   new Date("2024-12-01"),
//   new Date("2024-12-08"),
// ];

// const today = new Date();
// today.setHours(0, 0, 0, 0);

// function getUpcomingDate(dates) {
//   const upcomingDates = dates.filter(date => date >= today);

//   upcomingDates.sort((a, b) => a - b);

//   return upcomingDates.length > 0 ? upcomingDates[0] : undefined;
// }

// const closestDate = getUpcomingDate(raceDates);

// const eventElement = document.getElementsByClassName("nextevent");

// if (closestDate) {
//   if (today.getTime() === closestDate.getTime()) {
//     eventElement.style.display = "block";
//   } else {
//     // Hide the element on all other dates
//     eventElement.style.display = "none";
//   }
// } else {
//   // Hide the element if there are no upcoming dates left
//   eventElement.style.display = "none";
// }
