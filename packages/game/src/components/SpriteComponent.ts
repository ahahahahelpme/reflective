import { ContainerComponent } from "./ContainerComponent"
import { MonoBehaviour, OnAttach } from "@reflective/core"
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
    this.getComponent(ContainerComponent)?.value.addChild(this.value)
  }
}
