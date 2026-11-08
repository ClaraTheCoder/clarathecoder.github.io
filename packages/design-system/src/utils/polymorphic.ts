import type { ComponentPropsWithoutRef, ElementType } from 'react';

/**
 * Props for a component that can render as any element via an `as` prop: the
 * component's own props (`Own`) merged with the target element's attributes.
 *
 * This replaces Base UI's `useRender` polymorphism (ADR 0005). A plain tag name
 * survives Astro's static render of a React component inside an `.astro`
 * template; a React element passed to a `render` prop does not, because the
 * element written in an Astro expression isn't a React element.
 */
export type Polymorphic<E extends ElementType, Own = unknown> = Own & {
  /** Render as this element or component (defaults to the component's base). */
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof Own | 'as'>;
