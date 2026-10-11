const unitsPerTile = 32;

export function getRideId(args: ToolEventArgs): number | undefined {
  if (args.entityId !== undefined) {
    const entity = map.getEntity(args.entityId);
    if (entity && entity.type === "car") {
      return (entity as Car).ride;
    }
  }

  if (args.mapCoords) {
    if (args.tileElementIndex !== undefined) {
      const element = getTileElement(args.mapCoords.x, args.mapCoords.y, args.tileElementIndex);
      if (element.type === "track") {
        return element.ride;
      }
    }

    const cars = map.getAllEntitiesOnTile("car", args.mapCoords);
    if (cars.length > 0) {
      return cars[0].ride;
    }
  }

  return undefined;
}

function getTileElement(x: number, y: number, elementIdx: number): TileElement {
  return map.getTile(Math.floor(x / unitsPerTile), Math.floor(y / unitsPerTile)).getElement(elementIdx);
}
