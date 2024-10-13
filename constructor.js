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
  })
  .catch(err => {
    console.log(err);
  });
