// Used only after we get the available ride types from the map.
export default class CarTypeEntity {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly ratio: number) {
  }
}
