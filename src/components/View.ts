import { MonoBehaviour } from "../core/classes/MonoBehaviour"
import { OnRender } from "../core/hooks/OnRender"
import { ContainerComponent } from "./ContainerComponent"
import { PositionComponent } from "./PositionComponent"
import { VelocityComponent } from "./VelocityComponent"

export class View extends MonoBehaviour implements OnRender {
  container = this.get(ContainerComponent).next().value
  position = this.get(PositionComponent).next().value
  velocity = this.get(VelocityComponent).next().value

  onRender(interpolation: number) {
    if (this.container) {
      const x = this.position?.position.x || 0
      const y = this.position?.position.y || 0

      if (this.velocity) {
        this.container.container.position.x =
          x + this.velocity.velocity.x * interpolation

        this.container.container.position.y =
          y + this.velocity.velocity.y * interpolation
      } else {
        this.container.container.position.x = x
        this.container.container.position.y = y
      }
    }
  }
}
