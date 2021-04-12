import { MonoBehaviour } from "../core/classes/MonoBehaviour"
import { OnCreate } from "../core/hooks/OnCreate"
import { ContainerComponent } from "./ContainerComponent"
import { Sprite, SpriteSource } from "pixi.js"

export namespace SpriteComponent {
  export type Properties = {
    source: SpriteSource
  }
}

export class SpriteComponent extends MonoBehaviour implements OnCreate {
  sprite = Sprite.from(this.properties.source)

  constructor(public properties: SpriteComponent.Properties) {
    super()
  }

  onCreate() {
    const container = this.get(ContainerComponent).next().value

    if (container) {
      container.container.addChild(this.sprite)
    }
  }
}
