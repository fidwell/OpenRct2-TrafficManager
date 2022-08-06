import ParkRide from "../objects/parkRide";
import RideType from "../objects/rideType";
import WeightsRandomizer from "./weightsRandomizer";
import WeightDictionary from "../objects/weightDictionary";
import ColourMap from "./colourMap";

export default class Transformer {
  static go(ride: ParkRide, rideTypes: RideType[]): void {
    const rideRandomizer = new WeightsRandomizer(rideTypes.map((t) => new WeightDictionary(t.id, t.ratio)));
    const primaryColourRandomizer = new WeightsRandomizer(ColourMap.primaryColours);
    const secondaryColourRandomizer = new WeightsRandomizer(ColourMap.secondaryColours);

    const trains = ride.getTrains();
    for (let t = 0; t < trains.length; t += 1) {
      const vehicles = trains[t].getVehicles();

      for (let v = 0; v < vehicles.length; v += 1) {
        const car: Car = vehicles[v].getCar();
        car.colours = <VehicleColour>{
          body: primaryColourRandomizer.getRandomValue(),
          trim: secondaryColourRandomizer.getRandomValue(),
          ternary: secondaryColourRandomizer.getRandomValue()
        };

        const newId: number = rideRandomizer.getRandomValue();
        if (newId >= 0) {
          car.rideObject = newId;
        }
      }
    }
  }
}
