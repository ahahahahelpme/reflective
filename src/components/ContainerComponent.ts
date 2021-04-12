import { application } from "../core/application"
import { MonoBehaviour } from "../core/classes/MonoBehaviour"
import { OnCreate } from "../core/hooks/OnCreate"
import { Container } from "pixi.js"

export class ContainerComponent extends MonoBehaviour implements OnCreate {
  container = new Container()

  onCreate() {
    application.stage.addChild(this.container)
  }
}
