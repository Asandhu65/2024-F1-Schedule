fetch("https://ergast.com/api/f1/current.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);

    function getPracticeLocalTimes(data) {
      const practices = [
        "FirstPractice",
        "SecondPractice",
        "ThirdPractice",
        "Qualifying",
      ];

      // Create a variable for each practice time
      let firstPracLocal, secondPracLocal, thirdPracLocal, qualifyingLocal;

      practices.forEach((practice, index) => {
        const practiceData = data.MRData.RaceTable.Races[0][practice];
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

    // Usage
    const { firstPracLocal, secondPracLocal, thirdPracLocal, qualifyingLocal } =
      getPracticeLocalTimes(data);
    console.log(firstPracLocal);
    console.log(secondPracLocal);
    console.log(thirdPracLocal);
    console.log(qualifyingLocal);

    const firstPracTimeBahrain =
      data.MRData.RaceTable.Races[0].FirstPractice.time;
    const firstPracDateBahrain =
      data.MRData.RaceTable.Races[0].FirstPractice.date;

    let firstPracBahrainLocal = firstPracDateBahrain.concat(
      "T",
      firstPracTimeBahrain
    );

    const secondPracTimeBahrain =
      data.MRData.RaceTable.Races[0].SecondPractice.time;
    const secondPracDateBahrain =
      data.MRData.RaceTable.Races[0].SecondPractice.date;

    let secondPracBahrainLocal = secondPracDateBahrain.concat(
      "T",
      secondPracTimeBahrain
    );

    const thirdPracTimeBahrain =
      data.MRData.RaceTable.Races[0].ThirdPractice.time;
    const thirdPracDateBahrain =
      data.MRData.RaceTable.Races[0].ThirdPractice.date;

    let thirdPracBahrainLocal = thirdPracDateBahrain.concat(
      "T",
      thirdPracTimeBahrain
    );

    const bahrainQualiTime = data.MRData.RaceTable.Races[0].Qualifying.time;
    const bahrainQualiDate = data.MRData.RaceTable.Races[0].Qualifying.date;

    let bahrainQualiLocal = bahrainQualiDate.concat("T", bahrainQualiTime);

    const bahrainRaceTime = data.MRData.RaceTable.Races[0].time;
    const bahrainRaceDate = data.MRData.RaceTable.Races[0].date;

    let bahrainRaceLocal = bahrainRaceDate.concat("T", bahrainRaceTime);

    class FP1TimeBahrain {
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

    const bahrainFp1Time = new FP1TimeBahrain(firstPracLocal);
    const bahrainFp2Time = new FP1TimeBahrain(secondPracLocal);
    const bahrainFp3Time = new FP1TimeBahrain(thirdPracLocal);
    // const bahrainQualiTimeLocal = new FP1TimeBahrain(bahrainQualiLocal);
    // const bahrainGpTimeLocal = new FP1TimeBahrain(bahrainRaceLocal);

    class FP1DateBahrain {
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

    const bahrainFp1Date = new FP1DateBahrain(firstPracLocal);
    const bahrainFp2Date = new FP1DateBahrain(secondPracLocal);
    const bahrainFp3Date = new FP1DateBahrain(thirdPracLocal);
    // const bahrainQualiDateLocal = new FP1DateBahrain(bahrainQualiLocal);
    // const bahrainGpDateLocal = new FP1DateBahrain(bahrainRaceLocal);

    const markup = `<table>
    <tbody>
      <tr>
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
    document.querySelector("table").insertAdjacentHTML("beforeend", markup);
    // const timeStr = str.replace(/[Z:]/g, "");
    // console.log(timeStr);
    // // const time = Number(timeStr);
    // // console.log(time);
    // const newNum = Number(timeStr.toString().slice(0, -2));
    // console.log(newNum);
    // let timeEst = newNum - 500;
    // console.log(timeEst);
    // const timeEstB = timeEst.toString();
    // console.log(timeEstB);

    // Turn everything above in to a function to replace the times to EST for all races etc.
    /////////////////////////////////
    // const est = time - 5;
    // console.log(est);

    // let date = new Date(data.MRData.RaceTable.Races[0].FirstPractice.time);
    // console.log(date);
    // let timezoneOffset = date.getTimezoneOffset();
    // console.log(timezoneOffset);

    // // const utcDate = new Date(time);
    // // console.log("UTC Date:", utcDate);

    // const offsetMinutes = utcDate.getTimezoneOffset();
    // console.log("Time Zone Offset (minutes):", offsetMinutes);
    // // Step 3:
    // const localTime = new Date(utcDate.getTime() - offsetMinutes * 60 * 1000);
    // console.log("Local Time:", localTime);
  });
// .catch(error => console.log(error));

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

// var coll = document.getElementsByClassName("collapsiblealt");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight) {
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// }

// fetch("https://api.openf1.org/v1/drivers?driver_number=44&session_key=latest");
// .then((response) => response.json())
// .then((data) => console.log(data[0].team_name))
// .catch((error) => console.error(error));
// fetchData();
// async function fetchData() {
//   try {
//     const driverName = document
//       .getElementById("driverName")
//       .value.toLowerCase();
//     const response = await fetch(
//       `https://api.openf1.org/v1/drivers?&session_key=latest${driverName}`
//     );

//     if (!response.ok) {
//       throw new Error("Could not fetch resource");
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// const utcDateString = "2024-02-29	11:30:00Z"; // UTC date string (example)
// const utcDateWithoutMillis = utcDateString.slice(0, -5) + "Z";
// const utcDate = new Date(utcDateWithoutMillis);
// console.log("UTC Date:", utcDate.toISOString());

// // Step 2:
// const offsetMinutes = utcDate.getTimezoneOffset();
// console.log("Time Zone Offset (minutes):", offsetMinutes);

// // Step 3:
// const localTime = new Date(utcDate.getTime() - offsetMinutes * 60 * 1000);
// console.log("Local Time:", localTime.toISOString());

// // Display Local Time
// const localTimeString = localTime.toLocaleString();
// document.getElementById(
//   "localTime"
// ).textContent = `Local Time: ${localTimeString}`;
