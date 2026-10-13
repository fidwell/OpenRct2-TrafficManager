import ParkRide from "../objects/parkRide";
import RideType from "../objects/rideType";
import WeightDictionary from "../objects/weightDictionary";
import { executeRandomizeRide } from "./actions";
import ColourMap from "./colourMap";
import WeightsRandomizer from "./weightsRandomizer";

export default class Transformer {
  static go(ride: ParkRide, rideTypes: RideType[], speedMedian: number, speedVariance: number): void {
    const rideRandomizer = new WeightsRandomizer(rideTypes.map((t) => new WeightDictionary(t.id, t.weight)));

    if (!rideRandomizer.canRandomize) {
      return;
    }

    executeRandomizeRide({
      rideId: ride.rideId,
      speedMedian,
      speedVariance,
      rideObjectWeights: rideTypes.map((t) => ({ key: t.id, weight: t.weight })),
      primaryColourWeights: ColourMap.primaryColours.map((w) => ({ key: w.key, weight: w.weight })),
      secondaryColourWeights: ColourMap.secondaryColours.map((w) => ({ key: w.key, weight: w.weight }))
    });
  }
}
