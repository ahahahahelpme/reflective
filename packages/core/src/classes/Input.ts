import { OnRequestAnimationFrame } from "../hooks/OnRequestAnimationFrame"
import { EventTarget } from "./EventTarget"

export namespace Input {
  export type KeyboardEvent = globalThis.KeyboardEvent & {
    sourceCapabilities?: {
      firesTouchEvents?: boolean
    }
  }

  export type DefaultButton = {}

  export type Register = (
    onKeyDown: (key: string | number) => void,
    onKeyUp: (key: string | number) => void,
  ) => () => void
}
export const onKeyboardEvent: Input.Register = (onKeyDown, onKeyUp) => {
  const listener = (event: Input.KeyboardEvent) => {
    const { code, repeat, type } = event

    switch (type) {
      case "keydown":
        if (!repeat) {
          onKeyDown(code)
        }

        break
      case "keyup":
        onKeyUp(code)
        break
    }
  }

  addEventListener("keydown", listener)
  addEventListener("keyup", listener)

  return () => {
    removeEventListener("keydown", listener)
    removeEventListener("keyup", listener)
  }
}
export const onMouseEvent: Input.Register = (onKeyDown, onKeyUp) => {
  const listener = (event: MouseEvent) => {
    const { button, type } = event

    switch (type) {
      case "mousedown":
        onKeyDown(button)
        break
      case "mouseup":
        onKeyUp(button)
        break
    }
  }

  addEventListener("mousedown", listener)
  addEventListener("mouseup", listener)

  return () => {
    removeEventListener("mousedown", listener)
    removeEventListener("mouseup", listener)
  }
}
export class Input<
    T extends Map<string | number | symbol, (string | number)[]>,
    X = T extends Map<infer X, infer Y> ? X : never
  >
  extends EventTarget
  implements OnRequestAnimationFrame {
  protected state = new Map<
    string | number,
    Partial<{ down: number; up: number }>
  >()
  protected frame = 0

  constructor(readonly button: T) {
    super()

    this.register(onKeyboardEvent)
    this.register(onMouseEvent)
  }

  onRequestAnimationFrame(frame: number) {
    this.frame = frame
  }

  register(callback: Input.Register) {
    callback(this.onKeyDown, this.onKeyUp)
  }

  getButton(button: X) {
    // @ts-ignore
    return this.button.get(button)?.some((key) => this.getKey(key))
  }

  getButtonDown(button: X) {
    // @ts-ignore
    return this.button.get(button)?.some((key) => this.getKeyDown(key))
  }

  getButtonUp(button: X) {
    // @ts-ignore
    return this.button.get(button)?.some((key) => this.getKeyUp(key))
  }

  getKey(key: string | number) {
    return typeof this.state.get(key)?.down !== "undefined"
  }

  getKeyDown(key: string | number) {
    return this.state.get(key)?.down === this.frame
  }

  getKeyUp(key: string | number) {
    return this.state.get(key)?.up === this.frame
  }

  getMouseButton() {
    // do nothing
  }

  getMouseButtonDown() {
    // do nothing
  }

  getMouseButtonUp() {
    // do nothing
  }

  protected onKeyDown = (key: string | number) => {
    this.state.set(key, { down: this.frame + 1 })
  }

  protected onKeyUp = (key: string | number) => {
    this.state.set(key, { up: this.frame + 1 })
  }
}
