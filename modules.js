export function getLocalTimes(data, raceIndex, practices) {
  const localTimes = {};

  practices.forEach(practice => {
    const practiceData = data.MRData.RaceTable.Races[raceIndex][practice];
    if (!practiceData) {
      throw new Error(
        `${practice} data not found for race index ${raceIndex}.`
      );
    }

    const { time, date } = practiceData;
    const localTime = `${date}T${time}`;

    // Store local time
    localTimes[practice] = localTime;
  });

  return localTimes;
}

export class ConvertLocalTime {
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

export class ConvertLocalDate {
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
