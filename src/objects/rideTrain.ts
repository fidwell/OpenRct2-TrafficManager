import RideVehicle from "./rideVehicle";
import * as Log from "../utilities/logger";

export default class RideTrain {
  constructor(
    readonly index: number,
    readonly headCarId: number
  ) { }

  getVehicles(): RideVehicle[] {
    const vehicles: RideVehicle[] = [];
    let currentId: (number | null) = this.headCarId;

    while (currentId != null && currentId != 0xFFFF) {
      const vehicle = this.getCarEntity(currentId);
      if (!vehicle) {
        break;
      }

      vehicles.push(new RideVehicle(currentId));
      currentId = vehicle.nextCarOnTrain;
    }
    return vehicles;
  }

  private getCarEntity(carId: number): (Car | null) {
    const entity = map.getEntity(carId);
    if (!entity) {
      Log.error(`(train) Entity ${carId} could not be found.`);
      return null;
    }
    const vehicle = entity as Car;
    if (!vehicle) {
      Log.error(`(train) Entity ${entity} is not a car.`);
      return null;
    }
    return vehicle;
  }
}
