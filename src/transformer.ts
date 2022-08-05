import ParkRide from "./objects/parkRide";
import RideType from "./objects/rideType";

export default class Transformer {
  static go(ride: ParkRide): void {
    const trains = ride.getTrains();

    const availableTypes = this.getAvailableTypes().filter(t => this.isValidCarType(t.name));

    for (let t = 0; t < trains.length; t++) {
      const vehicles = trains[t].getVehicles();

      for (let v = 0; v < vehicles.length; v++) {
        const car: Car = vehicles[v].getCar();
        car.colours = <VehicleColour>{
          body: context.getRandom(0, 32),
          trim: context.getRandom(0, 32),
          ternary: context.getRandom(0, 32)
        };

        const newType = availableTypes[context.getRandom(0, availableTypes.length)];
        car.rideObject = newType.id;
      }
    }
  }

  static getAvailableTypes(): RideType[] {
    return context
      .getAllObjects("ride")
      .filter(r => r.carsPerFlatRide !== 0) // tracked rides == 255, flatrides >= 1, shops == 0
      .map(r => new RideType(
        r.index,
        r.name,
        r.vehicles
          .filter(v => v.baseImageId > 0)
          .length
      ))
      .sort((a, b) => a.name.localeCompare(b.name));
    }

  private static isValidCarType(rideName: string): boolean {
    return this.validTypes.some(t => rideName.search(t) >= 0);
  }

  private static validTypes: string[] = [
    "Sports Cars",
    "Pickup Trucks",
    "Automobile Cars",
    "Monster Trucks",
    "Vintage Cars",
    "Racing Cars",
    "Soap Boxes"
  ];
}
