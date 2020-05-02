const fs = require('fs');

/**
 * Get the current state of the AC cord
 * @param {string} source Directory which stores battery device information directories
 * @returns {boolean} True when the AC cable is connected
 */
function acIsConnected(source) {
    let connected = fs.readFileSync(`${source}/AC/online`, 'utf-8') == 1;
    return (connected);
}

module.exports.acIsConnected = acIsConnected;