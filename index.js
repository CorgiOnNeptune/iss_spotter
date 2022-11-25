const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

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


fetchISSFlyOverTimes({
  latitude: 53.544389,
  longitude: -113.4909267
}, (err, times) => {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log(`It worked! Returned fly over times:\n${JSON.stringify(times, null, 2)}`);
});