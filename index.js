const {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log('It didn\'t work!', err);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });


// fetchCoordsByIP('50.99.179.236', (err, coords) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }

//   console.log('It worked! Returned Geo Coordinates:\n', coords);
// });


// fetchISSFlyOverTimes({
//   latitude: 53.544389,
//   longitude: -113.4909267
// }, (err, times) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }

//   console.log(`It worked! Returned fly over times:\n${JSON.stringify(times, null, 2)}`);
// });


const printTimes = (times) => {
  times.forEach((time) => {
    const date = new Date(0);
    date.setSeconds(time.risetime);
    date.toLocaleTimeString('en-US');

    const duration = time.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
};


nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    console.log(err.message);
    return;
  }

  printTimes(passTimes);
});