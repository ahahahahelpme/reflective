/** @jsx jsx */

import { application } from "./application"
import { AccelerationComponent } from "./components/AccelerationComponent"
import { ContainerComponent } from "./components/ContainerComponent"
import { PlayerComponent } from "./components/PlayerComponent"
import { PositionComponent } from "./components/PositionComponent"
import { Rigidbody } from "./components/Rigidbody"
import { SpriteComponent } from "./components/SpriteComponent"
import { VelocityComponent } from "./components/VelocityComponent"
import { View } from "./components/View"
import { input } from "./input"
import { ticker } from "./ticker"
import { GameObject, jsx } from "@reflective/core"

const Player = () => (
  <GameObject>
    <AccelerationComponent x={0} y={0} />
    <ContainerComponent />
    <PlayerComponent />
    <PositionComponent x={100} y={300} />
    <Rigidbody mass={1} />
    <SpriteComponent
      source={"https://pixijs.io/examples/examples/assets/bunny.png"}
    />
    <VelocityComponent x={-2} y={-10} />
    <View />
  </GameObject>
)

ticker.attach(input)
input.attach(<ContainerComponent container={application.stage} />)
const player = Player()
input.attach(player)
player.attach(Player())
ticker.start()
