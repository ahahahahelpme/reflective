import { MonoBehaviour } from "../../packages/core/src/classes/MonoBehaviour"
import { Point } from "pixi.js"

export type PointComponentProperties = Pick<Point, "x" | "y">

export class PointComponent extends MonoBehaviour {
  value: Point

  constructor(readonly properties: PointComponentProperties) {
    super()
    this.value = new Point(this.properties.x, this.properties.y)
  }
}
