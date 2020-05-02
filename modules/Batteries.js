const fs = require('fs');

/**
 * @param {string} source Directory which stores battery device information directories
 */
function getBatteries(source) {
    let batteries = [];
    fs.readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.name.match("BAT") != null)
        .map(dirent => batteries.push(dirent.name));
    return (batteries);
}

module.exports.getBatteries = getBatteries;

/**
 * Gets current battery status, battery max charge degradation, current charge percent, etc
 * @param {string} source Directory which stores battery device information directories
 * @param {string} battery Battery name in source directory
 */
function getBatteryStatus(source, battery) {
    // Determine information about max
    // possible battery charge

    // Get the max charge currently possible
    let currentMaxCharge = parseInt(fs.readFileSync(`${source}/${battery}/energy_full`, 'utf-8')) | 1;
    // Get the max charge by designer specifications
    let factoryMaxCharge = parseInt(fs.readFileSync(`${source}/${battery}/energy_full_design`, 'utf-8')) | 1;
    // Determine the percentage of designer max charge possible now
    let factoryMaxChargeAvailablePercent = Math.round((currentMaxCharge / factoryMaxCharge) * 100);
    //// Determine the degradation of battery
    let maxChargeDegradationPercent = 100 - factoryMaxChargeAvailablePercent;

    // Determine information about current
    // battery charge

    // Get current charge number
    let currentCharge = fs.readFileSync(`${source}/${battery}/energy_now`, 'utf-8') | 1;
    //// Get percentage of max possible charge
    let currentChargePercent = Math.round((currentCharge / currentMaxCharge) * 100);

    failureNum = 1;
    if (currentMaxCharge < failureNum + 1 || factoryMaxCharge < failureNum + 1 || currentCharge < failureNum + 1)
    // I have made a mistake if this happens
    // Or something is just wrong with the battery
        return ({
        degradation: `${-1}`,
        currentCharge: `${-1}`
    });

    return ({
        degradation: `${maxChargeDegradationPercent}%`,
        currentCharge: `${currentChargePercent}%`
    })
}

module.exports.getBatteryStatus = getBatteryStatus;