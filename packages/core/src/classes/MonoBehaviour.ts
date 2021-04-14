import { EventTarget } from "./EventTarget"
import { Constructor } from "./Node"

export class MonoBehaviour extends EventTarget {
  getComponent<T extends MonoBehaviour>(T: Constructor<T>) {
    return this.parent?.get(T).next().value
  }

  getComponentInChildren<T extends MonoBehaviour>(T: Constructor<T>) {
    return this.parent?.getInChildren(T).next().value
  }

  getComponentInParent<T extends MonoBehaviour>(T: Constructor<T>) {
    if (!this.parent) {
      return
    }

    for (const ancestor of this.parent.getInParent()) {
      const component = ancestor.get(T).next().value

      if (component) {
        return component
      }
    }
  }
}
