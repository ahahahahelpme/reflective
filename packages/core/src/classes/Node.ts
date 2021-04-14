import { ArrayList } from "./ArrayList"

export type Constructor<T> = new (...args: never[]) => T

/**
 * Базовый класс узла.
 * Имеет методы для перемещения по дереву узлов.
 */
export class Node {
  /**
   * Ссылка на предыдущий узел (в родительском массиве "children").
   */
  protected previous?: Node

  /**
   * Массив потомков.
   */
  readonly children = new ArrayList<Node>()

  /**
   * Ссылка на родительский узел.
   */
  parent?: Node

  /**
   * Ссылка на следующий узел (в родительском массиве "children").
   */
  protected next?: Node

  /**
   * Добавляет потомка к этому узлу, а также обновляет ссылки
   * на следующий, предыдущий и родительский узлы.
   *
   * @param child Потомок.
   */
  attach(child: Node) {
    // Последний добавленный потомок.
    const previous = this.children[this.children.length - 1]

    // Если он существует ("Attach()" был вызван хотя бы один раз).
    if (previous) {
      // Последний добавленный потомок ссылается на новый узел "child".
      previous.next = child
      // "child" ссылается на последнего добавленного потомка.
      child.previous = previous
    }

    // "child" ссылается на этот узел (родительский).
    child.parent = this

    // Наконец-то, добавляем его в массив потомков.
    this.children.push(child)
  }

  /**
   * Удаляет потомка из этого узла, а также обновляет ссылки
   * на следующий, предыдущий и родительский узлы.
   *
   * @param child Потомок.
   */
  detach(child: Node) {
    if (child.previous) {
      // Было:
      // A -> "child" -> B
      // Стало:
      // A -> B
      child.previous.next = child.next
    }

    if (child.next) {
      // Было:
      // A <- "child" <- B
      // Стало:
      // A <- B
      child.next.previous = child.previous
    }

    if (child.parent) {
      // "parent" -> "child"
      child.parent.children.delete(child)
      // "parent" <- "child"
      child.parent = undefined
    }
  }

  /**
   * Итератор по дочерним узлам.
   *
   * @param predicate Критерий поиска, если не передан, будут возвращены все узлы.
   *
   * @yields Узел, удовлетворяющий критерию поиска.
   */
  get(): Generator<Node, undefined, undefined>

  get<T extends Node>(T: Constructor<T>): Generator<T, undefined, undefined>

  *get<T extends Node>(T?: Constructor<T>) {
    const children = this.children

    for (const child of children) {
      if (!T || child instanceof T) {
        yield child
      }
    }
  }

  /**
   * Итератор по дочерним узлам и дочерним узлам дочерних узлов (рекурсивный).
   * Используется Breadth-First алгоритм (поиск в ширину).
   *
   * @param predicate Критерий поиска, если не передан, будут возвращены все узлы.
   *
   * @yields Узел, удовлетворяющий критерию поиска.
   */
  getInChildren(): Generator<Node, undefined, undefined>

  getInChildren<T extends Node>(
    T: Constructor<T>,
  ): Generator<T, undefined, undefined>

  *getInChildren<T extends Node>(T?: Constructor<T>) {
    const children = this.children.slice()

    for (const child of children) {
      if (!T || child instanceof T) {
        yield child
      }

      children.push(...child.children)
    }
  }

  /**
   * Итератор по родительским узлам (включая узел, на котором вызвана эта функция).
   *
   * @param predicate Критерий поиска, если не передан, будут возвращены все узлы.
   *
   * @yields Узел, удовлетворяющий критерию поиска.
   */
  getInParent(): Generator<Node, undefined, undefined>

  getInParent<T extends Node>(
    T: Constructor<T>,
  ): Generator<T, undefined, undefined>

  *getInParent<T extends Node>(T?: Constructor<T>) {
    const ancestors: Node[] = [this]

    for (const ancestor of ancestors) {
      if (!T || ancestor instanceof T) {
        yield ancestor
      }

      if (ancestor.parent) {
        ancestors.push(ancestor.parent)
      }
    }
  }
}
