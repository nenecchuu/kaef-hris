export function ConditionalRender({ show = true, children }) {
  if (!show) {
    return null;
  }

  return children;
}
