import { RideSetAppearanceType } from "../enums/rideSetAppearanceType";
import ParkRide from "../objects/parkRide";
import RideType from "../objects/rideType";
import WeightDictionary from "../objects/weightDictionary";
import { executeRandomizeVehicle } from "./actions";
import ColourMap from "./colourMap";
import NormalRandomizer from "./normalRandomizer";
import WeightsRandomizer from "./weightsRandomizer";

export default class Transformer {
  static go(ride: ParkRide, rideTypes: RideType[], speedMedian: number, speedVariance: number): void {
    const rideRandomizer = new WeightsRandomizer(rideTypes.map((t) => new WeightDictionary(t.id, t.weight)));

    if (!rideRandomizer.canRandomize) {
      return;
    }

    const primaryColourRandomizer = new WeightsRandomizer(ColourMap.primaryColours);
    const secondaryColourRandomizer = new WeightsRandomizer(ColourMap.secondaryColours);

    const trains = ride.getTrains();
    let paintIndex = 0;

    for (let t = 0; t < trains.length; t += 1) {
      const vehicles = trains[t].getVehicles();
      const newSpeed: number = NormalRandomizer.getRandomValue(speedMedian, speedVariance);

      for (let v = 0; v < vehicles.length; v += 1) {
        const vehicle = vehicles[v];
        const car: Car = vehicle.getCar();

        if (vehicle.shouldColor()) {
          const newPrimaryColour: number = primaryColourRandomizer.getRandomValue();
          const newSecondaryColour: number = secondaryColourRandomizer.getRandomValue();
          const newTertiaryColour: number = secondaryColourRandomizer.getRandomValue();

          Transformer.setVehicleColours(car.ride, paintIndex,
            newPrimaryColour,
            newSecondaryColour,
            newTertiaryColour);
          paintIndex += 1;
        }

        if (vehicle.shouldRandomizeType()) {
          const newVehicleType: number = rideRandomizer.getRandomValue();
          if (newVehicleType >= 0) {
            executeRandomizeVehicle({ entityId: vehicle.entityId, rideObject: newVehicleType });
          }
        }

        if (vehicle.shouldRandomizeSpeed()) {
          executeRandomizeVehicle({ entityId: vehicle.entityId, poweredMaxSpeed: newSpeed });
        }
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
