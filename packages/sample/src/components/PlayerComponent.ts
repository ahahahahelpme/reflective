import { input } from "../input"
import { Rigidbody } from "./Rigidbody"
import { MonoBehaviour, OnUpdate } from "@reflective/core"
import { Point } from "pixi.js"

export class PlayerComponent extends MonoBehaviour implements OnUpdate {
  @MonoBehaviour.GetComponent(Rigidbody)
  rb!: Rigidbody

  onUpdate() {
    // "getButtonDown" triggered when the button is pressed
    if (input.getButtonDown("Jump")) {
      this.rb.applyForce(new Point(0, -100))
      console.log("Jump Begin...")
    }

    // "getButtonUp" triggered when the button is released
    if (input.getButtonUp("Jump")) {
      console.log("Jump End...")
    }

    // "Fire" triggered when the left mouse button is clicked
    if (input.getButtonDown("Fire")) {
      console.log("Fire!")
    }

    if (input.getButton("Backward")) {
      this.rb.applyForce(new Point(0, 10))
    }

    if (input.getButton("Forward")) {
      this.rb.applyForce(new Point(0, -10))
    }

    if (input.getButton("Left")) {
      this.rb.applyForce(new Point(-10, 0))
    }

    if (input.getButton("Right")) {
      this.rb.applyForce(new Point(10, 0))
    }
  }
}
