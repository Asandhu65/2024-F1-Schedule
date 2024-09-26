fetch("https://ergast.com/api/f1/current.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);

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

    // Function that pulls Saudi Practice and Qualifying session times from api and concats them to be formatted later on.
    function getSaudiLocalTimes(data) {
      const practices = [
        "FirstPractice",
        "SecondPractice",
        "ThirdPractice",
        "Qualifying",
      ];

      // Create a variable for each practice time
      let firstPracLocal, secondPracLocal, thirdPracLocal, qualifyingLocal;

      practices.forEach((practice, index) => {
        const practiceData = data.MRData.RaceTable.Races[1][practice];
        if (!practiceData) {
          throw new Error(`${practice} data not found.`);
        }

        const { time, date } = practiceData;
        const localTime = `${date}T${time}`;

        // Assign to the respective variable based on index
        if (index === 0) firstPracLocal = localTime;
        if (index === 1) secondPracLocal = localTime;
        if (index === 2) thirdPracLocal = localTime;
        if (index === 3) qualifyingLocal = localTime;
      });

      return {
        firstPracLocal,
        secondPracLocal,
        thirdPracLocal,
        qualifyingLocal,
      };
    }

    const { firstPracLocal, secondPracLocal, thirdPracLocal, qualifyingLocal } =
      getSaudiLocalTimes(data);

    // Function that pulls saudi Grand Prix times from api and concats them to be formatted later on.
    function getSaudiRaceTimes(data) {
      const raceTime = data.MRData.RaceTable.Races[1].time;
      const raceDate = data.MRData.RaceTable.Races[1].date;

      let raceLocal = `${raceDate}T${raceTime}`;

      return raceLocal;
    }
    const saudiRaceLocal = getSaudiRaceTimes(data);

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
        const localTimeBahrain = this.formatter.format(new Date(this.date));
        return localTimeBahrain;
      }
    }
    const bahrainFp1Time = new ConvertLocalTime(firstPracBahrain);
    const bahrainFp2Time = new ConvertLocalTime(secondPracBahrain);
    const bahrainFp3Time = new ConvertLocalTime(thirdPracbahrain);
    const bahrainQualiTimeLocal = new ConvertLocalTime(qualifyingBahrain);
    const bahrainGpTimeLocal = new ConvertLocalTime(bahrainRaceLocal);
    const saudiFp1Time = new ConvertLocalTime(firstPracLocal);
    const saudiFp2Time = new ConvertLocalTime(secondPracLocal);
    const saudiFp3Time = new ConvertLocalTime(thirdPracLocal);
    const saudiQualiTimeLocal = new ConvertLocalTime(qualifyingLocal);
    const saudiGpTimeLocal = new ConvertLocalTime(saudiRaceLocal);

    const bahrainFp1Date = new ConvertLocalDate(firstPracBahrain);
    const bahrainFp2Date = new ConvertLocalDate(secondPracBahrain);
    const bahrainFp3Date = new ConvertLocalDate(thirdPracbahrain);
    const bahrainQualiDateLocal = new ConvertLocalDate(qualifyingBahrain);
    const bahrainGpDateLocal = new ConvertLocalDate(bahrainRaceLocal);
    const saudiFp1Date = new ConvertLocalDate(firstPracLocal);
    const saudiFp2Date = new ConvertLocalDate(secondPracLocal);
    const saudiFp3Date = new ConvertLocalDate(thirdPracLocal);
    const saudiQualiDateLocal = new ConvertLocalDate(qualifyingLocal);
    const saudiGpDateLocal = new ConvertLocalDate(saudiRaceLocal);

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
