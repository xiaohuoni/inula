// @ts-nocheck
import * as Inula from 'openinula';

export const setRef = (ref, value: any) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref != null) {
    // Cast as a MutableRef so we can assign current
    (ref as any).current = value;
  }
};

export const mergeRefs = (...refs): any => {
  return (value: any) => {
    refs.forEach((ref) => {
      setRef(ref, value);
    });
  };
};

export const createForwardRef = (InulaComponent: any, displayName: string) => {
  const forwardRef = (props, ref) => {
    // @ts-ignore
    return /* @__PURE__ */ Inula.createElement(InulaComponent, {
      ...props,
      forwardedRef: ref,
    });
  };
  forwardRef.displayName = displayName;

  return Inula.forwardRef(forwardRef);
};

export const defineCustomElement = (tagName: string, customElement: any) => {
  if (
    customElement !== undefined &&
    typeof customElements !== 'undefined' &&
    !customElements.get(tagName)
  ) {
    customElements.define(tagName, customElement);
  }
};

export * from './attachProps';
export * from './case';
