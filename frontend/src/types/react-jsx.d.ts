// Bridge React.JSX namespace for @types/styled-components@5.1.34 compatibility.
// @types/react@18.0.x only defines JSX in global scope;
// @types/styled-components@5.1.34 references React.JSX.IntrinsicElements.
// We must mirror the full global JSX namespace so TypeScript doesn't use
// a partial override and break children resolution.
declare namespace React {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Element extends React.ReactElement<any, any> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicAttributes extends React.Attributes {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends globalThis.JSX.IntrinsicElements {}
  }
}
