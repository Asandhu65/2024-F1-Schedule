fetch("https://ergast.com/api/f1/current.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);

    const firstPracTimeBahrain =
      data.MRData.RaceTable.Races[0].FirstPractice.time;
    const firstPracDateBahrain =
      data.MRData.RaceTable.Races[0].FirstPractice.date;

    let firstPracBahrainLocal = firstPracDateBahrain.concat(
      "T",
      firstPracTimeBahrain
    );

    let firstPracBahrainDateFormat = firstPracTimeBahrain.concat(
      "T",
      firstPracDateBahrain
    );

    console.log(firstPracBahrainDateFormat);

    function localDate() {
      const options = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
      };

      const formatter = new Intl.DateTimeFormat([], options);
      const UTCDate = firstPracBahrainLocal;
      const localDateBahrain = formatter.format(new Date(UTCDate));
      return localDateBahrain;
    }
    localDate();

    function localTime() {
      const options = {
        month: "short",
        day: "2-digit",
      };

      const formatter = new Intl.DateTimeFormat([], options);
      const UTCTime = firstPracBahrainLocal;
      const localTimeBahrain = formatter.format(new Date(UTCTime));
      return localTimeBahrain;
    }
    localTime();

    // console.log(firstPracBahrainLocal);
    // const options = {
    //   timeZone: "America/New_York",
    //   hour: "numeric",
    //   minute: "numeric",
    // };

    // const formatter = new Intl.DateTimeFormat([], options);
    // const UTCTime = firstPracBahrainLocal;
    // const localTimeBahrain = formatter.format(new Date(UTCTime));

    // console.log(localTimeBahrain);
    const markup = `<table>
    <tbody>
      <tr>
      <tr>
      <td>Free Practice 1</td>
      <td>${localTime(firstPracBahrainLocal)} </td>
      <td>${localDate(firstPracBahrainDateFormat)} EST</td>
    </tr>
    <tr>
      <td>Free Practice 2</td>
      <td>${data.MRData.RaceTable.Races[0].SecondPractice.date}</td>
      <td>${data.MRData.RaceTable.Races[0].SecondPractice.time}</td>
    </tr>
    <tr>
      <td>Free Practice 3</td>
      <td>${data.MRData.RaceTable.Races[0].ThirdPractice.date}</td>
      <td>${data.MRData.RaceTable.Races[0].ThirdPractice.time}</td>
    </tr>
    <tr>
      <td>Qualifying</td>
      <td>${data.MRData.RaceTable.Races[0].Qualifying.date}</td>
      <td>${data.MRData.RaceTable.Races[0].Qualifying.time}</td>
    </tr>
    <tr>
      <td>Grand Prix</td>
      <td>${data.MRData.RaceTable.Races[0].date}</td>
      <td>${data.MRData.RaceTable.Races[0].time}</td>
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
