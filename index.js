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

    const secondPracTimeBahrain =
      data.MRData.RaceTable.Races[0].SecondPractice.time;
    const secondPracDateBahrain =
      data.MRData.RaceTable.Races[0].SecondPractice.date;

    let secondPracBahrainLocal = secondPracDateBahrain.concat(
      "T",
      secondPracTimeBahrain
    );

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

    const fp1 = new FP1TimeBahrain(firstPracBahrainLocal);
    const fp2 = new FP1TimeBahrain(secondPracBahrainLocal);
    console.log(fp1.getLocalDate());
    console.log(fp2.getLocalDate());

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

    const fp1Date1 = new FP1DateBahrain(firstPracBahrainLocal);
    const fp1Date2 = new FP1DateBahrain(secondPracBahrainLocal);
    console.log(fp1Date1.getFormattedDate());

    const markup = `<table>
    <tbody>
      <tr>
      <tr>
      <td>Free Practice 1</td>
      <td>${fp1Date1.getFormattedDate()}</td>
      <td>${fp1.getLocalDate()}</td>
    </tr>
    <tr>
      <td>Free Practice 2</td>
      <td>${fp1Date2.getFormattedDate()}</td>
      <td>${fp2.getLocalDate()}</td>
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
