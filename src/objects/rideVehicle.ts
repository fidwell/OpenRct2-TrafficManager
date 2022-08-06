export default class RideVehicle {
  readonly entityId: number;

  constructor(entityId: number) {
    this.entityId = entityId;
  }

  getCar(): Car {
    return map.getEntity(this.entityId) as Car;
  }
}
