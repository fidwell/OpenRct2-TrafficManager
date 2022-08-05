import * as Log from "../utilities/logger";

/**
 * Represents a ride type currently available to be build.
 * Shamelessly stolen from Bassiiie
 */
export default class RideType {
  /**
   * @param id The index of the loaded ride definition object.
   * @param name The name of the ride type.
   */
  constructor(
    readonly id: number,
    readonly name: string,
    readonly identifier: string,
    readonly ratio: number) {
  }

  /*
   * Gets the associated ride defintion from the game.
   */
  getDefinition(): RideObject {
    return context.getObject("ride", this.id);
  }

  /**
   * Gets all available ride types that are currently loaded.
   */
  static getAvailableTypes(): RideType[] {
    return context
      .getAllObjects("ride")
      .map(r => {
        const matchingRideTypes = this.ratioMap.filter(m => m[0] === r.identifier);
        if (matchingRideTypes.length === 1) {
          const ratio = matchingRideTypes[0][1];
          Log.debug(`Found ride ${r.name} with id ${r.identifier} of index ${r.index}`);
          return new RideType(r.index, r.name, r.identifier, ratio);
        } else {
          return null;
        }
      })
      .filter(r => r !== null && r.ratio > 0);
  }

  static ratioMap: object[] = [
    ["rct2.ride.spcar", 35], // Sports Cars
    ["rct2.ride.truck1", 30], // Pickup Trucks
    ["rct2.ride.wcatc", 15], // Automobile Cars
    ["rct2.ride.4x4", 10], // Monster Trucks
    ["rct2.ride.vcr", 5], // Vintage Cars
    ["rct2.ride.rcr", 4], // Racing Cars
    ["rct2.ride.sbox", 1], // Soap Boxes
  ];
}
