// 2024 f1 schedule

// const url = "https://f1-motorsport-data.p.rapidapi.com/scoreboard?year=2024";
// const options = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "f2e8945f21msh1c2dd21e72b3f03p1d8e27jsn4bba50729b21",
//     "x-rapidapi-host": "f1-motorsport-data.p.rapidapi.com",
//   },
// };

// try {
//   const response = await fetch(url, options);
//   const data = await response.json();
//   console.log(data);
// } catch (error) {
//   console.error(error);
// }

// const options = { method: "GET", headers: { accept: "application/json" } };

// fetch(
//   "https://api.sportradar.com/formula1/trial/v2/en/sport_events/sr%3Astage%3A272058/schedule.json?api_key=dNxQlogTjS3O4hxZJbcaA5N3kwtTntHP46CdW7AG",
//   options
// )
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

// const url = "https://formula-1-standings.p.rapidapi.com/races";
// const options = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "f2e8945f21msh1c2dd21e72b3f03p1d8e27jsn4bba50729b21",
//     "x-rapidapi-host": "formula-1-standings.p.rapidapi.com",
//   },
// };

// fetch(url, options)
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   });

fetch("https://ergast.com/api/f1/2024/driverStandings.json")
  .then(res => {
    return res.json();
  })
  .then(data => {
    const driver1 =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
    // race => {
    //   const markup = `<td>${race.round}</td><td>${race.date}</td><td>${race.raceName}</td><td>${race.time}</td>`;
    console.log(data);
    console.log(driver1);
    // document.querySelector("table").insertAdjacentHTML("beforeend", markup);
  });
// })
// .try(err => console.log(err));

// const timestamp = 1616608200000; // example timestamp
// const date = new Date(timestamp);
// const formattedDate = date.toLocaleDateString("en-US", {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// });
// console.log(formattedDate); // prints "Wednesday, March 24, 2021"

// MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver

// MRData.StandingsTable.StandingsLists[0].DriverStandings

// MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points

// Points | Position | Wins | Name | Team
