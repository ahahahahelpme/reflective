export type OnUpdate = {
  /**
   * Обновления происходят не чаще N раз в секунду.
   *
   * @param elapsedTime Время между кадрами (в секундах).
   */
  onUpdate(elapsedTime: number): void
}
