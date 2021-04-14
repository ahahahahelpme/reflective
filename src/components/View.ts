import { MonoBehaviour } from "../../packages/core/src/classes/MonoBehaviour"
import { OnRender } from "../../packages/core/src/hooks/OnRender"
import { ContainerComponent } from "./ContainerComponent"
import { PositionComponent } from "./PositionComponent"
import { VelocityComponent } from "./VelocityComponent"

export class View extends MonoBehaviour implements OnRender {
  onRender(interpolation: number) {
    const container = this.parent?.get(ContainerComponent).next().value
    const position = this.parent?.get(PositionComponent).next().value
    const velocity = this.parent?.get(VelocityComponent).next().value

    if (container) {
      const x = position?.value.x || 0
      const y = position?.value.y || 0

      if (velocity) {
        container.value.position.x = x + velocity.value.x * interpolation
        container.value.position.y = y + velocity.value.y * interpolation
      } else {
        container.value.position.x = x
        container.value.position.y = y
      }
    }
  }
}
