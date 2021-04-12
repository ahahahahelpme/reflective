/**
 * Ограничивает число между минимальным и максимальным.
 *
 * @param value Число, которое надо ограничить.
 * @param lower Минимальное число.
 * @param upper Максимальное число.
 *
 * @returns Ограниченное число.
 */
export const clamp = (value: number, lower: number, upper: number) =>
  Math.max(Math.min(value, upper), lower)
