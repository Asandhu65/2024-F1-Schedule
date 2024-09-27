import { getLocalTimes } from "./modules.js";

fetch("https://ergast.com/api/f1/current.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);

    const data12 = {
      MRData: {
        RaceTable: {
          Races: [
            {
              FirstPractice: { time: "12:00", date: "2024-03-30" },
              SecondPractice: { time: "16:00", date: "2024-03-30" },
              ThirdPractice: { time: "15:00", date: "2024-03-31" },
              Qualifying: { time: "20:00", date: "2024-03-31" },
            },
            // Other races...
            {
              FirstPractice: { time: "10:00", date: "2024-04-07" },
              SecondPractice: { time: "14:00", date: "2024-04-07" },
              ThirdPractice: { time: "12:00", date: "2024-04-08" },
              Qualifying: { time: "18:00", date: "2024-04-08" },
            },
          ],
        },
      },
    };

    const practicesToGet = [
      "FirstPractice",
      "SecondPractice",
      "ThirdPractice",
      "Qualifying",
    ];

    // Get local times for the first race (index 0)
    const localTimesRace1 = getLocalTimes(data12, 0, practicesToGet);
    console.log(localTimesRace1);

    // Get local times for the second race (index 1)
    const localTimesRace2 = getLocalTimes(data12, 1, practicesToGet);
    console.log(localTimesRace2);

    // class to convert UTC times to EST.

    class ConvertLocalTime {
      constructor(time) {
        this.time = time;
        this.options = {
          timeZone: "America/New_York",
          timeZoneName: "short",
          hour: "numeric",
          minute: "numeric",
        };
        this.formatter = new Intl.DateTimeFormat([], this.options);
      }

      getLocalDate() {
        const localDate = this.formatter.format(new Date(this.time));
        return localDate;
      }
    }

    // class to convert european dates to US.

    class ConvertLocalDate {
      constructor(date) {
        this.date = date;
        this.options = {
          month: "short",
          day: "2-digit",
        };
        this.formatter = new Intl.DateTimeFormat([], this.options);
      }

      getFormattedDate() {
        const localTime = this.formatter.format(new Date(this.date));
        return localTime;
      }
    }

    // Function that pulls Bahrain Practice and Qualifying session times from api and concats them to be formatted later on.

    function getBahrainLocalTimes(data) {
      const practices = [
        "FirstPractice",
        "SecondPractice",
        "ThirdPractice",
        "Qualifying",
      ];

      // Create a variable for each practice time

      let firstPracBahrain,
        secondPracBahrain,
        thirdPracbahrain,
        qualifyingBahrain;

      practices.forEach((practice, index) => {
        const practiceData = data.MRData.RaceTable.Races[0][practice];
        if (!practiceData) {
          throw new Error(`${practice} data not found.`);
        }

        const { time, date } = practiceData;
        const localTime = `${date}T${time}`;

        // Assign to the respective variable based on index

        if (index === 0) firstPracBahrain = localTime;
        if (index === 1) secondPracBahrain = localTime;
        if (index === 2) thirdPracbahrain = localTime;
        if (index === 3) qualifyingBahrain = localTime;
      });

      return {
        firstPracBahrain,
        secondPracBahrain,
        thirdPracbahrain,
        qualifyingBahrain,
      };
    }

    const {
      firstPracBahrain,
      secondPracBahrain,
      thirdPracbahrain,
      qualifyingBahrain,
    } = getBahrainLocalTimes(data);

    // Function that pulls Bahrain Grand Prix times from api and concats them to be formatted later on.

    function getBahrainRaceTimes(data) {
      const raceTime = data.MRData.RaceTable.Races[0].time;
      const raceDate = data.MRData.RaceTable.Races[0].date;

      let raceLocal = `${raceDate}T${raceTime}`;

      return raceLocal;
    }
    const bahrainRaceLocal = getBahrainRaceTimes(data);

    // Function that pulls Saudi Practice and Qualifying session times from api and concats them to be formatted later on.

    function getSaudiLocalTimes(data) {
      const practices = [
        "FirstPractice",
        "SecondPractice",
        "ThirdPractice",
        "Qualifying",
      ];

      // Create a variable for each practice time

      let firstPracSaudi, secondPracSaudi, thirdPracSaudi, qualifyingSaudi;

      practices.forEach((practice, index) => {
        const practiceData = data.MRData.RaceTable.Races[1][practice];
        if (!practiceData) {
          throw new Error(`${practice} data not found.`);
        }

        const { time, date } = practiceData;
        const localTime = `${date}T${time}`;

        // Assign to the respective variable based on index

        if (index === 0) firstPracSaudi = localTime;
        if (index === 1) secondPracSaudi = localTime;
        if (index === 2) thirdPracSaudi = localTime;
        if (index === 3) qualifyingSaudi = localTime;
      });

      return {
        firstPracSaudi,
        secondPracSaudi,
        thirdPracSaudi,
        qualifyingSaudi,
      };
    }

    const { firstPracSaudi, secondPracSaudi, thirdPracSaudi, qualifyingSaudi } =
      getSaudiLocalTimes(data);

    // Function that pulls saudi Grand Prix times from api and concats them to be formatted later on.

    function getSaudiRaceTimes(data) {
      const raceTime = data.MRData.RaceTable.Races[1].time;
      const raceDate = data.MRData.RaceTable.Races[1].date;

      let raceLocal = `${raceDate}T${raceTime}`;

      return raceLocal;
    }
    const saudiRaceLocal = getSaudiRaceTimes(data);

    // Function that pulls Aus. Practice and Qualifying session times from api and concats them to be formatted later on.

    function getAusLocalTimes(data) {
      const practices = [
        "FirstPractice",
        "SecondPractice",
        "ThirdPractice",
        "Qualifying",
      ];

      // Create a variable for each practice time

      let firstPracAus, secondPracAus, thirdPracAus, qualifyingAus;

      practices.forEach((practice, index) => {
        const practiceData = data.MRData.RaceTable.Races[2][practice];
        if (!practiceData) {
          throw new Error(`${practice} data not found.`);
        }

        const { time, date } = practiceData;
        const localTime = `${date}T${time}`;

        // Assign to the respective variable based on index

        if (index === 0) firstPracAus = localTime;
        if (index === 1) secondPracAus = localTime;
        if (index === 2) thirdPracAus = localTime;
        if (index === 3) qualifyingAus = localTime;
      });

      return {
        firstPracAus,
        secondPracAus,
        thirdPracAus,
        qualifyingAus,
      };
    }

    const { firstPracAus, secondPracAus, thirdPracAus, qualifyingAus } =
      getAusLocalTimes(data);

    // Function that pulls saudi Grand Prix times from api and concats them to be formatted later on.

    function getAusRaceTimes(data) {
      const raceTime = data.MRData.RaceTable.Races[2].time;
      const raceDate = data.MRData.RaceTable.Races[2].date;

      let raceLocal = `${raceDate}T${raceTime}`;

      return raceLocal;
    }
    const aussiRaceLocal = getAusRaceTimes(data);

    // bahrain times
    const bahrainFp1Time = new ConvertLocalTime(firstPracBahrain);
    const bahrainFp2Time = new ConvertLocalTime(secondPracBahrain);
    const bahrainFp3Time = new ConvertLocalTime(thirdPracbahrain);
    const bahrainQualiTimeLocal = new ConvertLocalTime(qualifyingBahrain);
    const bahrainGpTimeLocal = new ConvertLocalTime(bahrainRaceLocal);

    // bahrain dates
    const bahrainFp1Date = new ConvertLocalDate(firstPracBahrain);
    const bahrainFp2Date = new ConvertLocalDate(secondPracBahrain);
    const bahrainFp3Date = new ConvertLocalDate(thirdPracbahrain);
    const bahrainQualiDateLocal = new ConvertLocalDate(qualifyingBahrain);
    const bahrainGpDateLocal = new ConvertLocalDate(bahrainRaceLocal);

    // saudi times
    const saudiFp1Time = new ConvertLocalTime(firstPracSaudi);
    const saudiFp2Time = new ConvertLocalTime(secondPracSaudi);
    const saudiFp3Time = new ConvertLocalTime(thirdPracSaudi);
    const saudiQualiTimeLocal = new ConvertLocalTime(qualifyingSaudi);
    const saudiGpTimeLocal = new ConvertLocalTime(saudiRaceLocal);

    // saudi dates
    const saudiFp1Date = new ConvertLocalDate(firstPracSaudi);
    const saudiFp2Date = new ConvertLocalDate(secondPracSaudi);
    const saudiFp3Date = new ConvertLocalDate(thirdPracSaudi);
    const saudiQualiDateLocal = new ConvertLocalDate(qualifyingSaudi);
    const saudiGpDateLocal = new ConvertLocalDate(saudiRaceLocal);

    // aussi times
    const aussiFp1Time = new ConvertLocalTime(firstPracAus);
    const aussiFp2Time = new ConvertLocalTime(secondPracAus);
    const aussiFp3Time = new ConvertLocalTime(thirdPracAus);
    const aussiQualiTimeLocal = new ConvertLocalTime(qualifyingAus);
    const aussiGpTimeLocal = new ConvertLocalTime(aussiRaceLocal);

    // aussi dates
    const aussiFp1Date = new ConvertLocalDate(firstPracAus);
    const aussiFp2Date = new ConvertLocalDate(secondPracAus);
    const aussiFp3Date = new ConvertLocalDate(thirdPracAus);
    const aussiQualiDateLocal = new ConvertLocalDate(qualifyingAus);
    const aussiGpDateLocal = new ConvertLocalDate(aussiRaceLocal);

    // table for bahrain dates and times.
    const bahrainData = `<table>
    <tbody>
      <tr>
      <td>Free Practice 1</td>
      <td>${bahrainFp1Date.getFormattedDate()}</td>
      <td>${bahrainFp1Time.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Free Practice 2</td>
      <td>${bahrainFp2Date.getFormattedDate()}</td>
      <td>${bahrainFp2Time.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Free Practice 3</td>
      <td>${bahrainFp3Date.getFormattedDate()}</td>
      <td>${bahrainFp3Time.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Qualifying</td>
      <td>${bahrainQualiDateLocal.getFormattedDate()}</td>
      <td>${bahrainQualiTimeLocal.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Grand Prix</td>
      <td>${bahrainGpDateLocal.getFormattedDate()}</td>
      <td>${bahrainGpTimeLocal.getLocalDate()}</td>
    </tr>
    </tbody>
  </table>`;
    document
      .getElementById("bahrain")
      .insertAdjacentHTML("beforeend", bahrainData);

    // table for saudi dates and times.
    const saudiData = `<table>
    <tbody>
      <tr>
      <td>Free Practice 1</td>
      <td>${saudiFp1Date.getFormattedDate()}</td>
      <td>${saudiFp1Time.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Free Practice 2</td>
      <td>${saudiFp2Date.getFormattedDate()}</td>
      <td>${saudiFp2Time.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Free Practice 3</td>
      <td>${saudiFp3Date.getFormattedDate()}</td>
      <td>${saudiFp3Time.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Qualifying</td>
      <td>${saudiQualiDateLocal.getFormattedDate()}</td>
      <td>${saudiQualiTimeLocal.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Grand Prix</td>
      <td>${saudiGpDateLocal.getFormattedDate()}</td>
      <td>${saudiGpTimeLocal.getLocalDate()}</td>
    </tr>
    </tbody>
  </table>`;
    document.getElementById("saudi").insertAdjacentHTML("beforeend", saudiData);

    const aussiData = `<table>
      <tbody>
        <tr>
        <td>Free Practice 1</td>
        <td>${aussiFp1Date.getFormattedDate()}</td>
        <td>${aussiFp1Time.getLocalDate()}</td>
      </tr>
      <tr>
        <td>Free Practice 2</td>
        <td>${aussiFp2Date.getFormattedDate()}</td>
        <td>${aussiFp2Time.getLocalDate()}</td>
      </tr>
      <tr>
        <td>Free Practice 3</td>
        <td>${aussiFp3Date.getFormattedDate()}</td>
        <td>${aussiFp3Time.getLocalDate()}</td>
      </tr>
      <tr>
        <td>Qualifying</td>
        <td>${aussiQualiDateLocal.getFormattedDate()}</td>
        <td>${aussiQualiTimeLocal.getLocalDate()}</td>
      </tr>
      <tr>
        <td>Grand Prix</td>
        <td>${aussiGpDateLocal.getFormattedDate()}</td>
        <td>${aussiGpTimeLocal.getLocalDate()}</td>
      </tr>
      </tbody>
    </table>`;
    document
      .getElementById("australia")
      .insertAdjacentHTML("beforeend", aussiData);
  })
  .catch(error => console.log(error));

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
