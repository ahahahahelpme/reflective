import { ContainerComponent } from "./ContainerComponent"
import { PositionComponent } from "./PositionComponent"
import { VelocityComponent } from "./VelocityComponent"
import { MonoBehaviour, OnRender } from "@reflective/core"

export class View extends MonoBehaviour implements OnRender {
  @MonoBehaviour.GetComponent(ContainerComponent)
  container!: ContainerComponent

  @MonoBehaviour.GetComponent(PositionComponent)
  position!: PositionComponent

  @MonoBehaviour.GetComponent(VelocityComponent, { required: false })
  velocity?: VelocityComponent

  onRender(interpolation: number) {
    const x = this.position?.value.x || 0
    const y = this.position?.value.y || 0

    if (this.velocity) {
      this.container.value.position.x =
        x + this.velocity.value.x * interpolation

      this.container.value.position.y =
        y + this.velocity.value.y * interpolation
    } else {
      this.container.value.position.x = x
      this.container.value.position.y = y
    }
  }
}
