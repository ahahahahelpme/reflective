import { MonoBehaviour } from "../../packages/core/src/classes/MonoBehaviour"
import { OnAttach } from "../../packages/core/src/hooks/OnAttach"
import { ContainerComponent } from "./ContainerComponent"
import { Sprite, SpriteSource } from "pixi.js"

export type SpriteComponentProperties = {
  source: SpriteSource
}

export class SpriteComponent extends MonoBehaviour implements OnAttach {
  value: Sprite

  constructor(readonly properties: SpriteComponentProperties) {
    super()
    this.value = Sprite.from(this.properties.source)
  }

  onAttach() {
    const container = this.getComponent(ContainerComponent)

    if (container) {
      container.value.addChild(this.value)
    }
  }
}
