import { MonoBehaviour, OnAttach } from "@reflective/core"
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
    this.getComponentInParent(ContainerComponent)?.value.addChild(this.value)
  }
}
