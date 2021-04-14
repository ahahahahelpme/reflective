import { MonoBehaviour } from "../../packages/core/src/classes/MonoBehaviour"
import { OnUpdate } from "../../packages/core/src/hooks/OnUpdate"
import { AccelerationComponent } from "./AccelerationComponent"
import { PositionComponent } from "./PositionComponent"
import { VelocityComponent } from "./VelocityComponent"
import { Point } from "pixi.js"

export type RigidbodyProperties = {
  mass: number
}

export class Rigidbody extends MonoBehaviour implements OnUpdate {
  static GRAVITY = new Point(0, 9.8)
  static WIND = new Point(4.9, 0)

  constructor(readonly properties: RigidbodyProperties) {
    super()
  }

  onUpdate(elapsedTime: number) {
    const acceleration = this.getComponent(AccelerationComponent)
    const position = this.getComponent(PositionComponent)
    const velocity = this.getComponent(VelocityComponent)

    if (!acceleration) {
      return
    }

    if (!position) {
      return
    }

    if (!velocity) {
      return
    }

    acceleration.value.x = 0
    acceleration.value.y = 0
    acceleration.value.x += Rigidbody.GRAVITY.x / this.properties.mass
    acceleration.value.y += Rigidbody.GRAVITY.y / this.properties.mass
    acceleration.value.x += Rigidbody.WIND.x / this.properties.mass
    acceleration.value.y += Rigidbody.WIND.y / this.properties.mass
    acceleration.value.x *= elapsedTime
    acceleration.value.y *= elapsedTime
    velocity.value.x += acceleration.value.x
    velocity.value.y += acceleration.value.y
    position.value.x += velocity.value.x
    position.value.y += velocity.value.y
  }
}
