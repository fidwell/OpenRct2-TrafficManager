import { RideSetAppearanceType } from "../enums/rideSetAppearanceType";
import RideTrain from "../objects/rideTrain";
import WeightDictionary from "../objects/weightDictionary";
import * as Log from "../utilities/logger";
import NormalRandomizer from "./normalRandomizer";
import WeightsRandomizer from "./weightsRandomizer";

export interface WeightEntry {
  key: number;
  weight: number;
}

export interface RandomizeRideArgs {
  rideId: number;
  speedMedian: number;
  speedVariance: number;
  rideObjectWeights: WeightEntry[];
  primaryColourWeights: WeightEntry[];
  secondaryColourWeights: WeightEntry[];
}

const randomizeActionId = "trafficManager-randomize-ride";

export function registerActions(): void {
  context.registerAction<RandomizeRideArgs>(
    randomizeActionId,
    (actionArgs) => validateRandomizeRide(actionArgs.args),
    (actionArgs) => {
      const result = validateRandomizeRide(actionArgs.args);
      if (result.error !== undefined) {
        return result;
      }
      randomizeRide(actionArgs.args);
      return {};
    }
  );
}

export function executeRandomizeRide(args: RandomizeRideArgs): void {
  context.executeAction(randomizeActionId, args, (result) => {
    if (result.error !== 0) {
      Log.warning(`Randomize ride failed: ${result.errorMessage ?? "Unknown error."}`);
    }
  });
}

function validateRandomizeRide(args: RandomizeRideArgs): GameActionResult {
  if (!map.getRide(args.rideId)) {
    return {
      error: 2,
      errorTitle: "Ride not found",
      errorMessage: `Ride ${args.rideId} could not be found.`
    };
  }
  if (args.rideObjectWeights.length === 0) {
    return {
      error: 2,
      errorTitle: "Invalid parameters",
      errorMessage: "No ride types to randomize between."
    };
  }
  return {};
}

function randomizeRide(args: RandomizeRideArgs): void {
  const ride = map.getRide(args.rideId);
  if (!ride) {
    return;
  }

  const rideRandomizer = new WeightsRandomizer(args.rideObjectWeights.map((w) => new WeightDictionary(w.key, w.weight)));
  if (!rideRandomizer.canRandomize) {
    return;
  }

  const primaryColourRandomizer = new WeightsRandomizer(args.primaryColourWeights.map((w) => new WeightDictionary(w.key, w.weight)));
  const secondaryColourRandomizer = new WeightsRandomizer(args.secondaryColourWeights.map((w) => new WeightDictionary(w.key, w.weight)));

  const trains = ride.vehicles.map((r, i) => new RideTrain(i, r));
  let paintIndex = 0;

  for (let t = 0; t < trains.length; t += 1) {
    const vehicles = trains[t].getVehicles();
    const newSpeed: number = NormalRandomizer.getRandomValue(args.speedMedian, args.speedVariance);

    for (let v = 0; v < vehicles.length; v += 1) {
      const vehicle = vehicles[v];
      const car: Car = vehicle.getCar();

      if (vehicle.shouldColor()) {
        const newPrimaryColour: number = primaryColourRandomizer.getRandomValue();
        const newSecondaryColour: number = secondaryColourRandomizer.getRandomValue();
        const newTertiaryColour: number = secondaryColourRandomizer.getRandomValue();

        setVehicleColours(car.ride, paintIndex, newPrimaryColour, newSecondaryColour, newTertiaryColour);
      }

      if (vehicle.shouldRandomizeType()) {
        const newVehicleType: number = rideRandomizer.getRandomValue();
        if (newVehicleType >= 0) {
          car.rideObject = newVehicleType;
        }
      }

      if (vehicle.shouldRandomizeSpeed()) {
        car.poweredMaxSpeed = newSpeed;
      }

      paintIndex += 1;
    }
  }
}

function setVehicleColours(rideId: number, carIndex: number, primaryColour: number, secondaryColour: number, tertiaryColour: number): void {
  setColour(rideId, carIndex, RideSetAppearanceType.VehicleColourBody, primaryColour);
  setColour(rideId, carIndex, RideSetAppearanceType.VehicleColourTrim, secondaryColour);
  setColour(rideId, carIndex, RideSetAppearanceType.VehicleColourTernary, tertiaryColour);
}

function setColour(ride: number, index: number, type: number, colour: number): void {
  context.executeAction("ridesetappearance", {
    ride,
    type,
    value: colour,
    index,
    flags: 0
  });
}
