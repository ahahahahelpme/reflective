import { AccelerationComponent } from "./AccelerationComponent"
import { PositionComponent } from "./PositionComponent"
import { VelocityComponent } from "./VelocityComponent"
import { MonoBehaviour, OnUpdate } from "@reflective/core"
import { Point } from "pixi.js"

export type RigidbodyProperties = {
  mass: number
}
export class Rigidbody extends MonoBehaviour implements OnUpdate {
  static GRAVITY = new Point(0, 9.8)
  static WIND = new Point(4.9, 0)

  @MonoBehaviour.GetComponent(AccelerationComponent)
  acceleration!: AccelerationComponent

  @MonoBehaviour.GetComponent(PositionComponent)
  position!: PositionComponent

  @MonoBehaviour.GetComponent(VelocityComponent)
  velocity!: VelocityComponent

  constructor(readonly properties: RigidbodyProperties) {
    super()
  }

  onUpdate(elapsedTime: number) {
    this.acceleration.value.x = 0
    this.acceleration.value.y = 0
    this.acceleration.value.x += Rigidbody.GRAVITY.x / this.properties.mass
    this.acceleration.value.y += Rigidbody.GRAVITY.y / this.properties.mass
    this.acceleration.value.x += Rigidbody.WIND.x / this.properties.mass
    this.acceleration.value.y += Rigidbody.WIND.y / this.properties.mass
    this.acceleration.value.x *= elapsedTime
    this.acceleration.value.y *= elapsedTime
    this.velocity.value.x += this.acceleration.value.x
    this.velocity.value.y += this.acceleration.value.y
    this.position.value.x += this.velocity.value.x
    this.position.value.y += this.velocity.value.y
  }
}
