import { type CSSProperties } from 'react';
import { cx } from '../../utils/cx.js';

/**
 * The code half of the hybrid layout engine.
 *
 * `@clara/tokens` generates the utility classes and the arbitrary-value fallback
 * chains in the utilities tier of `dist/tokens.css`; this module is the matching consumer that turns
 * a component's layout props into (a) utility class names for enumerable values
 * and (b) inline custom properties for arbitrary values. The two sides share a
 * naming contract — class bases, the `25`–`900` spacing steps, the breakpoint
 * rungs, and the `--<base>[-<bp>]` custom-property names — so changes must stay in
 * lockstep with `BREAKPOINTS_UTIL` / `SPACING_PROPS` / … in build.js.
 */

// Responsive object keys ("rungs"); `initial` is the breakpoint-less base value.
const RUNGS = ['initial', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
type Rung = (typeof RUNGS)[number];
export type Responsive<T> = T | Partial<Record<Rung, T>>;

// The 12-step spacing scale (names shared with the `--space-*` primitives).
export type SpaceScale =
  '25' | '50' | '100' | '150' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
// Spacing props take a scale step, a negated step (`-400`), or any CSS length.
// `(string & {})` keeps the scale literals in autocomplete without closing the type.
export type Space = SpaceScale | `-${SpaceScale}` | (string & {});

export type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around';
export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type Flow = 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';
export type Display =
  'none' | 'inline' | 'inline-block' | 'block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';

/** Shared layout props carried by every primitive (the Radix Box surface). */
export interface LayoutProps {
  p?: Responsive<Space>;
  px?: Responsive<Space>;
  py?: Responsive<Space>;
  pt?: Responsive<Space>;
  pr?: Responsive<Space>;
  pb?: Responsive<Space>;
  pl?: Responsive<Space>;
  m?: Responsive<Space>;
  mx?: Responsive<Space>;
  my?: Responsive<Space>;
  mt?: Responsive<Space>;
  mr?: Responsive<Space>;
  mb?: Responsive<Space>;
  ml?: Responsive<Space>;
  width?: Responsive<string>;
  minWidth?: Responsive<string>;
  maxWidth?: Responsive<string>;
  height?: Responsive<string>;
  position?: Responsive<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>;
  inset?: Responsive<string>;
  overflow?: Responsive<'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
  flexBasis?: Responsive<string>;
  flexGrow?: Responsive<string | number>;
  flexShrink?: Responsive<string | number>;
  gridColumn?: Responsive<string>;
  gridRow?: Responsive<string>;
  gridArea?: Responsive<string>;
  display?: Responsive<Display>;
}

/** Flex-only props layered on top of the shared surface. */
export interface FlexLayoutProps {
  direction?: Responsive<Direction>;
  align?: Responsive<Align>;
  justify?: Responsive<Justify>;
  wrap?: Responsive<Wrap>;
  gap?: Responsive<Space>;
  gapX?: Responsive<Space>;
  gapY?: Responsive<Space>;
}

/** Grid-only props layered on top of the shared surface. */
export interface GridLayoutProps {
  columns?: Responsive<string | number>;
  rows?: Responsive<string | number>;
  flow?: Responsive<Flow>;
  align?: Responsive<Align>;
  justify?: Responsive<Justify>;
  gap?: Responsive<Space>;
  gapX?: Responsive<Space>;
  gapY?: Responsive<Space>;
}

type Kind = 'scale' | 'enum' | 'arbitrary';
interface PropConfig {
  kind: Kind;
  base: string; // kebab class/var base, must match build.js
  toCss?: (value: unknown) => string; // arbitrary-value transform
}

const columnsToCss = (value: unknown): string => {
  const s = String(value);
  return /^\d+$/.test(s) ? `repeat(${s}, minmax(0, 1fr))` : s;
};

// propName (camelCase, as authored in JSX) -> how it compiles.
const CONFIG: Record<string, PropConfig> = {
  p: { kind: 'scale', base: 'p' },
  px: { kind: 'scale', base: 'px' },
  py: { kind: 'scale', base: 'py' },
  pt: { kind: 'scale', base: 'pt' },
  pr: { kind: 'scale', base: 'pr' },
  pb: { kind: 'scale', base: 'pb' },
  pl: { kind: 'scale', base: 'pl' },
  m: { kind: 'scale', base: 'm' },
  mx: { kind: 'scale', base: 'mx' },
  my: { kind: 'scale', base: 'my' },
  mt: { kind: 'scale', base: 'mt' },
  mr: { kind: 'scale', base: 'mr' },
  mb: { kind: 'scale', base: 'mb' },
  ml: { kind: 'scale', base: 'ml' },
  gap: { kind: 'scale', base: 'gap' },
  gapX: { kind: 'scale', base: 'gap-x' },
  gapY: { kind: 'scale', base: 'gap-y' },
  direction: { kind: 'enum', base: 'direction' },
  align: { kind: 'enum', base: 'align' },
  justify: { kind: 'enum', base: 'justify' },
  wrap: { kind: 'enum', base: 'wrap' },
  flow: { kind: 'enum', base: 'flow' },
  display: { kind: 'enum', base: 'display' },
  width: { kind: 'arbitrary', base: 'width' },
  minWidth: { kind: 'arbitrary', base: 'min-width' },
  maxWidth: { kind: 'arbitrary', base: 'max-width' },
  height: { kind: 'arbitrary', base: 'height' },
  position: { kind: 'arbitrary', base: 'position' },
  inset: { kind: 'arbitrary', base: 'inset' },
  overflow: { kind: 'arbitrary', base: 'overflow' },
  flexBasis: { kind: 'arbitrary', base: 'flex-basis' },
  flexGrow: { kind: 'arbitrary', base: 'flex-grow' },
  flexShrink: { kind: 'arbitrary', base: 'flex-shrink' },
  gridColumn: { kind: 'arbitrary', base: 'grid-column' },
  gridRow: { kind: 'arbitrary', base: 'grid-row' },
  gridArea: { kind: 'arbitrary', base: 'grid-area' },
  columns: { kind: 'arbitrary', base: 'columns', toCss: columnsToCss },
  rows: { kind: 'arbitrary', base: 'rows' },
};

const STEPS = new Set<string>([
  '25',
  '50',
  '100',
  '150',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]);
const isStep = (v: unknown): boolean => STEPS.has(String(v));
const isNegStep = (v: unknown): boolean => {
  const s = String(v);
  return s.startsWith('-') && STEPS.has(s.slice(1));
};

const rungsOf = <T>(value: Responsive<T>): [Rung, T][] => {
  if (value !== null && typeof value === 'object') {
    const obj = value as Partial<Record<Rung, T>>;
    return RUNGS.filter((r) => obj[r] != null).map((r) => [r, obj[r] as T]);
  }
  return [['initial', value as T]];
};

const withRung = (rung: Rung, selector: string): string =>
  rung === 'initial' ? selector : `${rung}:${selector}`;
const varName = (base: string, rung: Rung): string =>
  rung === 'initial' ? `--${base}` : `--${base}-${rung}`;

// A scale value as the custom-property value used on the arbitrary path: step
// names resolve to the matching `--space-*`, negatives to a calc(), anything else
// passes through as a raw CSS length.
const scaleToVar = (v: unknown): string => {
  if (isNegStep(v)) return `calc(-1 * var(--space-${String(v).slice(1)}))`;
  if (isStep(v)) return `var(--space-${String(v)})`;
  return String(v);
};

/**
 * Split a component's props into layout output (utility classes + inline custom
 * properties) and the remaining props to spread onto the element. `className` and
 * `style` are treated as passthrough so the caller can merge them.
 */
export function resolveLayoutProps(props: object): {
  layoutClassName: string;
  layoutStyle: CSSProperties;
  rest: Record<string, unknown>;
} {
  const classes: string[] = [];
  const style: Record<string, string> = {};
  const rest: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
    const cfg = CONFIG[key];
    if (!cfg) {
      rest[key] = value;
      continue;
    }
    if (value == null) continue;

    const rungs = rungsOf(value as Responsive<unknown>);
    if (cfg.kind === 'enum') {
      for (const [rung, v] of rungs) classes.push(withRung(rung, `${cfg.base}-${v}`));
    } else if (cfg.kind === 'scale') {
      const allSteps = rungs.every(([, v]) => isStep(v) || isNegStep(v));
      if (allSteps) {
        for (const [rung, v] of rungs) {
          const neg = isNegStep(v);
          const step = neg ? String(v).slice(1) : String(v);
          classes.push(withRung(rung, `${neg ? '-' : ''}${cfg.base}-${step}`));
        }
      } else {
        classes.push(cfg.base);
        for (const [rung, v] of rungs) style[varName(cfg.base, rung)] = scaleToVar(v);
      }
    } else {
      classes.push(cfg.base);
      for (const [rung, v] of rungs)
        style[varName(cfg.base, rung)] = cfg.toCss ? cfg.toCss(v) : String(v);
    }
  }

  return {
    layoutClassName: cx(...classes),
    layoutStyle: style as CSSProperties,
    rest,
  };
}
