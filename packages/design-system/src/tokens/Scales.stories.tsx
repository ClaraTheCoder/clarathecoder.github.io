import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { RadiusScale, MotionScale, ZScale } from './ScaleTokens';

/**
 * Non-colour foundations: the primitive scales for radius, elevation, motion and
 * stacking order, plus the semantic focus ring. Rendered as a story (not a docs
 * page) so the theme/mode toolbar propagates. Switch presets to see them restyle.
 */
const meta: Meta = {
  title: 'Foundations',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

function Section({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2
        style={{
          margin: '0 0 4px',
          fontFamily: 'var(--text-heading-4-font-family)',
          fontSize: 'var(--text-heading-4-font-size)',
          fontWeight: 'var(--text-heading-4-font-weight)',
          lineHeight: 'var(--text-heading-4-line-height)',
          letterSpacing: 'var(--text-heading-4-letter-spacing)',
          color: 'var(--color-text)',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          margin: '0 0 16px',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 12,
          color: 'var(--color-text-subtle)',
        }}
      >
        {hint}
      </p>
      {children}
    </section>
  );
}

export const Scales: Story = {
  render: () => (
    <div
      style={{
        padding: 40,
        maxWidth: '60rem',
        color: 'var(--color-text)',
        fontFamily: 'var(--text-body-font-family)',
      }}
    >
      <Section title="Radius" hint="--radius-{none,sm,md,lg,full}">
        <RadiusScale />
      </Section>
      <Section title="Motion" hint="--duration-{base,slow} + --ease-standard — should always be paired with a prefers-reduced-motion option">
        <MotionScale />
      </Section>
      <Section title="Z-index" hint="--z-{below…toast} — semantic stacking ladder">
        <ZScale />
      </Section>
    </div>
  ),
};
