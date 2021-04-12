import { MonoBehaviour } from "../core/classes/MonoBehaviour"
import { OnUpdate } from "../core/hooks/OnUpdate"
import { PositionComponent } from "./PositionComponent"
import { VelocityComponent } from "./VelocityComponent"

export class Rigidbody extends MonoBehaviour implements OnUpdate {
  position = this.get(PositionComponent).next().value
  velocity = this.get(VelocityComponent).next().value

  onUpdate(elapsedTime: number) {
    if (this.position && this.velocity) {
      const { position } = this.position
      const { velocity } = this.velocity

      position.x += velocity.x * elapsedTime
      position.y += velocity.y * elapsedTime
    }
  }
}
