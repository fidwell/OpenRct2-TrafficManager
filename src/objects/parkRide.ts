import RideTrain from "./rideTrain";

export default class ParkRide {
  constructor(
    readonly rideId: number,
    readonly name: string
  ) { }

  getRideData(): Ride {
    return map.getRide(this.rideId);
  }

  getTrains(): RideTrain[] {
    const ride = this.getRideData();
    return ride
      .vehicles
      .map((r, i) => new RideTrain(i, r));
  }

  static getAllRides(): ParkRide[] {
    return map.rides
      .filter(r => r.classification === "ride")
      .filter(r => r.vehicles.length > 1)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(r => new ParkRide(r.id, r.name));
  }
}
