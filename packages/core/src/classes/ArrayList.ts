/**
 * Расширенный массив с дополнительными методами.
 */
export class ArrayList<T> extends Array<T> {
  /**
   * Удаляет первый элемент совпадающий с "searchElement" из массива.
   *
   * @param searchElement Элемент, который надо удалить.
   * @param fromIndex С какого индекса надо начать поиск. К индексу применен оператор "~".
   *
   * @returns Возвращает индекс удаленного элемента. К индексу применен оператор "~".
   */
  delete(searchElement: T, fromIndex = -1) {
    const index = this.indexOf(searchElement, ~fromIndex)

    if (index !== -1) {
      this.splice(index, 1)
    }

    return ~index
  }
}
