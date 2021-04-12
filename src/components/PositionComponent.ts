import { MonoBehaviour } from "../core/classes/MonoBehaviour"
import { Point } from "pixi.js"

export namespace PositionComponent {
  export type Properties = Pick<Point, "x" | "y">
}

export class PositionComponent extends MonoBehaviour {
  position = new Point(this.properties.x, this.properties.y)

  constructor(public properties: PositionComponent.Properties) {
    super()
  }
}
