import { Application } from "pixi.js"

export const application = new Application({
  view: document.getElementById("canvas") as HTMLCanvasElement,
})
