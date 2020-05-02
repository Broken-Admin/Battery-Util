## Battery-Util

### Information 

#### What is it?
* Essentially it is all based upon the files in the `models` directory.
* `models` includes basic files `AC.js` and `Batteries.js`.

#### Okay, but what do those files do?
* These files make use of basic linux kernel features, given the `/sys/class/power_supply` directory.
* The given directory contains symbolic links to the kernel devices

#### I still don't follow, care to explain?
* This is a basic proof of concept which allows fetching of battery information

#### What systems are supported?
* My current kernel version is `4.15.0-99-generic`, it should support any Linux system running that kernel version or newer.
* I believe MacOS also makes use of a *nix-like kernel. But I could not say if it works or not, as I have no device to test it on.

### For Developers or Willing Testers

* I would appreciate any information you may have about possible bugs or issues.
* If any testers or others more familar with the system are willing to see if it works on MacOS, I would be indebted.


### To-Do

* Possibly create a GUI version using Electron or basic C libraries.