export function scaleY (
    node: Element,
    { duration = 300, easing = (t: any) => t} = {}
) {
    return {
        duration,
        easing,
        css: (t: number) => `transform: scaleY(${t}); transform-origin: center;`
  };
}