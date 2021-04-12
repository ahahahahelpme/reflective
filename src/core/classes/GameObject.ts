import { OnCreate } from "../hooks/OnCreate"
import { OnRender } from "../hooks/OnRender"
import { OnUpdate } from "../hooks/OnUpdate"
import { Node } from "./Node"

export class GameObject extends Node implements OnUpdate, OnRender {
  constructor() {
    super()

    if (typeof (this as this & OnCreate).onCreate === "function") {
      ;(this as this & OnCreate).onCreate()
    }
  }

  onRender(interpolation: number): void {
    for (const child of this.getInChildren()) {
      if (typeof (child as typeof child & OnRender).onRender === "function") {
        ;(child as typeof child & OnRender).onRender(interpolation)
      }
    }
  }

  onUpdate(elapsedTime: number): void {
    for (const child of this.getInChildren()) {
      if (typeof (child as typeof child & OnUpdate).onUpdate === "function") {
        ;(child as typeof child & OnUpdate).onUpdate(elapsedTime)
      }
    }
  }
}
