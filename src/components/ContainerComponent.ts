import { MonoBehaviour } from "../../packages/core/src/classes/MonoBehaviour"
import { OnAttach } from "../../packages/core/src/hooks/OnAttach"
import { Container } from "pixi.js"

export type ContainerComponentProperties = {
  container?: Container
}

export class ContainerComponent extends MonoBehaviour implements OnAttach {
  value: Container

  constructor(readonly properties: ContainerComponentProperties = {}) {
    super()
    this.value = properties.container || new Container()
  }

  onAttach() {
    const parentContainer = this.getComponentInParent(ContainerComponent)

    if (!parentContainer) {
      return
    }

    parentContainer.value.addChild(this.value)
  }
}
