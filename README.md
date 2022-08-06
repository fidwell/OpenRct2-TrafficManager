# TrafficManager for OpenRCT2

This is a plugin for OpenRCT2. It will randomize vehicles on a ride to resemble more realistic traffic.

![traffic-manager-demo](https://user-images.githubusercontent.com/5436387/183231083-5966d9c8-e745-4b65-998d-d62213fd81c2.gif)

## Usage

This plugin works ideally on a ride that has several trains, each with any number of cars. For example, you might have a parking lot simulated by a car ride with several stationary cars, or moving traffic simulated by moving cars.

If the ride you are trying to edit doesn't appear in the dropdown, it's been filtered out because it only has one train. This was intended to make "traffic" rides easier to find, but if that's an issue, it can be adjusted.

Select the ride you want to modify from the drop-down list. The plugin window will appear, showing which vehicle types are supported in your map. The currently-supported vehicle types are:

* Monster Trucks (rct2.ride.4x4)
* Go (rct2.ride.kart1)-Karts
* Bicycles (rct2.ride.monbk)
* Racing Cars (rct2.ride.rcr)
* Soap Boxes (rct2.ride.sbox)
* Sports Cars (rct2.ride.spcar)
* Pickup Trucks (rct2.ride.truck1)
* Vintage Cars (rct2.ride.vcr)
* Automobile Cars (rct2.ride.wcatc)
* 1920s Racing Cars (rct2tt.ride.1920racr)
* Gangster Cars (rct2tt.ride.ganstrcr)
* Police Car Trains (rct2tt.ride.polchase)
* Police Cars (rct2tt.ride.policecr)
* School Bus Trams (rct2tt.ride.schoolbs)
* Black Cabs (rct2ww.ride.blackcab)
* Limousine Trains (rct2ww.ride.caddilac)
* Routemaster Buses (rct2ww.ride.londonbs)
* Trabant Cars (rct2ww.ride.rssncrrd)
* Yellow Taxi Trains (rct2ww.ride.taxicstr)

When you click "Go", the plugin will randomize the type of vehicle, selecting from the list above and weighting based on hard-coded weights (so you will get, for example, about twice as many pickup trucks as automobile cars). The plugin will also randomize the colour of each vehicle.

**Note**: If you want to manually edit the ride list and weights, it is possible to do so with version 1 by editing the .js file directly. Look for (for example) `['rct2.ride.4x4',10]` in the code. This corresponds to the monster trucks with a weight of 10. You can modify these values with a text editor.

## Roadmap

Please submit any ideas under [issues](https://github.com/fidwell/OpenRct2-TrafficManager/issues).

* **Version 1** (this version): Randomizes vehicles based on a hard-coded list of vehicle types and weights.
* **Version 2** (upcoming): Allows the user to select their own weights, if they (for example) prefer a lot of pickup trucks.
* **Version 3**: Allows the user to select their own vehicle types.

**Other features in consideration**: Better colour weights that take vehicle type into consideration; automatically setting vehicle placement.

## Installation

1. This plugin requires at least OpenRCT2 version v0.4.1 (release) or the newest develop version.
2. Download the latest version of the plugin from the [Releases page](https://github.com/fidwell/OpenRct2-TrafficManager/releases).
3. Put the downloaded .js file into your `/OpenRCT2/plugin` folder.
4. The plugin settings window can be found in-game in the dropdown menu under the map icon.

## Modifying this plugin

This plugin's codebase is based on [wisnia74's TypeScript template](https://github.com/wisnia74/openrct2-typescript-mod-template). See the steps in [Basssiiie's Ride Vehicle Editor plugin README](https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor#building-the-source-code) for instructions on building and running the source code.

## Notes

Thanks to [wisnia74](https://github.com/wisnia74/openrct2-typescript-mod-template) for providing the template for this mod and readme. Thanks to [Basssiiie](https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor) for additional templating for the source code and this README, and for some of the vehicle object code.
