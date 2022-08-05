# TrafficManager for OpenRCT2

This is a plugin for OpenRCT2. It will randomize vehicles on a ride to resemble more realistic traffic.

## Usage

This plugin works ideally on a ride that has several trains, each with one car. For example, you might have a parking lot simulated by a car ride with several stationary cars, or moving traffic simulated by moving cars.

Select the ride you want to modify from the drop-down list. The plugin window will appear, showing which vehicle types are supported in your map. The currently-supported vehicle types are:

* Sports cars (rct2.ride.spcar)
* Pickup trucks (rct2.ride.truck1)
* Automobile cars (rct2.ride.wcatc)
* Monster trucks (rct2.ride.4x4)
* Vintage cars (rct2.ride.vcr)
* Racing cars (rct2.ride.rcr)
* Soap boxes (rct2.ride.sbox)

When you click "Go", the plugin will randomize the type of vehicle, selecting from the list above and weighting based on hard-coded weights (so you will get, for example, about twice as many pickup trucks as automobile cars). The plugin will also randomize the color of each vehicle.

## Roadmap

Please submit any ideas under [issues](https://github.com/fidwell/OpenRct2-TrafficManager/issues).

* **Version 1** (this version): Randomizes vehicles based on a hard-coded list of vehicle types and weights.
* **Version 2** (upcoming): Allows the user to select their own weights, if they (for example) prefer a lot of pickup trucks.
* **Version 3**: Allows the user to select their own vehicle types.

**Other features in consideration**: Better color weights; automatically setting vehicle placement.

## Installation

1. This plugin requires at least OpenRCT2 version v0.4.1 (release) or the newest develop version.
2. Download the latest version of the plugin from the [Releases page](https://github.com/fidwell/OpenRct2-TrafficManager/releases).
3. Put the downloaded .js file into your `/OpenRCT2/plugin` folder.
4. The plugin settings window can be found in-game in the dropdown menu under the map icon.

## Modifying this plugin

This plugin's codebase is based on [wisnia74's TypeScript template](https://github.com/wisnia74/openrct2-typescript-mod-template). See the steps in [Basssiiie's Ride Vehicle Editor plugin README](https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor#building-the-source-code) for instructions on building and running the source code.

## Notes

Thanks to [wisnia74](https://github.com/wisnia74/openrct2-typescript-mod-template) for providing the template for this mod and readme. Thanks to [Basssiiie](https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor) for additional templating for the source code and this README, and for some of the vehicle object code.
