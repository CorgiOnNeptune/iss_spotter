const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 * 'https://api.ipify.org?format=json' {"ip":"50.99.179.236"}
 */


const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) return callback(err, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body).ip;

    return callback(null, data);
  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (err, response, body) => {
    if (err || response.statusCode !== 200)
      return callback(err, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates: ${body}`;
      return callback(err, null);
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const msg = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;

      return callback(Error(msg), null);
    }

    const { latitude, longitude } = parsedBody;

    return callback(null, { latitude, longitude });
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) return callback(err.message, null);

    if (response.statusCode !== 200)
      return callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    
    const times = JSON.parse(body).response;

    return callback(null, times);
  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) return callback(err, null);

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return callback(err, null);

      fetchISSFlyOverTimes(coords, (err, times) => {
        if (err) return callback(err, null);

        return callback(null, times);
      });
    });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};