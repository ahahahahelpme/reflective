import { MonoBehaviour } from "../../packages/core/src/classes/MonoBehaviour"
import { OnAttach } from "../../packages/core/src/hooks/OnAttach"
import { application } from "../application"
import { Container } from "pixi.js"

export class ContainerComponent extends MonoBehaviour implements OnAttach {
  value = new Container()

  onAttach() {
    application.stage.addChild(this.value)
  }
}
