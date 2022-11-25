const {
  nextISSTimesForMyLocation
} = require('./iss_promised');


// fetchMyIP()
//   .then(body => fetchCoordsByIP(body))
//   .then(ip => fetchISSFlyOverTimes(ip))
//   .then(coords => console.log(coords));

const printTimes = (times) => {
  times.forEach((time) => {
    const date = new Date(0);
    date.setSeconds(time.risetime);
    date.toLocaleTimeString('en-US');

    const duration = time.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
};


nextISSTimesForMyLocation()
  .then((times) => {
    printTimes(times);
  })
  .catch((e) => {
    console.log('It didn\'t work', e.message);
  });