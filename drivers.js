// fetch("https://ergast.com/api/f1/2024/driverStandings.json")
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     const points =
//       data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
//     // race => {
//     //   const markup = `<td>${race.round}</td><td>${race.date}</td><td>${race.raceName}</td><td>${race.time}</td>`;
//     console.log(data);
//     console.log(points);
//     // document.querySelector("table").insertAdjacentHTML("beforeend", markup);
//   });

// fetch("https://api.openf1.org/v1/drivers?&session_key=latest")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     data.forEach(driver => {
//       const markup = `<td>${driver.points}</td><td>${driver.full_name}</td><td><img src = ${driver.headshot_url}/></td><td>${driver.team_name}</td><td>${driver.country_code}</td>`;

//       console.log(data);
//       document.querySelector("table").insertAdjacentHTML("beforeend", markup);
//     });
//   })
//   .catch(error => console.log(error));

// https://ergast.com/api/f1/2024/driverStandings

// Points | Position | Wins | ✅ Name | ✅ Picture | ✅ Team

Promise.all([
  fetch("https://ergast.com/api/f1/2024/driverStandings.json"),
  fetch("https://api.openf1.org/v1/drivers?&session_key=latest"),
])
  .then(responses => {
    return Promise.all(
      responses.map(response => {
        return response.json();
      })
    );
  })
  .then(data => {
    console.log(data);

    for (
      let i = 0;
      i <
      data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings.length;
      i++
    ) {
      const markup = `<td>${data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[i].position}</td><td>${data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[i].points}</td><td>${data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[i].wins}</td><td>${data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.givenName} ${data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Driver.familyName}</td><td>${data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[i].Constructors[0].name}</td>`;
      document.querySelector("table").insertAdjacentHTML("beforeend", markup);
    }
    // for (let i = 0; i < data[1].length; i++) {
    //   const markup = `<td>${data[1][0].first_name}</td>`;
    //   document.querySelector("table").insertAdjacentHTML("beforebegin", markup);
    // }
    // const points =
    //   data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
    // const position =
    //   data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
    //     .position;
    // const wins =
    //   data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0].wins;

    // const team = data[1][0].team_name;
    // console.log(data);
    // const name1 = data[1][0].first_name;
    // const name2 = data[1][0].last_name;
    // const markup = `<td>${points}</td><td>${position}</td><td>${wins}</td><td>${name1} ${name2}</td><td><img src = ${picture}/><td>${team}</td>`;
    // document.querySelector("table").insertAdjacentHTML("beforeend", markup);
  })
  .catch(err => {
    console.log(err);
  });

// [0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
// [0].MRData.StandingsTable.StandingsLists[0].DriverStandings[1].points
// [0].MRData.StandingsTable.season
// [1][0].first_name
//[1][0]
//[0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName
// [0].MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name
