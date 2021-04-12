export type OnRender = {
  /**
   * Отрисовка происходит постоянно.
   *
   * @param interpolation Время между кадрами (в секундах).
   */
  onRender(interpolation: number): void
}
