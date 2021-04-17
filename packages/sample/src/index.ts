import { application } from "./application"
import { AccelerationComponent } from "./components/AccelerationComponent"
import { ContainerComponent } from "./components/ContainerComponent"
import { PositionComponent } from "./components/PositionComponent"
import { Rigidbody } from "./components/Rigidbody"
import { SpriteComponent } from "./components/SpriteComponent"
import { VelocityComponent } from "./components/VelocityComponent"
import { View } from "./components/View"
import { ticker } from "./ticker"
import { GameObject } from "@reflective/core"
import { Point } from "pixi.js"

const Player = () => {
  const object = new GameObject()

  object.attach(new AccelerationComponent(new Point()))
  object.attach(new ContainerComponent())
  object.attach(new PositionComponent(new Point(100, 300)))

  object.attach(
    new Rigidbody({
      mass: 1,
    }),
  )

  object.attach(
    new SpriteComponent({
      source: "https://pixijs.io/examples/examples/assets/bunny.png",
    }),
  )

  object.attach(new VelocityComponent(new Point(-2, -10)))
  object.attach(new View())

  return object
}

ticker.attach(
  new ContainerComponent({
    container: application.stage,
  }),
)

const player = Player()

ticker.attach(player)
player.attach(Player())
ticker.start()
