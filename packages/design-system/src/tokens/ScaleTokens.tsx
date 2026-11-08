import React from 'react';

function useVarValue(name: string): string {
  const [value, setValue] = React.useState('');
  React.useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
  }, [name]);
  return value;
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: 16,
};

const code: React.CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  fontSize: 11,
  lineHeight: 1.3,
  wordBreak: 'break-word',
  color: 'var(--color-text-subtle)',
};

const nameStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  color: 'var(--color-text)',
};

function Caption({ token, value, muted }: { token: string; value: string; muted?: boolean }) {
  return (
    <figcaption style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ ...nameStyle, ...(muted ? { color: 'var(--color-neutral-950)' } : {}) }}>
        {token}
      </span>
      <code style={{ ...code, ...(muted ? { color: 'var(--color-neutral-700)' } : {}) }}>
        {value || '—'}
      </code>
    </figcaption>
  );
}

export function RadiusScale() {
  const steps = ['none', 'sm', 'md', 'lg', 'full'];
  return (
    <div style={grid}>
      {steps.map((step) => (
        <RadiusSwatch key={step} step={step} />
      ))}
    </div>
  );
}
function RadiusSwatch({ step }: { step: string }) {
  const value = useVarValue(`--radius-${step}`);
  return (
    <figure style={{ margin: 0, minWidth: 0 }}>
      <div
        style={{
          height: 72,
          background: 'var(--color-accent)',
          borderStartStartRadius: `var(--radius-${step})`,
          borderStartEndRadius: `var(--radius-${step})`,
        }}
      />
      <Caption token={`radius-${step}`} value={value} />
    </figure>
  );
}

export function MotionScale() {
  const durations = ['base', 'slow'];
  return (
    <>
      <style>{`
        .ds-dur-box { transition-property: transform; transition-timing-function: var(--ease-standard); }
        .ds-dur-field:hover .ds-dur-box { transform: scale(1.5); }
      `}</style>
      <div className="ds-dur-field" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {durations.map((d) => (
          <DurationBox key={d} step={d} />
        ))}
      </div>
    </>
  );
}
function DurationBox({ step }: { step: string }) {
  const value = useVarValue(`--duration-${step}`);
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          width: 104,
          height: 104,
          display: 'grid',
          placeItems: 'center',
          background: 'var(--color-surface)',
          borderRadius: 12,
          boxShadow: 'inset 0 0 0 1px var(--color-border)',
        }}
      >
        <span
          className="ds-dur-box"
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: 'var(--color-accent)',
            transitionDuration: value || '160ms',
          }}
        />
      </div>
      <Caption token={`duration-${step}`} value={value} />
    </figure>
  );
}

export function ZScale() {
  const steps = ['below', 'base', 'sticky', 'dropdown', 'overlay', 'modal', 'popover', 'toast'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {steps.map((step) => (
        <ZRow key={step} step={step} />
      ))}
    </div>
  );
}
function ZRow({ step }: { step: string }) {
  const value = useVarValue(`--z-${step}`);
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
      <span style={{ ...nameStyle, width: 120 }}>z-{step}</span>
      <code style={{ ...code, fontVariantNumeric: 'tabular-nums' }}>{value || '—'}</code>
    </div>
  );
}
