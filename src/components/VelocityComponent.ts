import { MonoBehaviour } from "../core/classes/MonoBehaviour"
import { Point } from "pixi.js"

export namespace VelocityComponent {
  export type Properties = Pick<Point, "x" | "y">
}

export class VelocityComponent extends MonoBehaviour {
  velocity = new Point(this.properties.x, this.properties.y)

  constructor(public properties: VelocityComponent.Properties) {
    super()
  }
}
