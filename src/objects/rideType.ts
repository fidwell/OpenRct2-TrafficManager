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
        const matchingRideTypes = this.ratioMap.filter(m => m[0] === r.name);
        if (matchingRideTypes.length === 1) {
          const ratio = matchingRideTypes[0][1];
          return new RideType(r.index, r.name, ratio);
        } else {
          return null;
        }
      })
      .filter(r => r !== null && r.ratio > 0);
  }

  // Only works in English. Must find another solution.
  static ratioMap: object[] = [
    ["Sports Cars", 35],
    ["Pickup Trucks", 30],
    ["Automobile Cars", 15],
    ["Monster Trucks", 10],
    ["Vintage Cars", 5],
    ["Racing Cars", 4],
    ["Soap Boxes", 1],
  ];
}
