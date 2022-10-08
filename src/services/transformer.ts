import ParkRide from "../objects/parkRide";
import RideType from "../objects/rideType";
import WeightsRandomizer from "./weightsRandomizer";
import WeightDictionary from "../objects/weightDictionary";
import ColourMap from "./colourMap";
import { RideSetAppearanceType } from "../enums/rideSetAppearanceType";

export default class Transformer {
  static go(ride: ParkRide, rideTypes: RideType[]): void {
    const rideRandomizer = new WeightsRandomizer(rideTypes.map((t) => new WeightDictionary(t.id, t.weight)));

    if (!rideRandomizer.canRandomize) {
      return;
    }

    const primaryColourRandomizer = new WeightsRandomizer(ColourMap.primaryColours);
    const secondaryColourRandomizer = new WeightsRandomizer(ColourMap.secondaryColours);

    const trains = ride.getTrains();
    let carIndex = 0;

    for (let t = 0; t < trains.length; t += 1) {
      const vehicles = trains[t].getVehicles();

      for (let v = 0; v < vehicles.length; v += 1) {
        const car: Car = vehicles[v].getCar();

        Transformer.setVehicleColours(ride.rideId, carIndex,
          primaryColourRandomizer.getRandomValue(),
          secondaryColourRandomizer.getRandomValue(),
          secondaryColourRandomizer.getRandomValue());

        const newId: number = rideRandomizer.getRandomValue();
        if (newId >= 0) {
          car.rideObject = newId;
        }

        carIndex += 1;
      }
    }
  }

  static setVehicleColours(rideId: number, carIndex: number, primaryColour: number, secondaryColour: number, tertiaryColour: number) {
    Transformer.setColour(rideId, carIndex, RideSetAppearanceType.VehicleColourBody, primaryColour);
    Transformer.setColour(rideId, carIndex, RideSetAppearanceType.VehicleColourTrim, secondaryColour);
    Transformer.setColour(rideId, carIndex, RideSetAppearanceType.VehicleColourTernary, tertiaryColour);
  }

  static setColour(ride: number, index: number, type: number, colour: number) {
    context.executeAction("ridesetappearance", {
      ride,
      type,
      value: colour,
      index,
      flags: 0
    });
  }
}
