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
  })
  .catch(err => {
    console.log(err);
  });
