import * as Inula from 'openinula';
import { createElement } from 'openinula';
import {
  attachProps,
  camelToDashCase,
  createForwardRef,
  dashToPascalCase,
  isCoveredByInula,
  mergeRefs,
} from './utils';

interface MaterialInulaInternalProps<ElementType>
  extends Inula.Component<ElementType> {
  forwardedRef?: any;
  ref?: Inula.Ref<any>;
}

export const createInulaComponent = <
  // @ts-ignore
  PropType,
  ElementType extends HTMLElement,
  ContextStateType = {},
  ExpandedPropsTypes = {},
>(
  tagName: string,
  InulaComponentContext?: Inula.Context<ContextStateType>,
) => {
  const displayName = dashToPascalCase(tagName);
  const InulaComponent = class extends Inula.Component<
    MaterialInulaInternalProps<ElementType>
  > {
    componentEl!: ElementType;

    setComponentElRef = (element: ElementType) => {
      this.componentEl = element;
    };

    constructor(props: MaterialInulaInternalProps<ElementType>) {
      super(props);
    }

    componentDidMount() {
      this.componentDidUpdate(this.props);
    }

    componentDidUpdate(prevProps: MaterialInulaInternalProps<ElementType>) {
      attachProps(this.componentEl, this.props, prevProps);
    }

    render() {
      // @ts-ignore
      const { children, forwardedRef, style, className, ref, ...cProps } =
        this.props;

      let propsToPass = Object.keys(cProps).reduce((acc: any, name) => {
        const value = (cProps as any)[name];

        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          const eventName = name.substring(2).toLowerCase();
          if (typeof document !== 'undefined' && isCoveredByInula(eventName)) {
            acc[name] = value;
          }
        } else {
          // we should only render strings, booleans, and numbers as attrs in html.
          // objects, functions, arrays etc get synced via properties on mount.
          const type = typeof value;

          if (type === 'string' || type === 'boolean' || type === 'number') {
            acc[camelToDashCase(name)] = value;
          }
        }
        return acc;
      }, {} as ExpandedPropsTypes);

      const newProps: Omit<
        MaterialInulaInternalProps<ElementType>,
        'forwardedRef'
      > = {
        ...propsToPass,
        ref: mergeRefs(forwardedRef, this.setComponentElRef),
        style,
      };

      /**
       * We use createElement here instead of
       * Inula.createElement to work around a
       * bug in Vite (https://github.com/vitejs/vite/issues/6104).
       * Inula.createElement causes all elements to be rendered
       * as <tagname> instead of the actual Web Component.
       */
      return createElement(tagName, newProps, children);
    }

    static get displayName() {
      return displayName;
    }
  };

  // If context was passed to createInulaComponent then conditionally add it to the Component Class
  if (InulaComponentContext) {
    InulaComponent.contextType = InulaComponentContext;
  }

  return createForwardRef(InulaComponent, displayName) as any;
};
