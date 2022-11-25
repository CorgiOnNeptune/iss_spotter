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

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const msg = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;

      return callback(Error(msg), null);
    }

    const { latitude, longitude } = parsedBody;

    return callback(null, { latitude, longitude });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};