# TrafficManager for OpenRCT2

This is a plugin for OpenRCT2. It will randomize vehicles on a ride to resemble more realistic traffic.

![traffic-manager-demo-3 0](https://user-images.githubusercontent.com/5436387/197081735-29d5a07c-09b0-43bc-ba89-4bbf63281a28.gif)

## Usage

For moving traffic, this plugin works ideally on a ride that has several trains, each with one cars. For parking lots, using one very long train is recommended, as you can then use the [Ride Vehicle Editor](https://openrct2plugins.org/plugin/MDEwOlJlcG9zaXRvcnkzMTI2MjQ1MjY=/OpenRCT2-RideVehicleEditor) to move the cars around.

If you want the colors to properly randomize, set the color dropdown in the ride window to "Different colors per car".

Select the ride you want to modify from the drop-down list. The plugin window will appear, showing which vehicle types are supported in your map. The currently-supported vehicle types are:

- Monster Trucks (rct2.ride.4x4)
- Bicycles (rct2.ride.monbk)
- Racing Cars (rct2.ride.rcr)
- Soap Boxes (rct2.ride.sbox)
- Sports Cars (rct2.ride.spcar)
- Pickup Trucks (rct2.ride.truck1)
- Vintage Cars (rct2.ride.vcr)
- Automobile Cars (rct2.ride.wcatc)
- Gangster Cars (rct2tt.ride.ganstrcr)
- Police Car Trains (rct2tt.ride.polchase)
- Police Cars (rct2tt.ride.policecr)
- School Bus Trams (rct2tt.ride.schoolbs)
- Black Cabs (rct2ww.ride.blackcab)
- Limousine Trains (rct2ww.ride.caddilac)
- Routemaster Buses (rct2ww.ride.londonbs)
- Trabant Cars (rct2ww.ride.rssncrrd)
- Yellow Taxi Trains (rct2ww.ride.taxicstr)

When you click "Go", the plugin will randomize the type of vehicle, selecting from the list above and weighting based on the weights input by the user. The plugin will also randomize the colour of each vehicle.

**Note**: If you want to manually edit the ride list to add more rides, it is possible to do so by editing the .js file directly. Look for (for example) `['rct2.ride.4x4',10]` in the code. This corresponds to the monster trucks with a weight of 10. You can add new entries to the array here, as long as you know the internal id of the ride.

The plugin will also randomize the speed of vechicles, if they're moving (your ride is open or testing). You can specify the average speed for each vehicle, and how much the variation in speed will be randomized. If the variation is set to "None", the vehicles will all go the same exact speed. Increasing the variation will cause some vehicles to go faster or slower. (Note that if you set the variation to "A lot", it can result in some nasty traffic jams!)

### Troubleshooting

**There are a bunch of supported vehicles missing from the plugin!** The plugin can only use vehicle types that are included in your map. Use the object selection tool to add the vehicles you'd like.

## Roadmap

Please submit any ideas under [issues](https://github.com/fidwell/OpenRct2-TrafficManager/issues).

### Version history

- **Version 1**: Randomizes vehicles based on a hard-coded list of vehicle types and weights.
- **Version 2**: Allows the user to select their own weights, if they (for example) prefer a lot of pickup trucks.
- **Version 3**: Randomizes the speed of powered vehicles, for moving traffic.

### Features in consideration

- Better colour weights that take vehicle type into consideration
- Customizable colour weights
- Automatically setting vehicle placement for parking lots (this is probably very hard)
- Allow the user to select their own vehicle types (in addition to the ones already hard-coded into the plugin)

## Installation

1. This plugin requires at least OpenRCT2 version v0.4.1 (release) or the newest develop version.
2. Download the latest version of the plugin from the [Releases page](https://github.com/fidwell/OpenRct2-TrafficManager/releases).
3. Put the downloaded .js file into your `/OpenRCT2/plugin` folder.
4. The plugin settings window can be found in-game in the dropdown menu under the map icon.

## Modifying this plugin

This plugin's codebase is based on [wisnia74's TypeScript template](https://github.com/wisnia74/openrct2-typescript-mod-template). See the steps in [Basssiiie's Ride Vehicle Editor plugin README](https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor#building-the-source-code) for instructions on building and running the source code.

## Notes

Thanks to [wisnia74](https://github.com/wisnia74/openrct2-typescript-mod-template) for providing the template for this mod and readme. Thanks to [Basssiiie](https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor) for additional templating for the source code and this README, and for some of the vehicle object code.
