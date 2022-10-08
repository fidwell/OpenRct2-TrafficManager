export default class RideVehicle {
  readonly entityId: number;

  constructor(entityId: number) {
    this.entityId = entityId;
  }

  getCar(): Car {
    return map.getEntity(this.entityId) as Car;
  }

  shouldRandomizeType(): boolean {
    // Don't randomize invisible vehicles
    // that are used for powered rides.
    // There isn't a great way to determine
    // when this is the case, but if a car
    // can't hold any peeps, that's usually
    // a safe bet.
    const car = this.getCar();
    return car.numSeats !== 0;
  }
}
