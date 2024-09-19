Promise.all([
  fetch("https://ergast.com/api/f1/2024/constructorStandings.json"),
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
      data[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        .length;
      i++
    ) {
      const markup = `<td>${data[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].position}</td><td>${data[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].points}</td><td>${data[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].wins}</td><td>${data[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[i].Constructor.name}</td>`;
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

// [0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].position
//[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.name
