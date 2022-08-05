import * as Log from "./utilities/logger";
import ParkRide from "./objects/parkRide";
import RideType from "./objects/rideType";

export default class Transformer {
  static go(ride: ParkRide, rideTypes: RideType[]): void {
    const trains = ride.getTrains();
    for (let t = 0; t < trains.length; t++) {
      const vehicles = trains[t].getVehicles();

      for (let v = 0; v < vehicles.length; v++) {
        const car: Car = vehicles[v].getCar();
        car.colours = <VehicleColour>{
          body: context.getRandom(0, 32),
          trim: context.getRandom(0, 32),
          ternary: context.getRandom(0, 32)
        };

        const newId = this.getRandomVehicleId(rideTypes);
        if (newId >= 0) {
          car.rideObject = newId;
        }
      }
    }
  }

  private static getRandomVehicleId(rideTypes: RideType[]): number {
    const ratioSum: number = rideTypes.map(t => t.ratio).reduce((a, b) => a + b);
    if (ratioSum <= 0) {
      return -1;
    }

    let randomValue = context.getRandom(0, ratioSum);
    
    for (let i = 0; i < rideTypes.length; i++) {
      if (randomValue < rideTypes[i].ratio) {
        return rideTypes[i].id;
      }

      randomValue -= rideTypes[i].ratio;
    }

    Log.debug(`Failed to find a ride; defaulting`);
    return rideTypes[rideTypes.length - 1].id;
  }
}
