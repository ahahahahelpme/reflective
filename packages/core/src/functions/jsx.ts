export const jsx = <T extends Node, TFunction = new (...args: unknown[]) => T>(
  node: TFunction,
  properties:
    | (TFunction extends new (...args: infer U) => T ? U : never)
    | null,
  ...children: Node[]
) => {
  // @ts-ignore
  const object = new node(properties || undefined)

  for (const child of children) {
    object.attach(child)
  }

  return object
}
