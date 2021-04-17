import { clamp } from "../functions/clamp"
import { milliseconds } from "../functions/milliseconds"
import { seconds } from "../functions/seconds"
import { OnRender } from "../hooks/OnRender"
import { OnRequestAnimationFrame } from "../hooks/OnRequestAnimationFrame"
import { OnUpdate } from "../hooks/OnUpdate"
import { GameObject } from "./GameObject"

/**
 * Игровой цикл.
 */
export class Ticker extends GameObject {
  /**
   * Длительность кадра в секундах.
   */
  readonly duration = milliseconds(1 / 60)

  /**
   * Идентификатор кадра анимации. Нужен в "stop()".
   */
  protected pendingAnimationFrame?: number

  /**
   * Отпечаток времени предыдущего кадра.
   */
  protected previousTime = performance.now()

  /**
   * Остановлен ли цикл.
   */
  protected stopped = true

  /**
   * Запущен ли цикл.
   */
  protected running = false

  /**
   * Отпечаток времени следующего кадра.
   */
  protected nextTime = performance.now()

  /**
   * Запускает цикл.
   */
  start = () => {
    this.propagate<OnRequestAnimationFrame>("onRequestAnimationFrame")

    if (this.stopped) {
      this.previousTime = performance.now()
      this.nextTime = performance.now()
    }

    this.pendingAnimationFrame = undefined
    this.stopped = false
    this.running = true

    // while update is behind
    for (
      ;
      this.running && this.nextTime < performance.now();
      this.nextTime += this.duration
    ) {
      const elapsedTime = seconds(this.difference)

      if (elapsedTime > 0) {
        this.propagate<OnUpdate>("onUpdate", elapsedTime)
      }

      this.previousTime = this.nextTime
    }

    this.propagate<OnRender>("onRender", this.interpolation)

    if (this.running) {
      this.pendingAnimationFrame = requestAnimationFrame(this.start)
    }
  }

  /**
   * Останавливает цикл.
   */
  stop() {
    this.running = false
    this.stopped = true

    // ungraceful stop called outside the loop
    if (this.pendingAnimationFrame) {
      cancelAnimationFrame(this.pendingAnimationFrame)
    }
  }

  /**
   * Рассчитывает значение интерполяции.
   * Отношение прошедшего времени и общего времени между кадрами.
   */
  protected get interpolation() {
    const interpolation = clamp(this.elapsed / this.difference, 0, 1)

    return seconds(this.duration) * interpolation
  }

  /**
   * Рассчитывает время между предыдущим и следующим кадром.
   */
  protected get difference() {
    return this.nextTime - this.previousTime
  }

  /**
   * Рассчитывает время между сейчас и следующим кадром.
   */
  protected get elapsed() {
    return performance.now() - this.previousTime
  }
}
