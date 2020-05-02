const BatteryUtil = require("./modules/Batteries");
const ACUtil = require("./modules/AC");
const powerSupplyDir = "/sys/class/power_supply";

var batteryNames = BatteryUtil.getBatteries(powerSupplyDir);
// [{degradation, currentCharge}, BatteryName]
var batteryStatusArray = [];
var ACStatus = Boolean(0);

for (let i = 0; i < batteryNames.length; i++) {
    batteryStatusArray.push([
        BatteryUtil.getBatteryStatus(powerSupplyDir, batteryNames[i]),
        batteryNames[i]
    ]);
}

ACStatus = ACUtil.acIsConnected(powerSupplyDir);
console.log(`AC is ${ACStatus ? "connected" : "not connected"}.\n`)

for (let i = 0; i < batteryStatusArray.length; i++) {
    batteryStatus = batteryStatusArray[i];
    console.log(`${batteryStatus[1]}\n\tDegradation - ${batteryStatus[0].degradation}\n\tCurrent Charge ${batteryStatus[0].currentCharge}`)
}