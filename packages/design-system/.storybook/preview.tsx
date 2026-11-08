import React from 'react';
import { definePreview, type Decorator } from '@storybook/react-vite';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import '@clara/tokens/tokens.css';
import '../src/styles/index.css';

const presets = [
  { value: 'default', title: 'Default' },
  { value: 'opal', title: 'Opal' },
  { value: 'pow', title: 'Pow' },
  { value: 'datum', title: 'Datum' },
];

const withTheme: Decorator = (Story, context) => {
  const preset = context.globals.preset ?? 'default';
  const mode = context.globals.mode ?? 'light';
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    // 'default' is the base theme — no [data-preset] layer.
    if (preset === 'default') root.removeAttribute('data-preset');
    else root.setAttribute('data-preset', preset);
  }
  // Per-theme stage backdrops. The pattern themes draw with the live
  // `--color-accent`, so they track whatever accent the active theme/mode sets.
  // Dots (pow) and blueprint grid (datum) are ported from the old site.
  const backdrops: Record<
    string,
    { image: string; size: string; position: string; repeat: string }
  > = {
    opal: {
      image: `url("${mode === 'light' ? 'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' : 'https://images.unsplash.com/photo-1638215134810-313b0fd2dafb?q=80&w=2346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'}")`,
      size: 'cover',
      position: 'center',
      repeat: 'no-repeat',
    },
    pow: {
      image:
        'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 14%, transparent) 1.2px, transparent 1.3px), radial-gradient(circle, color-mix(in srgb, var(--color-accent) 14%, transparent) 1.2px, transparent 1.3px)',
      size: '12px 12px, 12px 12px',
      position: '0 0, 6px 6px',
      repeat: 'repeat',
    },
    datum: {
      image:
        'repeating-linear-gradient(0deg, color-mix(in srgb, var(--color-accent) 8%, transparent) 0 1px, transparent 1px 34px), repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 8%, transparent) 0 1px, transparent 1px 34px)',
      size: 'auto',
      position: '0 0',
      repeat: 'repeat',
    },
  };
  const backdrop = backdrops[preset];

  return (
    <div
      style={{
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 28,
        background: 'var(--color-bg)',
        backgroundImage: backdrop?.image ?? '',
        backgroundSize: backdrop?.size ?? 'auto',
        backgroundPosition: backdrop?.position ?? '0 0',
        backgroundRepeat: backdrop?.repeat ?? 'repeat',
        color: 'var(--color-text)',
      }}
    >
      <Story />
    </div>
  );
};

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  globalTypes: {
    preset: {
      description: 'Theme preset',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: presets,
      },
    },
    mode: {
      description: 'Light or dark',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: {
      storySort: { order: ['Foundations', 'Components', '*'] },
    },
  },
});
