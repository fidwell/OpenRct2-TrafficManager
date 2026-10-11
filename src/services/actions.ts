import * as Log from "../utilities/logger";

export interface RandomizeVehicleArgs {
  entityId: number;
  rideObject?: number;
  poweredMaxSpeed?: number;
}

const ACTION_RANDOMIZE_VEHICLE = "trafficManager-randomize-vehicle";

export function registerActions(): void {
  context.registerAction<RandomizeVehicleArgs>(
    ACTION_RANDOMIZE_VEHICLE,
    (args) => validateRandomizeVehicle(args.args),
    (args) => {
      const result = validateRandomizeVehicle(args.args);
      if (result.error !== undefined) {
        return result;
      }
      randomizeVehicle(args.args);
      return {};
    }
  );
}

export function executeRandomizeVehicle(args: RandomizeVehicleArgs): void {
  context.executeAction(ACTION_RANDOMIZE_VEHICLE, args, (result) => {
    if (result.error !== undefined) {
      Log.warning(`Randomize vehicle failed: ${result.errorMessage ?? "Unknown error."}`);
    }
  });
}

function validateRandomizeVehicle(args: RandomizeVehicleArgs): GameActionResult {
  const car = map.getEntity(args.entityId) as Car;
  if (!car) {
    return {
      error: 2,
      errorTitle: "Car not found",
      errorMessage: `Car ${args.entityId} could not be found.`
    };
  }
  return {};
}

function randomizeVehicle(args: RandomizeVehicleArgs): void {
  const car = map.getEntity(args.entityId) as Car;
  if (args.rideObject !== undefined) {
    car.rideObject = args.rideObject;
  }
  if (args.poweredMaxSpeed !== undefined) {
    car.poweredMaxSpeed = args.poweredMaxSpeed;
  }
}
