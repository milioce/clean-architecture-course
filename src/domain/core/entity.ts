export interface EntityData {
  id: number;
}

export abstract class Entity implements EntityData {

  constructor(public id: number) { }

  equals(object: Entity): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this.constructor !== object.constructor) {
      return false;
    }

    return this.id === object.id;
  }

}
