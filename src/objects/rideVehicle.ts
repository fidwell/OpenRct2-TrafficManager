export default class RideVehicle {
  constructor(readonly entityId: number) { }

  getCar(): Car {
    return map.getEntity(this.entityId) as Car;
  }
}
