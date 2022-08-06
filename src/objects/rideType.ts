import * as Log from "../utilities/logger";

export default class RideType {
  readonly id: number;

  readonly name: string;

  readonly identifier: string;

  readonly weight: number;

  constructor(id: number, name: string, identifier: string, weight: number) {
    this.id = id;
    this.name = name;
    this.identifier = identifier;
    this.weight = weight;
  }

  getDefinition(): RideObject {
    return context.getObject("ride", this.id);
  }

  static getAvailableTypes(): RideType[] {
    return context
      .getAllObjects("ride")
      .map((r) => {
        const matchingRideTypes = this.weightMap.filter((m) => m[0] === r.identifier);
        if (matchingRideTypes.length === 1) {
          const weight = matchingRideTypes[0][1];
          Log.debug(`Found ride ${r.name} with id ${r.identifier} of index ${r.index}`);
          return new RideType(r.index, r.name, r.identifier, weight);
        }
        return null;
      })
      .filter((r) => r !== null && r.weight > 0);
  }

  static weightMap: object[] = [
    ["rct2.ride.4x4", 6], // Monster Trucks
    ["rct2.ride.kart1", 1], // Go-Karts
    ["rct2.ride.monbk", 1], // Bicycles
    ["rct2.ride.rcr", 4], // Racing Cars
    ["rct2.ride.sbox", 1], // Soap Boxes
    ["rct2.ride.spcar", 45], // Sports Cars
    ["rct2.ride.truck1", 30], // Pickup Trucks
    ["rct2.ride.vcr", 4], // Vintage Cars
    ["rct2.ride.wcatc", 15], // Automobile Cars
    ["rct2tt.ride.1920racr", 1], // 1920s Racing Cars
    ["rct2tt.ride.ganstrcr", 1], // Gangster Cars
    ["rct2tt.ride.hotrodxx", 1], // Hot Rod Trains
    ["rct2tt.ride.polchase", 1], // Police Car Trains
    ["rct2tt.ride.policecr", 1], // Police Cars
    ["rct2tt.ride.schoolbs", 1], // School Bus Trams
    ["rct2ww.ride.blackcab", 1], // Black Cabs
    ["rct2ww.ride.caddilac", 1], // Limousine Trains
    ["rct2ww.ride.londonbs", 1], // Routemaster Buses
    ["rct2ww.ride.rssncrrd", 5], // Trabant Cars
    ["rct2ww.ride.taxicstr", 1], // Yellow Taxi Trains
  ];
}
