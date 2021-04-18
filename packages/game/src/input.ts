import { Input } from "@reflective/core"

const create = <X extends string>(x: X, y: (string | number)[]) =>
  [x, y] as const

const DefaultButton = [
  create("Backward", ["ArrowDown", "KeyS"]),
  create("Fire", [0]),
  create("Forward", ["ArrowUp", "KeyW"]),
  create("Jump", ["Space"]),
  create("Left", ["ArrowLeft", "KeyA"]),
  create("Right", ["ArrowRight", "KeyD"]),
] as const

export const input = new Input(new Map(DefaultButton))
