const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log('It didn\'t work!', err);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });


// fetchCoordsByIP('50.99.179.236', (err, ip) => {
//   if (err) {
//     console.log('It didn\'t work!', err.message);
//     return;
//   }

//   console.log('It worked! Returned Geo Coordinates:\n', ip);
// });