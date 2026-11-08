import React from 'react';

const STEPS = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950] as const;
const ALPHA_STEPS = [5, 10, 20, 40, 60, 80] as const;

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(69px, 1fr))',
  gap: 8,
};

const code: React.CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  fontSize: 10,
  lineHeight: 1.3,
  opacity: 0.6,
  wordBreak: 'break-word',
  color: 'var(--color-neutral-950)'
};

function Swatch({ name, label, alpha = false }: { name: string; label: string; alpha?: boolean }) {
  return (
    <figure style={{ margin: 0, minWidth: 0, color: 'var(--color-neutral-950)' }}>
      <div
        style={{
          height: 60,
          borderRadius: 10,
          boxShadow: 'inset 0 0 0 1px color-mix(in oklab, currentColor 12%, transparent)',
          position: 'relative',
          overflow: 'hidden',
          ...(alpha
            ? { backgroundImage: 'linear-gradient(90deg, #fff 0 50%, var(--color-neutral-900) 50%)' }
            : { background: `var(${name})` }),
        }}
      >
        {alpha && <span style={{ position: 'absolute', inset: 0, background: `var(${name})` }} />}
      </div>
      <figcaption style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          {label}
        </span>
      </figcaption>
    </figure>
  );
}

function RampHeading({ name, token }: { name: string; token: string }) {
  return (
    <h3 style={{ margin: '0 0 10px', fontSize: 15, textTransform: 'capitalize' }}>
      {name}{' '}
      <code style={{ ...code, opacity: 0.55, fontSize: 11 }}>{token}</code>
    </h3>
  );
}

export function ColorRamp({ name }: { name: string }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <RampHeading name={name} token={`--color-${name}-<step>`} />
      <div style={grid}>
        {STEPS.map((step) => (
          <Swatch key={step} name={`--color-${name}-${step}`} label={String(step)} />
        ))}
      </div>
    </section>
  );
}

export function Solids() {
  return (
    <div style={{ ...grid, marginBottom: 28 }}>
      <Swatch name="--color-white" label="white" />
      <Swatch name="--color-black" label="black" />
    </div>
  );
}

export function AlphaRamp({ base }: { base: 'black' | 'white' }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <RampHeading name={`${base} alpha`} token={`--color-${base}-alpha-<step>`} />
      <div style={grid}>
        {ALPHA_STEPS.map((step) => (
          <Swatch key={step} name={`--color-${base}-alpha-${step}`} label={`${step}%`} alpha />
        ))}
      </div>
    </section>
  );
}
