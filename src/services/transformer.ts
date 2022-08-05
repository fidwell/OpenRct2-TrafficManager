import ParkRide from "../objects/parkRide";
import RideType from "../objects/rideType";
import WeightsRandomizer from "./weightsRandomizer";
import WeightDictionary from "../objects/weightDictionary";

export default class Transformer {
  static go(ride: ParkRide, rideTypes: RideType[]): void {
    const rideRandomizer = new WeightsRandomizer(rideTypes.map(t => new WeightDictionary(t.id, t.ratio)));

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

        const newId: number = rideRandomizer.getRandomValue();
        if (newId >= 0) {
          car.rideObject = newId;
        }
      }
    }
  }
}