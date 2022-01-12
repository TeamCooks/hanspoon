export function Wrapper({ as: Comp = 'main', className, ...restProps }) {
  return <Comp className={className} {...restProps} />;
}
